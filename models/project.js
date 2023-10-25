const mongoose = require("mongoose");

const projects = new mongoose.Schema(
    {
        token:{   
            type:String,
            required:false,
            maxLength:800,
       },

       expireTime:{
            type:String,
            required:false,
            maxLength:800,
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