const multer = require("multer");
const { config } = require("dotenv");
const { S3 } = require("@aws-sdk/client-s3");
config();

const params = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region:  process.env.AWS_BUCKET_REGION, // Set your desired region
  useAccelerateEndpoint: false, // Disable accelerated endpoint if not needed
};

// console.log(params);

// Create an S3 instance
const s3= new S3(params);

// Set the destination folder in your S3 bucket
const s3Destination = "uploads/";

// Create a multer storage engine for handling uploads
const multerConfig = multer();

// Middleware to handle single image upload to S3
exports.imageSingleUpload = (req, res, next) => {
  multerConfig.single("file")(req, res, (error) => {
    if (error) {
      console.error("Multer Error:", error);
      return res.status(500).json({message:"Multer upload failed"});
    }

    // Use the `req.file` object to access the uploaded file
    if (!req.file) {
      return next();
    }
    const uniqueKey = `${Date.now()}-${Math.floor(Math.random() * 10000)}-${req.file.originalname}`;


    // Define the S3 upload parameters
    const s3Params = {
      Bucket: process.env.AWS_BUCKET, // Replace with your S3 bucket name
      Key: `${s3Destination}${uniqueKey}`, // Set the S3 key for the uploaded file
      Body: req.file.buffer, // Use the file buffer from Multer
      ContentType: req.file.mimetype, // Set the content type based on the file's mimetype
    //   ACL: "public-read", // Set access permissions as needed
    };

    s3.putObject(s3Params, (err, data) => {
      if (err) {
        console.error("S3 Upload Error:", err);
        return res.status(500).json({message:"S3 upload failed"});
      }

      // Optionally, you can store the S3 URL or other relevant information in the request for later use
      req.s3FileUrl = {
        Bucket: process.env.AWS_BUCKET, // Replace with your S3 bucket name
        Key: `${s3Destination}${uniqueKey}`, // Set the S3 key for the uploaded file
        Url: `https://${s3Params.Bucket}.s3.amazonaws.com/${s3Params.Key}`,
      };

      next(); // Continue to the next middleware if upload is successful
    });
  });
};


// Middleware to handle multiple image uploads to S3
exports.imageMultiUpload = (req, res, next) => {
  multerConfig.array("files[]")(req, res, (error) => {
    if (error) {
      console.error("Multer Error:", error);
      return res.status(500).json({message:"Multer upload failed"});
    }

    // Use the `req.files` array to access the uploaded files
    if (!req.files || req.files.length === 0) {
      req.files = []
    }

    // Map the uploaded files to S3 upload promises
    const uploadPromises = req.files.map((file) => {
      const uniqueKey = `${Date.now()}-${Math.floor(Math.random() * 10000)}-${file.originalname}`;

      // Define the S3 upload parameters for each file
      const s3Params = {
        Bucket: process.env.AWS_BUCKET, // Replace with your S3 bucket name
        Key: `${s3Destination}${uniqueKey}`, // Set the S3 key for the uploaded file
        Body: file.buffer, // Use the file buffer from Multer
        ContentType: file.mimetype, // Set the content type based on the file's mimetype
        // ACL: "public-read", // Set access permissions as needed
      };

      // Return a promise that resolves when the file is uploaded to S3
      return new Promise((resolve, reject) => {
        
        s3.putObject(s3Params, (err, data) => {
          if (err) {
            console.error("S3 Upload Error:", err);
            reject(err);
          } else {
            // Optionally, you can store the S3 URL or other relevant information in the request for later use
            if (!req.s3FileUrls) {
              req.s3FileUrls = [];
            }
            req.s3FileUrls.push({
              Bucket: process.env.AWS_BUCKET, // Replace with your S3 bucket name
              Key: `${s3Destination}${uniqueKey}`, // Set the S3 key for the uploaded file
              Url: `https://${s3Params.Bucket}.s3.amazonaws.com/${s3Params.Key}`,
            });
            console.log({ s3FileUrls: req.s3FileUrls });
            resolve(data);
          }
        });
      });
    });

    // Wait for all file uploads to S3 to complete
    Promise.all(uploadPromises)
      .then(() => {
        next(); // Continue to the next middleware if all uploads are successful
      })
      .catch((err) => {
        console.log({ err });
        return res.status(500).json({message:"S3 upload failed"});
      });
  });
};



exports.FormFelidsMulter = (req, res, next) => {
  req.s3FileUrls = {}; // Initialize the object here

  multerConfig.fields([
    { name: "businessCardFront[]", maxCount: 50 },
    { name: "businessCardBack[]", maxCount: 50 },
    { name: "document[]", maxCount: 50 },
    { name: "aerialImages[]", maxCount: 50 },
    { name: "historicalImages[]", maxCount: 50 },
  ])(req, res, (error) => {
    if (error) {
      console.log({ err });
      return res.status(500).json({message:"Multer upload failed"});
    }

    // Map the uploaded files to S3 upload promises
    const uploadPromises = [];

    Object.keys(req.files).forEach((fieldName) => {
      req.files[fieldName].forEach((file) => {
        const uniqueKey = `${Date.now()}-${Math.floor(Math.random() * 10000)}-${file.originalname}`;
        const s3Destination = "uploads/";

        // Define the S3 upload parameters for each file
        const s3Params = {
          Bucket: process.env.AWS_BUCKET,
          Key: `${s3Destination}/${uniqueKey}`, // Define s3Destination correctly
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: "public-read",
        };

        // Return a promise that resolves when the file is uploaded to S3
        uploadPromises.push(
          new Promise((resolve, reject) => {
            s3.putObject(s3Params, (err, data) => {
              if (err) {
                console.error("S3 Upload Error:", err);
                reject(err);
              } else {
                if (!req.s3FileUrls[fieldName.replace('[]', '')]) {
                  req.s3FileUrls[fieldName.replace('[]', '')] = [];
                }
                req.s3FileUrls[fieldName.replace('[]', '')].push({
                  Bucket: process.env.AWS_BUCKET,
                  Key: `${s3Destination}/${uniqueKey}`,
                  Url: `https://${s3Params.Bucket}.s3.amazonaws.com/${s3Params.Key}`,
                });
                resolve(data);
              }
            });
          })
        );
      });
    });

    // Wait for all file uploads to S3 to complete
    Promise.all(uploadPromises)
      .then(() => {
        next(); // Continue to the next middleware if all uploads are successful
      })
      .catch((err) => {
        console.log({ err });
        return res.status(500).json({message:"S3 upload failed"});
      });
  });
};

