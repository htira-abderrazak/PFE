require('./config/config');
require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rtsndex = require('./routes/index.router');   

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api',rtsndex);

app.use((err,req,res,next) =>{
    if(err.name == 'validationError' ){
        var valErrors =[];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

app.listen(process.env.PORT,() => console.log(`Server start at port : ${process.env.PORT}`));