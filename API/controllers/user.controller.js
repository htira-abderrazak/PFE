const mongoose = require('mongoose');
let {PythonShell} = require('python-shell')
const User = mongoose.model('User');
const photoschunks=require('../routes/photoschunks');
function swap(imagename){
    let options = {
        
        args: [imagename]
      };
      PythonShell.run(__dirname+'\\add55 copy.py',options 
      , async function (err, results) {
        if (err) throw err;
                console.log(results); 
                      
                    });
               
    }
    
 module.exports.rechercherimage=(req,res,next)=>{
    var criteria1=req.body.criteria1; //texte de recherche
    var  criteria2=req.body.criteria2; //couleur dominante
    console.log(criteria2);
    console.log(criteria1);
    if(criteria2!=undefined){
     photoschunks.find({"$and": [ { "metadata" : { "$regex": criteria1 }},{ "couleurDominant" : { "$regex": criteria2} }]},function(err,docs){
        console.log(err)
        res.send(docs);
     })
    }
     else{
        photoschunks.find( { "metadata" :{ "$regex": criteria1 } },function(err,docs){
            console.log(err)
            res.send(docs);
        })   
     }
 }
module.exports.telechargerimage=(req,res,next)=>{
    for(var image of req.files){
        console.log(image);
        console.log(image.filename);
        const  imagename=image.filename;
        photoschunks.findOneAndUpdate({filename:imagename},{$set:{userId:req.params.id,photodeprofil:req.params.photodeprofil}},{new:true},function(err,docs){
            console.log(err);
            console.log(docs);
        });
    
   
    }
    for(var image of req.files){
       
      
            swap(image.filename)
      
       
    }
    res.send( req.files );
}

module.exports.lireimage=(req,res,next)=>{
  try{
      const path=require('path');
      console.log(req.params.filename);
      
      
 photoschunks.findOne({filename:req.params.filename},(err,photoschunks1)=>{
    const GridFSPromise=require('gridfs-promise').GridFSPromise;
     let gridFS = new GridFSPromise('ProjetDB','mongodb://localhost:27017/ProjetDB',{
        autoReconnect: true,
        useNewUrlParser: true
      },"photos");
    
     console.log(err);
     const {ObjectId}=require('mongodb');
     if(photoschunks1==null) res.status(400).send('photo non trouvée'); else
gridFS.getFileStream(ObjectId(photoschunks1._id)).then((item) => {
    item
                .once("error", () => {
                    return res.status(400).end();
                }).pipe(res);
        }).catch(() => res.status(500));
    
 
 
 
});
  }catch(ex){
      res.send('exception');
  }
}
module.exports.register = (req,res,next)=>{
    var user = new User();
    user.fullName= req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;  

    user.save((err,doc) =>{
        console.log(doc);
        if(!err)
            res.send(doc);
        else{
            try{
            if(err.errors.password!=undefined) res.status(422).send(['كلمة السر قصيرة']);
        }catch(ex){

        }
            try{

            if (err.errors.email!=undefined) res.status(422).send(['البريد الالكتروني  خاطئ ']);
            }catch(ex){

            }
            try { res.status(422).send(['البريد الالكتروني مستعمل']);
        }catch(ex){

        }
        }
       
    });         
}

module.exports.login = async (req,res,next) =>{
   
    var user = await User.findOne({fullName:req.body.fullName});
    const bcrypt=require('bcryptjs');
    console.log(user);
    try{
    var result=bcrypt.compareSync(req.body.password,user.password).toString();
    res.send(result);
    }catch(ex){
        console.log(ex);
        res.status(422).send(['كلمة السر خاطئة']);
    }
}