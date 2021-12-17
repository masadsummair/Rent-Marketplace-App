const conn = require("../config/database.js");

const check_user_id = async (user_id) => {
  let [result1] = await conn.execute("SELECT * FROM user WHERE user_id = ?", [
    user_id,
  ]);
  if (result1.length > 0) {
    return true;
  } else {
    return false;
  }
};
const verifyContract = async (c_id, status) => {
  let [result] = await conn.execute(
    "SELECT contract_id FROM contract WHERE contract_id=? and status=? ",
    [parseInt(c_id), status]
  );
  if (result.length > 0) {
    return true;
  } else {
    return false;
  }
};

const initiateContract = async (req, res, next) => {
  const data = req.body;
  const check_itemAvailability = async (item_id) => {
    let [result1] = await conn.execute(
      "SELECT item_id FROM item WHERE availability='available' and item_id=?",
      [item_id]
    );
    if (result1.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  const check_contract = async (from, to, item_id) => {
    let [result] = await conn.execute(
      "SELECT status FROM contract WHERE provider_id=? and consumer_id=? and item_id=?",
      [from, to, item_id]
    );
    if (result.length > 0) {
      return result[0].status;
    } else {
      return "";
    }
  };
  if ((await check_user_id(data.from)) && (await check_user_id(data.to))) {
    try {
      let status = await check_contract(data.from, data.to, data.item_id);
      console.log(status);
      if (status.length == 0 || status == "completed" || status == "rejected") {
        if (await check_itemAvailability(data.item_id)) {
          if (data.days > 0) {
            const [result] = await conn.execute(
              `INSERT INTO contract( provider_id, consumer_id, item_id,total_price, end_time ) VALUES (?,?,?,?,DATE_add(DATE_add(DATE_add(CURDATE(), INTERVAL ${data.days} DAY), INTERVAL 23 hour), INTERVAL 59 minute) )`,
              [data.from, data.to, data.item_id, data.price]
            );
            if (result.affectedRows > 0) {
              console.log("1 record inserted in item contract table");
              res
                .status(200)
                .json({ message: "1 item insert to contract table" });
            } else {
              throw new Error("Error while inserting contract data");
            }
          } else {
            console.log("please enter correct number of days");
            res
              .status(200)
              .json({ message: "please enter correct number of days" });
          }
        } else {
          console.log("item not available");
          res.status(200).json({ message: "item not available" });
        }
      } else {
        console.log(`contract is already in ${status}`);
        res.status(200).json({ message: `contract is already in ${status}` });
      }
    } catch (error) {
      console.log(error);
      res.status(200).json({ message: `${error}` });
    }
  } else {
    console.log("user not found");
    res.status(200).json({ message: "user not found" });
  }
};
const viewContract = async (req, res, next) => {
  const data = req.query;
  console.log(data.status == undefined);
  let status =
    data.status != "" && data.status != undefined
      ? `and status='${data.status}'`
      : "";
  let [result] = await conn.execute(
    `SELECT C.contract_id, C.provider_id,CONCAT(P.firstname, ' ', P.lastname) AS provider_name, C.consumer_id,CONCAT(CO.firstname, ' ', CO.lastname) AS consumer_name,C.item_id,I.item_name,C.total_price, DATEDIFF(C.end_time, curdate()) AS days, C.status FROM contract C join item I on C.item_id = I.item_id join user P on C.provider_id = P.user_id join user CO  on C.consumer_id = CO.user_id WHERE  C.provider_id=? or C.consumer_id=? ${status}`,
    [data.id, data.id]
  );

  if (result.length > 0) {
    res.status(200).json(result);
  } else {
    console.log(`${data.status} contract not found`);
    res.status(200).json({});
  }
};
const startContract = async (req, res, next) => {
  const data = req.body;
  if (await verifyContract(data.contract_id, "pending")) {
    try {
      let [result1] = await conn.execute(
        "UPDATE contract SET status='active' WHERE contract_id=?",
        [data.contract_id]
      );
      let [result2] = await conn.execute(
        "UPDATE item SET availability='not available' WHERE item_id=?",
        [data.item_id]
      );
      if (result1.affectedRows > 0 && result2.affectedRows > 0) {
        console.log("1 record updated in contract table");
        res.status(200).json({ message: "1 contract update to items table" });
      } else {
        res
          .status(400)
          .json({ message: "Error while inserting contract data" });
        throw new Error("Error while inserting contract data");
      }
    } catch (error) {
      console.log(error);
      res.status(200).json(error);
    }
  } else {
    res.status(200).json({ message: "wrong contract" });
  }
};
const rejectContract = async (req, res, next) => {
  const data = req.body;
  if (await verifyContract(data.contract_id, "pending")) {
    try {
      let [iresult] = await conn.execute(
        "UPDATE contract SET status='rejected' WHERE contract_id=?",
        [data.contract_id]
      );
      if (iresult.affectedRows > 0) {
        console.log("1 record updated in contract table");
        res.status(200).json({ message: "1 contract update to items table" });
      } else {
        res
          .status(400)
          .json({ message: "Error while inserting contract data" });
        throw new Error("Error while inserting contract data");
      }
    } catch (error) {
      console.log(error);
      res.status(200).json(error);
    }
  } else {
    res.status(200).json({ message: "wrong contract" });
  }
};
const retrunItem = async (req, res, next) => {
  const data = req.body;
  if (await verifyContract(data.contract_id, "active")) {
    try {
      let [result1] = await conn.execute(
        "UPDATE contract SET status='onhold' WHERE contract_id=?",
        [data.contract_id]
      );
      let [result2] = await conn.execute(
        "UPDATE item SET availability='available' WHERE item_id=?",
        [data.item_id]
      );
      if (result1.affectedRows > 0 && result2.affectedRows > 0) {
        console.log("1 record updated in contract table");
        res.status(200).json({ message: "1 contract update to items table" });
      } else {
        res
          .status(400)
          .json({ message: "Error while inserting contract data" });
        throw new Error("Error while inserting contract data");
      }
    } catch (error) {
      console.log(error);
      res.status(200).json(error);
    }
  } else {
    res.status(200).json({ message: "wrong contract" });
  }
};

const endContract = async (req, res, next) => {
  const data = req.body;
  if (await verifyContract(data.contract_id, "onhold")) {
    try {
      let [iresult] = await conn.execute(
        "UPDATE contract SET status='completed' WHERE contract_id=?",
        [data.contract_id]
      );
      if (iresult.affectedRows > 0) {
        console.log("1 record updated in contract table");
        res.status(200).json({ message: "1 contract update to items table" });
      } else {
        res
          .status(400)
          .json({ message: "Error while inserting contract data" });
        throw new Error("Error while inserting contract data");
      }
    } catch (error) {
      console.log(error);
      res.status(200).json(error);
    }
  } else {
    res.status(200).json({ message: "wrong contract" });
  }
};
const rating = async (req, res, next) => {
  const data = req.body;

  if (await verifyContract(data.contract_id, "not rated")) {
    try {
      const [result] = await conn.execute(
        "INSERT INTO rating(user_id,contract_id,score,feedback) VALUES(?,?,?,?)",
        [data.user_id, data.contract_id, data.score, data.feedback]
      );
      let [iresult] = await conn.execute(
        "UPDATE contract SET status='completed' WHERE contract_id=?",
        [data.contract_id]
      );
      if (result.affectedRows > 0 && iresult.affectedRows>0) {
        console.log("1 record inserted in rating table");
        res
          .status(200)
          .json({
            message: "1 record inserted in rating table",
          });
      } else {
        console.log("contract is still active");
        res.status(400).json({ message: "contract is still active" });
      }
    } catch (error) {
      console.log(error);
      res.status(200).json(error);
    }
  } else {
    console.log("contract already rated");
    res.status(200).json({ message: "contract already rated" });
  }
};

const getUserRating= async (req, res, next) => 
{
  const data = req.query;
  let [result] = await conn.execute(
    "SELECT * FROM rating WHERE user_id=?",
    [data.userid]
  );

  if (result.length > 0) {
    res.status(200).json(result);
  } else {
    console.log("not rating fro this user");
    res.status(200).json([]);
  }
}
module.exports = {
  initiateContract,
  viewContract,
  startContract,
  rejectContract,
  retrunItem,
  endContract,
  rating,
  getUserRating
};
