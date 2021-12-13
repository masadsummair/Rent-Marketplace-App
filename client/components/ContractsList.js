import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
} from "react-native";

import { ActivityIndicator } from "react-native-paper";
import ContractsListCard from "./ContractsListCard";
import axios from "axios";
import API_URL from "../config/API_URL";
let userId =3;//come from session
export default function ContractsList({
  listState,
  listFlag,
  setListFlag,
}) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const client = axios.create({
    baseURL: API_URL,
  });
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
  let loadListData = () => {
    console.log("Loading1...", listState);

    //Load data here using the required conditions
    client.get(`/contract/view?id=${userId}`).then((response) => {
      let contracts = response["data"];
      let ContractData = [];
      for (let i = 0; i < contracts.length; i++) {
        if(listState==contracts[i].status)
        {
          ContractData.push(
            {
              userID:userId,
              id: contracts[i].contract_id,
              itemName: contracts[i].item_name,
              itemId:contracts[i].item_id,
              fromid: contracts[i].provider_id,
              from: contracts[i].provider_name,
              toid: contracts[i].consumer_id,
              to: contracts[i].consumer_name,
              price:contracts[i].total_price,
              status: contracts[i].status,
              ratingId:contracts[i].rating_id,
              ratingStatus:contracts[i].rating_status,
              days:contracts[i].days,
            }
          );
        }
      }
      setData([...ContractData]);
    },
    (response)=>{console.log(response["request"]["_response"])});
    setRefreshing(false);
    // setData([...ldata]);
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
      renderItem={({item, index }) => (
        <ContractsListCard
          userId={userId} 
          id={item.id}
          itemName={item.itemName}
            itemId={item.itemId}
            fromid={item.fromid}
            from={item.from}
            toid={item.toid}
            to={item.to}
            price={item.price}
            ratingId={item.ratingId}
            ratingStatus={item.ratingStatus}
            days={item.days}
          status={item.status}
          reload={reload}
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
