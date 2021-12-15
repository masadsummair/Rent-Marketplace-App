import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, RefreshControl } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import ItemsListCard from "./ItemsListCard";
import axios from "axios";
import API_URL from "../config/API_URL";
import { AuthContext } from "../components/context";

export default function ItemsList({ reload, reloadSetter, viewItem }) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(true);
  const { userId } = React.useContext(AuthContext);
  const client = axios.create({
    baseURL: API_URL,
  });

  useEffect(() => {
    // Will rerender the list only if new data is added using the modal form
    if (!reload) {
      return false;
    }

    setLoading(true);
    loadListData();
    setLoading(false);
    reloadSetter(false);
  }, [reload]);

  let deleteItem = async (id, imagePath) => {
    //Set Loader to True
    setLoading(true);
    //Delete the item from the list
    let deleteItemData = {
      user_id: userId, //come from session
      item_id: id,
    };
    await client.delete("/deleteitem", { data: deleteItemData }).then(
      (response) => {
        console.log(response["request"]["_response"]);
      },
      (response) => {
        console.log(response["request"]["_response"]);
      }
    );
    await client
      .delete("/images", {
        data: {
          image_name: `${imagePath}`,
        },
      })
      .then(
        (response) => {
          console.log(response["request"]["_response"]);
        },
        (response) => {
          console.log(response["request"]["_response"]);
        }
      );
    //Load the data again
    loadListData();

    //Set Loader to False
    setRefreshing(false);
    setLoading(false);
  };

  let loadListData = () => {
    console.log("Loading...");

    // let userId = 1; //come from session
    client.get(`/viewitem?userId=${userId}`).then(
      (response) => {
        let userItem = response["data"];
        let formatUserItem = [];
        for (let i = 0; i < userItem.length; i++) {
          formatUserItem.push({
            id: userItem[i].item_id,
            name: userItem[i].item_name,
            description: userItem[i].description,
            category: userItem[i].cate_name,
            price: userItem[i].price,
            availability: userItem[i].availability,
            image:
              userItem[i].image_url != null
                ? userItem[i].image_url
                : "notfound.png",
          });
        }
        setData(formatUserItem);
      },
      (response) => {
        console.log(response["request"]["_response"]);
      }
    );

    setRefreshing(false);
    // setData(ldata);
  };

  return loading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      style={{
        width: "100%",
        marginTop: StatusBar.currentHeight + 10,
      }}
      data={data}
      renderItem={({ item, index }) => (
        <ItemsListCard
          id={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
          category={item.category}
          availability={item.availability}
          imageURL={item.image}
          deleteItem={deleteItem}
          viewItem={viewItem}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadListData} />
      }
    />
  );
}
