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

const viewItem = async (req, res, next) => {
  const data = req.query;
  if (await check_user_id(parseInt(data.userId))) {
    let [result1] = await conn.execute(
      "SELECT I.*,C.cate_name FROM item I join category C on C.cate_id=I.cate_id join user_item U on U.item_id=I.item_id WHERE U.user_id=?",
      [parseInt(data.userId)]
    );
    if (result1.length > 0) {
      res.status(200).json(result1);
    } else {
      res.status(200).json([]);
    }
  } else {
    console.log("user not found");
    res.status(200).json({ message: "user not found" });
  }
};

const addItem = async (req, res, next) => {
  const data = req.body;
  const check_itemName = async (item_name, user_id) => {
    let [result1] = await conn.execute(
      "SELECT U.user_id FROM user_item U inner join item I on I.item_id=U.item_id WHERE I.item_name=? and U.user_id=?",
      [item_name, user_id]
    );
    if (result1.length > 0) {
      return false;
    } else {
      return true;
    }
  };
  if (await check_user_id(data.user_id)) {
    if (await check_itemName(data.itemName, data.user_id)) {
      try {
        let [cate_id] = await conn.execute(
          "SELECT cate_id FROM category WHERE cate_name=?",
          [data.category_name]
        );
        if (cate_id.length > 0) {
          const [iresult] = await conn.execute(
            "INSERT INTO item(item_name,description,price,image_url,cate_id) VALUES(?,?,?,?,?)",
            [
              data.itemName,
              data.description,
              parseInt(data.price),
              data.image_url,
              parseInt(cate_id[0]["cate_id"]),
            ]
          );

          const [result2] = await conn.execute(
            "INSERT INTO user_item(user_id,item_id) VALUES(?,?)",
            [parseInt(data.user_id), parseInt(iresult.insertId)]
          );
          if (iresult.affectedRows > 0 && result2.affectedRows > 0) {
            console.log("1 record inserted in item table");
            res.status(200).json({ message: "1 item insert to items table" });
          } else {
            res
              .status(400)
              .json({ message: "Error while inserting item data" });
            throw new Error("Error while inserting item data");
          }
        } else {
          res.status(200).json({ message: "category not match" });
          throw new Error("category not exisit");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("item already exisit");
      res.status(200).json({ message: "item already exisit" });
    }
  } else {
    console.log("user not found");
    res.status(200).json({ message: "user not found" });
  }
};
const updateItem = async (req, res, next) => {
  const data = req.body;
  const check_itemid = async (item_id, user_id) => {
    let [result1] = await conn.execute(
      "SELECT U.user_id FROM user_item U inner join item I on I.item_id=U.item_id WHERE I.item_id=? and U.user_id=?",
      [item_id, user_id]
    );
    if (result1.length > 0) {
      return false;
    } else {
      return true;
    }
  };
  if (await check_user_id(data.user_id)) {
    if (!(await check_itemid(data.item_id, data.user_id))) {
      try {
        let [cate_id] = await conn.execute(
          "SELECT cate_id FROM category WHERE cate_name=?",
          [data.category_name]
        );
        if (cate_id.length > 0) {
          let [iresult] = await conn.execute(
            "UPDATE item SET item_name=?,description=?,price=?,image_url=?,cate_id=? WHERE item_id=?",
            [
              data.item_name,
              data.description,
              parseInt(data.price),
              data.image_url,
              parseInt(cate_id[0]["cate_id"]),
              data.item_id,
            ]
          );
          if (iresult.affectedRows > 0) {
            console.log("1 record updated in item table");
            res.status(200).json({ message: "1 item update to items table" });
          } else {
            res
              .status(400)
              .json({ message: "Error while inserting item data" });
            throw new Error("Error while inserting user data");
          }
        } else {
          res.status(200).json({ message: "category not match" });
          throw new Error("category not exisit");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("item not exisit");
      res.status(200).json({ message: "item not exisit" });
    }
  } else {
    console.log("user not found");
    res.status(200).json({ message: "user not found" });
  }
};
const deleteItem = async (req, res, next) => {
  const data = req.body;
  console.log(data);
  let [result1] = await conn.execute(
    "DELETE FROM user_item WHERE item_id=? and user_id=? ",
    [data.item_id, data.user_id]
  );
  let [result2] = await conn.execute("DELETE FROM item WHERE item_id=? ", [
    data.item_id,
  ]);
  if (result1.affectedRows > 0 && result2.affectedRows > 0) {
    console.log("1 row delete from items table and user_item table");
    res
      .status(200)
      .json({ message: "1 row delete from items table user_item table" });
  } else {
    console.log("nothing to delete");
    res.status(200).json({ message: "nothing to delete" });
  }
};
module.exports = { viewItem, addItem, updateItem, deleteItem };
