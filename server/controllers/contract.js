const conn = require("../config/database.js");

const check_user_id = async (user_id) =>{
    let [result1] = await conn.execute("SELECT * FROM user WHERE user_id = ?", [
        user_id,
      ]);
    if (result1.length > 0) {
        return true;
    }else{
        return false;
    }
}
const verifyContract=async (c_id,status)=>{
    let [result]=await conn.execute(
        "SELECT contract_id FROM contract WHERE contract_id=? and status=? ",
        [parseInt(c_id),status]);
    if (result.length > 0)
    {
        return true;
    }else
    {
       return false;
    }
}

const initiateContract=async (req,res,next)=>
{
    const data=req.body;
    const check_itemAvailability = async (item_id) =>{
        let [result1] = await conn.execute("SELECT item_id FROM item WHERE availability='available' and item_id=?", [
            item_id
          ]);
        if (result1.length >0) {
            return true;
        }else{
            return false;
        }
    }
    const check_contract = async (from,to,item_id)=> {
        let [result] = await conn.execute("SELECT status FROM contract WHERE provider_id=? and consumer_id=? and item_id=?", [
            from,
            to,
            item_id
          ]);
          if (result.length >0) {
                return result[0].status;
            }else{
                return "";
            }
          
    }
    if(await check_user_id(data.from) && await check_user_id(data.to))
    {
        try {
            let status=await check_contract(data.from,data.to,data.item_id);
            console.log(status);
            if(status.length==0)
            {
                if(await check_itemAvailability(data.item_id))
                {
                    if(data.days>0)
                    {
                        const [result]=await conn.execute(
                            `INSERT INTO contract( provider_id, consumer_id, item_id, end_time ) VALUES (?,?,?,DATE_add(DATE_add(DATE_add(CURDATE(), INTERVAL ${data.days-2} DAY), INTERVAL 23 hour), INTERVAL 59 minute) )`,
                            [
                                data.from,
                                data.to,
                                data.item_id,
                            ]
                            );
                        if(result.affectedRows > 0 ) {
                            console.log("1 record inserted in item contract table");
                            res.status(200).json({"message":"1 item insert to contract table"});
                        } else {
                            throw new Error("Error while inserting contract data");
                        }
                    }else
                    {
                        console.log("please enter correct number of days");
                        res.status(200).json({"message":"please enter correct number of days"});
                    }
                }else
                {
                    console.log("item not available");
                    res.status(200).json({"message":"item not available"});
                }
            }else
            {
                console.log(`contract is already in ${status}`);
                res.status(200).json({"message":`contract is already in ${status}`});
            }
            
        } catch (error) {
            console.log(error)
            res.status(200).json({"message":`${error}`});
        }
    }
    else
    {
        console.log("user not found");
        res.status(200).json({"message":"user not found"});
    }
}
const viewContract = async (req, res, next)=>
{
    const data=req.query;
    let status=(data.status!='')? `and status='${data.status}'` : '' ;
    let [result]=await conn.execute(
        `SELECT contract_id, provider_id, consumer_id, item_id, rating_id, DATEDIFF(end_time, start_time) AS days, status,rating_status FROM contract WHERE  provider_id=? ${status}`,
        [data.id]);
        
    if (result.length > 0)
    {
        res.status(200).json(result);
    }else
    {
        console.log(`${data.status} contract not found`);
        res.status(200).json({"message":`${data.status} contract not found`});
    }
}
const startContract= async (req, res, next)=>
{
    const data=req.body;
    if(await verifyContract(data.contract_id,"pending"))
    {
        try {
            let [iresult] = await conn.execute("UPDATE contract SET status='active' WHERE contract_id=?", [
               data.contract_id 
            ]);
            if(iresult.affectedRows > 0 ) {
                 console.log("1 record updated in contract table");
                res.status(200).json({"message":"1 contract update to items table"});
             } else {
                 res.status(400).json({ message: "Error while inserting contract data" });
                 throw new Error("Error while inserting contract data");
             }
        } catch (error) {
            console.log(error);
            res.status(200).json(error);
        }
    }else
    {
        res.status(200).json({"message":"wrong contract"});
    }
}
const endContract = async (req, res, next)=>
{
    const data=req.body;
    if(await verifyContract(data.contract_id,"active"))
    {
        try {
            let [iresult] = await conn.execute("UPDATE contract SET status='complete' WHERE contract_id=?", [
               data.contract_id 
            ]);
            if(iresult.affectedRows > 0 ) {
                 console.log("1 record updated in contract table");
                res.status(200).json({"message":"1 contract update to items table"});
             } else {
                 res.status(400).json({ message: "Error while inserting contract data" });
                 throw new Error("Error while inserting contract data");
             }
        } catch (error) {
            console.log(error);
            res.status(200).json(error);
        }
    }else
    {
        res.status(200).json({"message":"wrong contract"});
    }
}
const rating = async (req, res,next) => 
{
    const data=req.body;
    const alreadyRated =async ()=> {
        let [result1] = await conn.execute("SELECT rating_status FROM contract WHERE contract_id=?", [
            data.contract_id
        ]);
        if(result1[0]["rating_status"]=='rated')
        {
            return false;
        }else{
            return true;
        }
    }
    if(await verifyContract(data.contract_id,"complete"))
    {
        if(await alreadyRated())
        {
            try {
                if(data.status=='yes')
                {
                    const [result] = await conn.execute(
                        "INSERT INTO rating(score,feedback) VALUES(?,?)",
                        [
                            data.score,data.feedback
                        ]
                    );
        
                    const [result1] = await conn.execute(
                    "UPDATE contract SET rating_id=? ,rating_status='rated' WHERE contract_id=? and status='complete' ",
                    [
                        result.insertId,
                        data.contract_id
                    ]
                    );
                    if(result1.affectedRows > 0 && result.affectedRows >0) {
                        console.log("1 record inserted in rating and update in contract table");
                        res.status(200).json({"message":"1 record inserted in rating and update in contract table"});
                    } else {
                        console.log("contract is still active");
                        res.status(400).json({ message: "contract is still active" });
                    }
                }else
                {
                    const [result1] = await conn.execute(
                    "UPDATE contract SET  rating_status='rated' WHERE contract_id=? and status='complete' and rating_status='not rated' ",
                    [
                        data.contract_id
                    ]
                    );
                    if(result1.affectedRows > 0 ) {
                        console.log("1 record  update in contract table");
                        res.status(200).json({"message":"1 record  update in contract table"});
                    } else {
                        console.log("contract is still active");
                        res.status(400).json({ message: "contract is still active" });
                        
                    }
                }
                
            } catch (error) {
                console.log(error);
                res.status(200).json(error);
            }
        }else
        {
            console.log("contract already rated");
            res.status(200).json({"message":"contract already rated"});
        }
    }else
    {
        console.log("wrong contract");
        res.status(200).json({"message":"wrong contract"});
    }
}
module.exports={ initiateContract,viewContract,startContract,endContract,rating };