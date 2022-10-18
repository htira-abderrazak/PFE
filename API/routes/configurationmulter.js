const express = require('express');
const multer  = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const url = 'mongodb://localhost:27017/ProjetDB';
var dateFormat = require("dateformat");
// Create a storage object with a given configuration
const path=require('path');
const storage = new GridFsStorage({ url:url,file:(req, file) => { return {
    bucketName: 'photos',
    filename: dateFormat(Date.now(), "ddddmmmmdSyyyyhMMssTT")+Math.ceil(10000*Math.random()) +path.extname(file.originalname)
  };}}
);

// Set multer storage engine to the newly created object
const upload = multer({ storage });
module.exports=upload;