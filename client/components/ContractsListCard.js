import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import color from "../theme/color";

export default function ContractsListCard({
  id,
  status,
  viewItem,
  reload,
  setReload,
}) {
  let button;
  if (status == "active") {
    button = (
      <Button
        icon="rotate-left"
        color="green"
        mode="contained"
        onPress={() => {
          console.log("button reload");
          //Do api request here
          setReload(true);
        }}
      >
        Return the item
      </Button>
    );
  } else if (status == "pending") {
    button = (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          icon="check"
          color="green"
          mode="contained"
          width="50%"
          compact={true}
          onPress={() => {}}
        >
          Rent this item
        </Button>
        <Button
          icon="close"
          color="#c70000"
          mode="contained"
          width="50%"
          compact={true}
          onPress={() => {}}
        >
          Reject Offer
        </Button>
      </View>
    );
  } else if (status == "onhold") {
    button = (
      <Button
        icon="account-arrow-left"
        color="#eed202"
        mode="contained"
        onPress={() => {}}
      >
        press me, if uzair returned your item
      </Button>
    );
  } else if (status == "rejected") {
    button = (
      <Button
        icon="close-octagon"
        color="#eed202"
        mode="contained"
        onPress={() => {}}
        disabled={true}
      >
        Sorry, your offer got rejected
      </Button>
    );
  } else if (status == "completed") {
    button = (
      <Button icon="file" color="green" mode="contained" onPress={() => {}}>
        Contract Completed
      </Button>
    );
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          viewItem(id);
        }}
      >
        {status == "active" ? (
          <View
            style={{
              marginTop: 5,
              borderBottomColor: "grey",
              borderBottomWidth: 1,
              padding: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="time-outline" size={20} color="#02055a" />

            <Text style={{ textTransform: "uppercase", color: "#02055a" }}>
              2 Days remaining
            </Text>
          </View>
        ) : (
          <></>
        )}
        <View style={styles.cardHeader}>
          <Ionicons name="cube-outline" size={30} color="black" />
          <Text style={{ marginLeft: 10 }}>Item Name</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={{ alignItems: "center" }}>
            <Ionicons name="person-outline" size={30} color="black" />
            <Text>Uzair</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="cash-outline" size={30} color="green" />
            <Text
              style={{
                color: "green",
              }}
            >
              Rs.1000
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Ionicons name="person-outline" size={30} color="black" />
            <Text>Asad</Text>
          </View>
        </View>
      </TouchableOpacity>

      {button}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: Dimensions.get("window").width * 0.85,
    borderRadius: 6,
    elevation: 5,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 8,
    marginVertical: 10,
    position: "relative",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 18,
    marginVertical: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
});
