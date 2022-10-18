const express = require('express');
const router = express.Router();
const upload=require('./configurationmulter');
const ctrUser = require('../controllers/user.controller');

router.post('/register',ctrUser.register);
router.post('/connexion',ctrUser.login);
router.post('/telechargementimage/:id',upload.array('photos'),ctrUser.telechargerimage);
router.get('/lireimage/:filename',ctrUser.lireimage);
module.exports = router ;