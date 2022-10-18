const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');        

var userSchema = new mongoose.Schema({
    fullName:{
        type : String,
        required :'Full name vide',
        
    },
    email :{
        type : String,
        required : 'Email vide',
        unique : true
    },
    password: {
        type : String ,
        required : 'mot de passse vide',
        minlength : [4,'mot de passe a minimum 4 caracters'],
        unique : true
    },
    saltsecret : String,
 
});

userSchema.path('email').validate((val)=>{
  
   const SimpleRegex=require('simple-regex');
    console.log(SimpleRegex.EmailAddress.test(val));
    return SimpleRegex.EmailAddress.test(val);
},'e-mail invalide.');

userSchema.pre('save', function(next){
    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(this.password ,salt,(err,hash) => {
            this.password = hash;
            this.saltsecret = salt;
            next();
        });
    });
});
 
mongoose.model('User',userSchema);