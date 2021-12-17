import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

import { ActivityIndicator } from "react-native-paper";
import ContractsListCard from "./ContractsListCard";
import axios from "axios";
import API_URL from "../config/API_URL";
import { AuthContext } from "../components/context";

// let userId =3;//come from session
export default function ContractsList({ listState, listFlag, setListFlag }) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [avgrating, setAvgRating] = React.useState(0.00);
  const { userId } = React.useContext(AuthContext);
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
  let loadListData =async () => {
    console.log("Loading1...", listState);

    //Load data here using the required conditions
  const userRating=async(toid,fromid)=> 
  {
    let uid=(toid!=userId)?toid:fromid;
    await client.get(`/contract/getrating?userid=${uid}`).then(
      (response) => {
        let ratings = response["data"];
        let stars=[0,0,0,0,0];
        if(ratings.length==0)
        {setAvgRating(5);}
        else
        {
        for (let i = 0; i < ratings.length; i++) {
          stars[ratings[i].score-1]++;
        }
        let avgrating=(1*stars[0]+2*stars[1]+3*stars[2]+4*stars[3]+5*stars[4])/ratings.length;
        setAvgRating(avgrating);
        }
      },
      (response) => {
        console.log(response["request"]["_response"]);
      }
    );
  }
  await  client.get(`/contract/view?id=${userId}`).then(
      (response) => {
        let contracts = response["data"];
        let ContractData = [];
        for (let i = 0; i < contracts.length; i++) {
          if(listState == "completed" && contracts[i].status=="not rated" && userId==contracts[i].consumer_id)
          {
            userRating(contracts[i].consumer_id,contracts[i].provider_id);
            ContractData.push({
              userID: userId,
              id: contracts[i].contract_id,
              itemName: contracts[i].item_name,
              itemId: contracts[i].item_id,
              fromid: contracts[i].provider_id,
              from: contracts[i].provider_name,
              toid: contracts[i].consumer_id,
              to: contracts[i].consumer_name,
              price: contracts[i].total_price,
              status: "completed",
              days: contracts[i].days,
              rating:avgrating
            });
          }
          else if (listState == contracts[i].status) {
            if(contracts[i].status=="not rated" && userId==contracts[i].consumer_id)
            {
              continue;
            }
            else{
            userRating(contracts[i].consumer_id,contracts[i].provider_id);
            ContractData.push({
              userID: userId,
              id: contracts[i].contract_id,
              itemName: contracts[i].item_name,
              itemId: contracts[i].item_id,
              fromid: contracts[i].provider_id,
              from: contracts[i].provider_name,
              toid: contracts[i].consumer_id,
              to: contracts[i].consumer_name,
              price: contracts[i].total_price,
              status: contracts[i].status,
              days: contracts[i].days,
              rating:avgrating
            });
          }
          }
        }
        setData([...ContractData]);
      },
      (response) => {
        console.log(response["request"]["_response"]);
      }
    );
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
      renderItem={({ item, index }) => (
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
          days={item.days}
          status={item.status}
          rating={item.rating}
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
