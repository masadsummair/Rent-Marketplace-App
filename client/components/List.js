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
    name: "Product 1dsdsddssdsdsdsdsdsdsdsddsdsdsdsdsdsddsddsdddsdsdsdsdsdsddssdsdddsdds",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "100",
    image: "https://picsum.photos/200",
    uri: "https://picsum.photos/seed/picsum/200/200/",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 2,
    name: "Product 2",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "200",
    image: "https://picsum.photos/200",
    uri: "https://picsum.photos/seed/picsum/200/200/",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 3,
    name: "Product 3",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "300",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 4,
    name: "Product 4",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "400",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 5,
    name: "Product 5",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "500",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 6,
    name: "Product 6",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "600",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 7,

    name: "Product 7",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "700",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 8,
    name: "Product 8",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "800",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 9,
    name: "Product 9",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "900",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 10,
    name: "Product 10",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "1000",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 11,
    name: "Product 11",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "1100",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
  {
    id: 12,
    name: "Product 12",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "1200",
    image: "https://picsum.photos/200",
    area: "Area 1",
    category: "Category 1",
  },
];

export default function List({
  category,
  area,
  min,
  max,
  query,
  viewItem,
  reload, //New
  setReload, //New
}) {
  useEffect(() => {
    //New
    if (!reload) {
      return;
    }
    //New

    console.log(category, area, min, max, query);
    setReload(false);
  }, [category, area, min, max, query, reload]);

  return (
    <FlatList
      numColumns={2}
      style={{
        width: "100%",
      }}
      data={data}
      renderItem={({ item, index }) => (
        <Card
          id={index}
          name={item.name}
          area={item.area}
          price={item.price}
          category={item.category}
          viewItem={viewItem} //New
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
