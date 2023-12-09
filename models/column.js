const mongoose = require("mongoose");

const columns = new mongoose.Schema(
    {
        name:{   
            type:String,
            required:false,
            maxLength:800,
       },
       tabId:{
           type:mongoose.Types.ObjectId,
           required:false,
           ref:'Tab'
       },
    },
    {
        timestamps:true
    }
);
module.exports = mongoose.model("Column", columns);