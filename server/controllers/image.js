const conn = require("../config/database.js");
var path = require('path');
const fs = require('fs');


const getImage = (req,res,next)=>
{   
    if(fs.existsSync((path.join(__dirname,'../')+ '/images/'+req.query.path)))
    {
        res.sendFile(path.join(__dirname,'../')+ '/images/'+req.query.path);
    }
    else
    {
        res.sendFile(path.join(__dirname,'../')+ '/images/notfound.png');
    }

}
const saveImage = (req, res, next)=>
{
    console.log(req);
    res.status(200).json({"message":"image"});
}

module.exports = { getImage,saveImage};