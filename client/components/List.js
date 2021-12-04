import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Card from "../components/Card";

let data = [
  {
    id: 1,
    name: "Product 1",
    price: "100",
    image: "https://picsum.photos/200",
  },
  {
    id: 2,
    name: "Product 2",

    price: "200",
    image: "https://picsum.photos/200",
  },
  {
    id: 3,
    name: "Product 3",
    price: "300",
    image: "https://picsum.photos/200",
  },
  {
    id: 4,
    name: "Product 4",
    price: "400",
    image: "https://picsum.photos/200",
  },
  {
    id: 5,
    name: "Product 5",
    price: "500",
    image: "https://picsum.photos/200",
  },
  {
    id: 6,
    name: "Product 6",
    price: "600",
    image: "https://picsum.photos/200",
  },
  {
    id: 7,

    name: "Product 7",
    price: "700",
    image: "https://picsum.photos/200",
  },
  {
    id: 8,
    name: "Product 8",
    price: "800",
    image: "https://picsum.photos/200",
  },
  {
    id: 9,
    name: "Product 9",
    price: "900",
    image: "https://picsum.photos/200",
  },
  {
    id: 10,
    name: "Product 10",
    price: "1000",
    image: "https://picsum.photos/200",
  },
  {
    id: 11,
    name: "Product 11",
    price: "1100",
    image: "https://picsum.photos/200",
  },
  {
    id: 12,
    name: "Product 12",
    price: "1200",
    image: "https://picsum.photos/200",
  },
];

export default function List({ category, area, min, max, query }) {
  useEffect(() => {
    console.log(category, area, min, max, query);
  }, [category, area, min, max, query]);

  return (
    <FlatList
      numColumns={2}
      style={{
        width: "100%",
      }}
      data={data}
      renderItem={({ item, index }) => (
        <Card id={index}>
          <Image
            source={{
              uri: "https://picsum.photos/seed/picsum/200/200",
            }}
            resizeMode="contain"
            style={{ width: "100%", height: 200 }}
          />
          <Text>{item.name}</Text>
          <Text>{index}</Text>
        </Card>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
