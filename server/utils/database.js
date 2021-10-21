const mysql = require('mysql');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test'
});

db.connect(err=>
{
    if(err)
    {
        throw err
    }
    console.log("my sql connected");
});
module.exports = db;
// let sql='CREATE DATABASE hello';
// db.query(sql,(err)=>{
//     if(err)
//     {
//         throw err;
//     }
// });

// const app=express();
// app.get('/createdb',(req,res)=>
// {
//     let sql='CREATE DATABASE NODETEST';
//     db.query(sql,(err)=>{
//         if(err)
//         {
//             throw err;
//         }
//         res.send("DataBase created");
//     });
// });
// app.listen('3000',()=>
// {
//     console.log("yeah");
// });