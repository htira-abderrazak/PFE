const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true); ;
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URL,(err) => {
    if(!err){console.log('Mongodb connection succeeded.');}
    else{console.log('Error in Mongodb connection:'+JSON.stringify(err,undefined,2)) ;}
    
});

require('./user.model');
module.exports=mongoose