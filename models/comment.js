const mongoose = require("mongoose");

const comments = new mongoose.Schema(
    {
        
       userId:{
           type:mongoose.Types.ObjectId,
           required:true,
           ref:'User'
       },
       projectId:{
           type:String,
           required:true,
       },
       fieldName:{   
            type:String,
            required:false,
            maxLength:255,
       },
       fieldValue:{   
            type:String,
            required:false,
            maxLength:5000,
       },

    },
    {
        timestamps:true
    }
);
module.exports = mongoose.model("Comment", comments);