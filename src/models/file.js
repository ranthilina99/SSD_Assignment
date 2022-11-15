const mongoose=require('mongoose');
const jwt = require("jsonwebtoken");
const moment = require('moment');

const FileSchema=new mongoose.Schema({
    imageUrl:{
        type:String,
        default:"https://res.cloudinary.com/pjk12755/image/upload/v1623394380/PikPng.com_profile-icon-png_805523_zbl9ji.png"
    },
    user:{
        type:String,
        required:[true , "Please enter user!"],
        trim:true
    },
},{
    timestamps:true
});

const File = mongoose.model('File', FileSchema);
module.exports = File;