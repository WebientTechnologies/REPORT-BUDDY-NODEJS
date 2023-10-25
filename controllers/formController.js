const FieldForm = require("../models/fieldForm");

exports.FormPost = async (req, res) => {
  try {
    const s3FileUrls = req.files;
    console.log({aerialImages:s3FileUrls['aerialImages[]']})
    let data = req.body;
    if (data?.interviewee) {
      data.interviewee = JSON.parse(data.interviewee);
      data.interviewee = data?.interviewee.map((interviewee, index) => ({
        ...interviewee,
        businessCardBack: s3FileUrls['businessCardBack[]'][index]?.filename,
        businessCardFront: s3FileUrls['businessCardFront[]'][index]?.filename,
        document: s3FileUrls['document[]'][index]?.filename,
      }));
    }
    if (data?.propertyStructure) data.propertyStructure = JSON.parse(data.propertyStructure);

    if (data?.interviewStructure) data.interviewStructure = JSON.parse(data.interviewStructure);

    if (data?.fieldSketch) data.fieldSketch = JSON.parse(data.fieldSketch);

    if (data?.docOverView) data.docOverView = JSON.parse(data.docOverView);

    if (data?.floodData) data.floodData = JSON.parse(data.floodData);

    data.aerialImages = s3FileUrls['aerialImages[]'].map(image => image.filename);
    data.historicalImages = s3FileUrls['historicalImages[]'].map(image => image.filename);

    // console.log({ data, s3FileUrls });

    data.userId = req.user._id;
    const form = new FieldForm(data);

    const savedForm = await form.save();
    return res
      .status(201)
      .json({ message: "form created successfully", savedForm });

  } catch (error) {
    console.error("Error during customer signup:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
