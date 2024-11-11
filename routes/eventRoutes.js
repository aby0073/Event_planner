const express=require('express');
const router=express.Router();
const Event=require('../models/schema');
const bodyparser=require('body-parser');
router.use(bodyparser.urlencoded({extended:true}));
router.use(bodyparser.json());
router.post('/events',async (req,res) => {
    const event=new Event({
        Name:req.body.Name,
        imgUrl:req.body.imgUrl,
        details:req.body.details,
        eventDate: req.body.eventDate, 
        eventTime: req.body.eventTime 
    });
    try{
        const newEvent=await event.save();
        res.status(201).json(newEvent);
    }catch(error){
        res.status(400).json({message:error.message});
    }
});
router.get('/events',async(req,res)=>{
    try{
    const event=await Event.find().sort({date:-1});
    res.json(event);
    }catch(error){
        res.status(500).json({message:error.message});

    }
})
router.put('/events/:id',async(req,res)=>{
try{
    const updatedevent=await Event.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updatedevent);
}catch(error){
res.status(400).json({message:error.message});
}
});
router.delete('/events/:id',async(req,res)=>{
    try{
        await Event.findByIdAndDelete(req.params.id);
        res.json({message:'Event deleted'});
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

module.exports=router;