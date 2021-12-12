import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

import Ionicons from "react-native-vector-icons/Ionicons";
import color from "../theme/color";


import { useNavigation } from "@react-navigation/native";
import API_URL from "../config/API_URL";

export default function ItemsListCard({
  id,
  name,
  description,
  price,
  imageURL,
  category,
  availability,
  deleteItem,
  viewItem,
}) {
  const [showDialog, setShowDialog] = React.useState(false);
  const showModal = () => {
    setShowDialog(true);
    setTimeout(() => {
      setShowDialog(false);
    }, 1000);
  };
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          viewItem(
            id,
            name,
            description,
            price,
            imageURL,
            category,
            availability
          );
          if (availability != "available") {
            showModal();
          }
        }}
      >
        <View style={styles.cardContent}>
          <Image
            source={{
              uri: API_URL + "/images/" + imageURL,
            }}
            style={{ width: 100, height: 100 }}
          />
          <View
            style={{
              width: 0,
              flexGrow: 1,
              flex: 1,
              padding: 10,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{name}</Text>
            <Text>{description.slice(0, 50) + "..."}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
         
          <Text style={styles.cardFooterCategory}>Category: {category} </Text>
          <Text style={styles.cardFooterPrice}>Price: {price}</Text>
        </View>

      </TouchableOpacity>
      {availability == "available" ? (
        <Button
          icon="delete"
          color="#c70000"
          mode="outlined"
          onPress={() => {
            deleteItem(id, imageURL);
          }}
        >
          Delete
        </Button>
      ) : (
        <Text style={{...styles.cardFooterNA,color: "#fa9f47"}}>Rented</Text>
      )}
      {showDialog ? (
        <Text style={styles.cardFooterNA}>Cant update</Text>
      ) : (
        <></>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: "95%",
    borderRadius: 6,
    elevation: 5,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  cardContent: {
    flexDirection: "row",
    borderColor: "#ddd",
    borderWidth: 1,
    marginHorizontal: 18,
    marginVertical: 20,
  },
  cardFooter: {
    marginHorizontal: 18,
    marginBottom: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    flexDirection: "row",
    paddingVertical:5,
    justifyContent: "space-between",
    paddingHorizontal:5,
  },
  cardFooterCategory: {
    textAlign: "left",
    color: "black",
    width: "80%",
    fontSize: 12,
  },
  cardFooterNA: {
    textAlign: "center",
    color: "red",
    width: "100%",
    fontSize: 16,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
  },
  cardFooterPrice: {
    textAlign: "left",
    color: "green",
    width: "45%",
    fontWeight: "bold",
    fontSize: 12,
  },
});
