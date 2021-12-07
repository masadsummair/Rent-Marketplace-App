import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function ItemsListCard({
  id,
  name,
  description,
  price,
  imageURL = "https://picsum.photos/200",
  duration = 23,
  deleteItem,
  viewItem,
}) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          viewItem(id);
        }}
      >
        <View style={styles.cardContent}>
          <Image
            source={{
              uri: imageURL,
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
          <Text style={styles.cardFooterDuration}>Duration: {duration}</Text>
          <Text style={styles.cardFooterPrice}>Price: {price}</Text>
        </View>
      </TouchableOpacity>

      <Button
        icon="delete"
        color="#c70000"
        mode="outlined"
        onPress={() => {
          deleteItem(id);
        }}
      >
        Delete
      </Button>
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
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardFooterDuration: {
    textAlign: "left",
    padding: 10,
    color: "black",
    width: "50%",
    fontSize: 12,
  },
  cardFooterPrice: {
    textAlign: "right",
    padding: 10,
    color: "black",
    width: "50%",
    fontSize: 12,
  },
});
