import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

export default function Card({
  userid,
  id,
  name,
  username,
  description,
  price,
  imageURL,
  category,
  area,
  duration = 23,
  viewItem, //New
}) {
  return (
    <TouchableOpacity
      onPress={() => {

        viewItem(id,name,username,description,price,imageURL); //New

        console.log("card pushed" + id + " userid:" + userid);

    
      }}
      style={styles.card}
    >
      {/* <View style={styles.card}> */}
      <View style={styles.cardContent}>
        <Image
          source={{
            uri: imageURL,
          }}
          resizeMode="contain"
          style={{ width: "100%", height: 200 }}
        />
        <Text
          style={{
            ...styles.text,
            borderColor: "#118AB2",
            fontWeight: "bold",
            color: "#118AB2",
          }}
        >
          {"Rs " + price + "/hour"}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: "grey",
          }}
        >
          {name.slice(0, 20) + "..."}
        </Text>

        <Text style={{ borderColor: "#118AB2", marginTop: 5 }}>{area}</Text>
      </View>

      {/* </View> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "46%",
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 8,
    marginVertical: 8,
    borderWidth: 6,
    borderColor: "#fff",
    borderBottomColor: "#118AB2",
  },
  cardContent: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
});
