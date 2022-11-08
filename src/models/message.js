const mongoose=require('mongoose');
const jwt = require("jsonwebtoken");
const moment = require('moment');

const MessageSchema=new mongoose.Schema({
    message:{
        type:String,
        required:[true , "Please enter message!"],
        trim:true
    },
    user:{
        type:String,
        required:[true , "Please enter user!"],
        trim:true
    },
},{
    timestamps:true
});

const Message = mongoose.model('Messages', MessageSchema);
module.exports = Message;