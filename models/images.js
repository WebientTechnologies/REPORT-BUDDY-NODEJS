const mongoose = require("mongoose");

const images = new mongoose.Schema(
    {
        folderId:{
            type:mongoose.Types.ObjectId,
            required:false,
            ref:'Folder'
        },
        file:{
            type:String,
            required:false,
            maxLength:255,
        },
    }
);
module.exports = mongoose.model("Image", images);