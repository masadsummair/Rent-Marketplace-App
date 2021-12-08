import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import API_URL from "../config/API_URL";
import Card from "../components/Card";
import axios from "axios";
export default function List({ category, area, min, max, query }) {
  const [itemdata, setitemdata] = React.useState([]);
  useEffect(() => {
    const client = axios.create({
      baseURL: API_URL,
    });

    let res=client.get(`/search?area=${area}&name=${query}&min=${min}&max=${max}&category=${category}`)
      .then((response) =>{
        let search_data=response["data"];
        let data1=[]
        for(let i=0; i<search_data.length; i++)
        {
          let img=(search_data[i].image_url!="")?search_data[i].image_url:"notfound.png";
          // console.log(API_URL+"/images/"+img);
          data1.push({
                id: search_data[i].item_id,
                name: search_data[i].item_name,
                description:search_data[i].description,
                price: search_data[i].price,
                image: API_URL+"/images/"+img,
                area: search_data[i].area_name,
                category: search_data[i].cate_id,
              }
            );
        }
        setitemdata(data1);
      });
    // console.log(itemdata)
    // console.log(category, area, min, max, query);

  }, [category, area, min, max, query]);

  return (
    <FlatList
      numColumns={2}
      style={{
        width: "100%",
      }}
      data={itemdata}
      renderItem={({ item, index }) => (
        <Card
          id={index}
          name={item.name}
          area={item.area}
          price={item.price}
          category={item.category}
          imageURL={item.image}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
