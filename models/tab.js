const mongoose = require("mongoose");

const tabs = new mongoose.Schema(
    {
        name:{   
            type:String,
            required:false,
            maxLength:800,
       },
    },
    {
        timestamps:true
    }
);
module.exports = mongoose.model("Tab", tabs);