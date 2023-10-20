const mongoose = require("mongoose");

const projects = new mongoose.Schema(
    {
        name:{   
            type:String,
            required:false,
            maxLength:255,
       },
       createdAt:{
            type:Date,
            required:true,
            default:Date.now(),
        },
        updatedAt:{
            type:Date,
            required:true,
            default:Date.now(),
        }
    }
);
module.exports = mongoose.model("Project", projects);