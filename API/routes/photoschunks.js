const mongoose=require('../models/db');
 
 

const blogSchema = new mongoose.Schema({

_id:mongoose.Schema.Types.ObjectId,
filename:String,
metadata:{},
userId:mongoose.Schema.Types.ObjectId

});
 
module.exports=mongoose.model('photos.files', blogSchema,'photos.files');;