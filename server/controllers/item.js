const db = require('../config/database.js');

function checkLoginData(res,data)
{
    for(let i=0;i<=res.length-1;i++)
    {
      let itemData=JSON.parse(JSON.stringify(res[i]));
      if(data.name==itemData.name)
      {
        return new Promise(function(resolve, reject)
        {
            reject();
        });
      }
    }
    return new Promise(function(resolve, reject)
    {
        resolve();
    });
}

const viewItem = (req,res,next)=>
{
    
}

const addItem = (req,res,next)=>
{
    let data={};
    data=req.body;

    const itemData={name:data.name,price:data.price,category_name:data.category_name};
    const check_itemName = new Promise((resolve,reject)=>
    {
        db.query(`SELECT item_name FROM items WHERE item_name like "${itemData.name}"`,(err,result,fields)=>
        {
            if(err){ console.log("----sql error----");throw err; };
            let name=JSON.stringify(result[0]);
            if(name===undefined)
            {
                reject();
            }else 
            {
                resolve();
            }
        });
    })
    const get_cate_id = new Promise((resolve,reject)=>
    {
        db.query(`SELECT cate_id FROM item_categories WHERE category_name like "${itemData.category_name}" `,(err,result,fields)=>
        {
            if (err) {console.log("----sql error----");throw err; }
            resolve(JSON.parse(JSON.stringify(result[0])).cate_id);
            reject();
        });
    });
    check_itemName.then(
        ()=>{
            console.log("item already exisit");
            res.status(200).json({"message":"item already exisit"});
        },
        ()=>
        {
            get_cate_id.then(
                (cate_id)=>
                {
                    db.query(
                        `INSERT INTO items( item_name, price_per_hour, cate_id) VALUES ("${itemData.name}",${itemData.price},${cate_id})`,
                        (err, result)=>
                        {
                            if(err){ console.log("----sql error----");throw err; };
                            console.log("1 record inserted in item table");
                            res.status(200).json({"message":"1 item insert to items table"});
                    });
                },
                ()=>
                {
                    res.status(200).json({"message":"category not found"});
                }
            );
        }
    );

}
const updateItem = (req,res,next)=>
{
    
}
const deleteItem = (req,res,next)=>
{
    
}
module.exports = { viewItem,addItem,updateItem,deleteItem};