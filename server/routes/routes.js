const express =  require('express');

const { signup,login,isAuth } = require('../controllers/auth.js');

const router = express.Router();

router.post('/login',login);

router.post('/signup',signup);

router.get('/private',isAuth);

router.get('/public',(req,res,next)=>{
    res.status(200).json({'message':"here is your public resoures"});
});

module.exports = router;