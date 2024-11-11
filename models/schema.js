const mongoose=require('mongoose');

const eventSchema=new mongoose.Schema({
    Name:{type:String,required: true },
    imgUrl:{type:String,required: true },
    date:{type:Date,default:Date.now},
    eventDate: { type: Date, required: true }, 
    eventTime: { type: String, required: true }
});

module.exports=mongoose.model('Event',eventSchema);