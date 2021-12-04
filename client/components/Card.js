import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function Card({ children, id }) {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("card pushed", id);
      }}
      style={styles.card}
    >
      {/* <View style={styles.card}> */}
      <View style={styles.cardContent}>{children}</View>

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
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 20,
  },
});
