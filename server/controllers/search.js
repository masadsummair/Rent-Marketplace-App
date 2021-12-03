const conn = require("../config/database.js");

const Search = async (req,res,next)=>
{
    const data=req.query;

    let name='',min='',max='',cate='';
    if(data.name.length!=0)
    {
        name+=` and I.item_name='${data.name}'`;
    }
    if(data.min.length!=0)
    {
        min+=` and I.price>=${data.min}`
    }
    if(data.max.length!=0)
    {
        max+=` and I.price<=${data.max}`
    }
    if(data.category.length!=0)
    {
        let [cate_id] = await conn.execute("SELECT cate_id FROM category WHERE cate_name=?", [
            data.category,
        ]);
        let id;
        if (cate_id.length > 0)
        {
            id=parseInt(cate_id[0]["cate_id"]);
        }else
        {
            id=0;
        }
        
        cate+=` and I.cate_id=${id}`
    }
    let query;
    if(data.area.length!=0)
    {
        query="select I.*,C.cate_name from item I join category C on C.cate_id=I.cate_id join user_item UI on I.item_id=UI.item_id join user U on U.user_id=UI.user_id where U.area='"+ data.area + "' and I.availability='available' "+name+max+min+cate;
    }else
    {
        query="SELECT I.*,C.cate_name FROM item I join category C on C.cate_id=I.cate_id where I.availability='available'"+name+max+min+cate;
    }
    console.log(query);
    let [result]=await conn.execute(query);
    if(result.length>0)
    {
        res.status(200).json(result);
    }
    else{
        res.status(200).json([]);
    }
}

const Category = async (req,res,next)=>
{
    const data=req.query;
    let [result]=await conn.execute("select * from category");
    if(result.length>0)
    {
        res.status(200).json(result);
    }
    else{
        res.status(200).json([]);
    }
}
module.exports={ Search,Category };