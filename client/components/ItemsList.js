import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import ItemsListCard from "./ItemsListCard";

let ldata = [
  {
    id: 1,
    name: "Product 1",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "100",
    image: "https://picsum.photos/200",
    uri: "https://picsum.photos/seed/picsum/200/200/",
  },
  {
    id: 2,
    name: "Product 2",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "200",
    image: "https://picsum.photos/200",
    uri: "https://picsum.photos/seed/picsum/200/200/",
  },
  {
    id: 3,
    name: "Product 3",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "300",
    image: "https://picsum.photos/200",
  },
  {
    id: 4,
    name: "Product 4",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "400",
    image: "https://picsum.photos/200",
  },
  {
    id: 5,
    name: "Product 5",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "500",
    image: "https://picsum.photos/200",
  },
  {
    id: 6,
    name: "Product 6",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "600",
    image: "https://picsum.photos/200",
  },
  {
    id: 7,

    name: "Product 7",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "700",
    image: "https://picsum.photos/200",
  },
  {
    id: 8,
    name: "Product 8",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "800",
    image: "https://picsum.photos/200",
  },
  {
    id: 9,
    name: "Product 9",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "900",
    image: "https://picsum.photos/200",
  },
  {
    id: 10,
    name: "Product 10",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "1000",
    image: "https://picsum.photos/200",
  },
  {
    id: 11,
    name: "Product 11",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "1100",
    image: "https://picsum.photos/200",
  },
  {
    id: 12,
    name: "Product 12",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "1200",
    image: "https://picsum.photos/200",
  },
];

export default function ItemsList({ reload, reloadSetter, viewItem }) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(true);

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

  let deleteItem = (id) => {
    //Set Loader to True
    setLoading(true);

    //Delete the item from the list

    //Load the data again
    loadListData();

    //Set Loader to False
    setLoading(false);
  };

  let loadListData = () => {
    console.log("Loading...");

    //Load data here

    setRefreshing(false);
    setData([...ldata]);
  };

  return loading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      style={{
        width: "100%",marginTop: StatusBar.currentHeight + 10,
      }}
      data={data}
      renderItem={({ item, index }) => (
        <ItemsListCard
          id={index}
          name={item.name}
          description={item.description}
          price={item.price}
          imageURL={item.uri}
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
