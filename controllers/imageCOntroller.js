const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Image = require('../models/images'); // Adjust the path accordingly
const Folder = require('../models/folders');

// Set up multer storage for uploading images
const storage = multer.diskStorage({
  destination: async(req, file, cb) => {
    const folderId = req.body.folderId; // Assuming folderId is passed in the request body
    // const folder = await Folder.findById(folderId);
    // const folderName = folder.name;
    const uploadPath = path.join(__dirname, '..', 'uploads');

    // Check if the folder exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).array('images', 900); // 900 is the maximum number of images

const uploadImagesController = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Error uploading images:', err);
      return res.status(500).json({ error: 'Error uploading images' });
    }

    const folderId = req.body.folderId;
    const imagesArray = req.files.map((file) => ({
      folderId,
      file: file.filename,
    }));

    try {
      // Save image details to the database
      const savedImages = await Image.insertMany(imagesArray);

      res.status(201).json({ message: 'Images uploaded successfully', savedImages });
    } catch (error) {
      console.error('Error saving image details to the database:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};



module.exports = {
  uploadImagesController,
};
