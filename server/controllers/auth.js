const db = require('../config/database.js');
const bcrypt = require('bcrypt');


function checkLoginData(res,data)
{
    return new Promise(function(resolve, reject)
    {
      let dbpassword=JSON.parse(JSON.stringify(res[0])).password;
      bcrypt.compare(data.password, dbpassword, (err, compareRes) => {
        if (err) { // error while comparing
          reject();
        } else if (compareRes) { // password match
          resolve();
        } else { // password doesnt match
          reject();
        };
      });
    });
}
const signup = (req,res,next)=>
{
  let data={};
  data=req.body;
  const user ={user_id:0,f_name:data.first_name,l_name:data.last_name,cnic:data.cnic,phone:data.phone,street:data.street,city:data.city,country:data.country,dob:data.birth_date,email:data.email,password:0};

  const check_email = new Promise((resolve,reject)=>
  {
    db.query(`select * from logins where email like "${user.email}";`,(err,result,fields)=>
   {
    if(err){ throw err; console.log("----sql error----");};
     resolve(result,user.email);
   });
  })
  check_email.then(
    (status)=>
    {
      if(status==false)
      {
        const hash_password = new Promise((resolve,reject)=>
        {
          bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
            if (err) {
               res.status(500).json({message: "couldnt hash the password"}); 
            } else if (passwordHash) {
              resolve(passwordHash);
            }
            });
        });
        const insert_into_user=new Promise((resolve,reject) =>
        {
          db.query(
            `INSERT INTO users( first_name, last_name, cnic, phone, street, city, country, birth_date) VALUES ("${user.f_name}","${user.l_name}",${user.cnic},${user.phone},"${user.street}","${user.city}","${user.country}",${user.dob})`,
            (err, result)=>
            {
               if(err){ throw err; console.log("----sql error----");};
              console.log("1 record inserted in user table");
              resolve("1 record inserted in user table");
            });
        });
        const get_last_id=new Promise((resolve,reject) =>
        {
          db.query(
          `SELECT MAX(user_id) as "m_id" FROM users`,
            (err,result)=>
          {
            console.log("get user id from user table");
            resolve(JSON.parse(JSON.stringify(result[0])).m_id);
          });
        });
        insert_into_user.then(
          ()=>
          {
            get_last_id.then(
              (u_id)=>
              {
                hash_password.then((passwordHash)=>
                {
                  db.query(
                    `INSERT INTO logins(user_id, email, password) VALUES (${u_id},"${user.email}","${passwordHash}")`,
                    (err, result)=>
                    {
                       if(err){ throw err; console.log("----sql error----");};
                      console.log("1 record inserted in login table");
                      res.status(200).json({"message":"user data insert to user and login table"});
                    });
                })
              }
            )
          }
        )
      }else
      {
        res.status(200).json({"message":"Email already in use"});
      }
    }
  );
}
const login = (req,res,next)=>
{
    let data={}
    data=req.body;
    db.query(`select * from logins where email like "${data.email}";` , function(err,result,fields)
    {
      if(err){ throw err; console.log("----sql error----");};
      checkLoginData(result,data).then(
        ()=>
        {
          console.log("login");
          res.status(200).json({"message":"login"});
        },
        ()=>
        {
          res.status(200).json({"message":"user not found"});
        }
        )
    });
}
const isAuth = (req,res,next)=>
{
    
}
module.exports = { signup,login,isAuth};