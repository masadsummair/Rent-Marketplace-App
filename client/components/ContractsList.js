import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import { ActivityIndicator } from "react-native-paper";
import ContractsListCard from "./ContractsListCard";

let ldata = [
  {
    id: 1,
    itemName: "Item 1",
    from: "From 1",
    to: "To 1",
    status: "active",
  },
  {
    id: 2,
    itemName: "Item 2",
    from: "From 2",
    to: "To 2",
    status: "pending",
  },
  {
    id: 3,
    itemName: "Item 3",
    from: "From 3",
    to: "To 3",
    status: "rejected",
  },
  {
    id: 4,
    itemName: "Item 4",
    from: "From 4",
    to: "To 4",
    status: "onhold",
  },
  {
    id: 5,
    itemName: "Item 5",
    from: "From 5",
    to: "To 5",
    status: "completed",
  },
];

export default function ContractsList({
  viewItem,
  listState,
  listFlag,
  setListFlag,
}) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (!reload && !listFlag) {
      return;
    }
    console.log("listState use effect", listState);
    setLoading(true);
    //Load data using provided state
    loadListData();
    setLoading(false);
    setListFlag(false);
    setReload(false);
  }, [listFlag, reload]);

  //   let deleteItem = (id) => {
  //     //Set Loader to True
  //     setLoading(true);

  //     //Delete the item from the list

  //     //Load the data again
  //     loadListData();

  //     //Set Loader to False
  //     setLoading(false);
  //   };

  let loadListData = () => {
    console.log("Loading1...", listState);

    //Load data here using the required conditions

    setRefreshing(false);
    setData([...ldata]);
  };

  return loading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      style={{
        width: "100%",
      }}
      contentContainerStyle={{
        alignItems: "center",
      }}
      data={data}
      renderItem={({ item, index }) => (
        // <ItemsListCard
        //   id={index}
        //   name={item.name}
        //   description={item.description}
        //   price={item.price}
        //   imageURL={item.uri}
        //   deleteItem={deleteItem}
        //   viewItem={viewItem}
        // />

        <ContractsListCard
          id={item.id}
          viewItem={viewItem}
          status={item.status}
          setReload={setReload}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadListData} />
      }
    />
  );
}
