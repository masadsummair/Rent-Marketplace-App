const db = require('../config/database.js');

const viewItem = (req,res,next)=>
{
    const user_id=req.body.user_id;
    db.query(`SELECT I.*,C.category_name FROM items I inner join Item_categories C on C.cate_id=I.cate_id WHERE user_id=${user_id}`,(err,result,fields)=>
    {
        if(err){ console.log("----sql error----");throw err; };
        if(result.length==0)
        {
            res.status(200).json({"message":"no item found"});
        }
        const data=JSON.parse(JSON.stringify(result));
        for(let i=0;i<data.length-1;i++)
        {
            delete data[i]["cate_id"];
        }
        console.log(data);
        res.status(200).json(data);
    });
}

const addItem = (req,res,next)=>
{
    let data={};
    data=req.body;

    const itemData={user_id:data.user_id,name:data.name,price:data.price,category_name:data.category_name};
    const check_user_id = new Promise((resolve,reject)=>
    {
        db.query(`SELECT user_id FROM users WHERE user_id=${itemData.user_id}`,(err,result,fields)=>
        {
            if(err){ console.log("----sql error----");throw err; };
            let user_id=JSON.stringify(result[0]);
            if(user_id===undefined)
            {
                reject();
            }else 
            {
                resolve();
            }
        });
    })
    const check_itemName = new Promise((resolve,reject)=>
    {
        db.query(`SELECT item_name,user_id FROM items WHERE item_name like "${itemData.name}" and user_id=${itemData.user_id}`,(err,result,fields)=>
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
    check_user_id.then(
        ()=>
        {
            check_itemName.then(
                ()=>{
                    console.log("item already exisit with same name");
                    res.status(200).json({"message":"item already exisit"});
                },
                ()=>
                {
                    get_cate_id.then(
                        (cate_id)=>
                        {
                            db.query(
                                `INSERT INTO items( user_id,item_name, price_per_hour, cate_id) VALUES (${itemData.user_id},"${itemData.name}",${itemData.price},${cate_id})`,
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
        },
        ()=>
        {
            console.log("user_id not exisit");
            res.status(200).json({"message":"user not match"});
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