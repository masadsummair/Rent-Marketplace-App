import React from "react";
import { View, Text, TextInput, StyleSheet, StatusBar } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../components/context";
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ProfileScreen() {
  const { userId, signOut } = React.useContext(AuthContext);
  const itemCategory = ["Clothes", "Electronics", "Books", "Other"];
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 40, color: "#3D5A80" }}>
          HI <Text style={{ fontWeight: "bold" }}>ASAD</Text>
        </Text>
      </View>

      <View style={{ ...styles.row }} width="95%">
        <View
          style={{ flexDirection: "row", marginLeft: 5, alignItems: "center" }}
        >
          <Ionicons name="mail-outline" size={20} color="black" />
          <Text style={{ marginLeft: 5 }}>Email</Text>
        </View>
        <Text
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "black",
            padding: 15,
            marginVertical: 5,
            width: "95%",
            backgroundColor: "#D3D3D3",
            marginHorizontal: 5,
          }}
        >
          Hello
        </Text>
      </View>

      <View style={{ ...styles.row }} width="95%">
        <View
          style={{ flexDirection: "row", marginLeft: 5, alignItems: "center" }}
        >
          <Ionicons name="card-outline" size={20} color="black" />
          <Text style={{ marginLeft: 5 }}>CNIC Number</Text>
        </View>

        <Text
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "black",
            padding: 15,
            marginVertical: 5,
            width: "95%",
            backgroundColor: "#D3D3D3",
            marginHorizontal: 5,
          }}
        >
          Hello
        </Text>
      </View>

      <View style={{ ...styles.row }} width="95%">
        <View
          style={{
            flexDirection: "row",
            marginLeft: 5,
            alignItems: "center",
          }}
        >
          <Ionicons name="home-outline" size={20} color="black" />
          <Text style={{ marginLeft: 5 }}>Area</Text>
        </View>
        <SelectDropdown
          data={itemCategory}
          // value={pselectedCategory}
          // defaultValueByIndex={1}
          defaultValue={itemCategory[0]}
          onSelect={(selectedItem, index) => {
            //   setDefaultItemCategory(selectedItem);
          }}
          defaultButtonText={
            itemCategory[0]
            //   showUpdateModal ? defaultitemCategory : "Select Category"
          }
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={() => {
            return <FontAwesome name="chevron-down" color={"#444"} size={18} />;
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </View>

      <View style={{ ...styles.row }} width="95%">
        <View
          style={{
            flexDirection: "row",
            marginLeft: 5,
            alignItems: "center",
          }}
        >
          <Ionicons name="call-outline" size={20} color="black" />
          <Text style={{ marginLeft: 5 }}>Phone Number</Text>
        </View>
        <TextInput
          borderWidth={1}
          borderColor="black"
          padding={10}
          marginVertical={5}
          width="95%"
          backgroundColor={"#fff"}
          marginHorizontal={5}
          value={""}
          onChangeText={() => {}}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Button
          mode="contained"
          onPress={() => {
            signOut();
          }}
        >
          <Ionicons name="log-out-outline" size={20} color="white" /> Sign Out
        </Button>
        <Button
          mode="contained"
          color="#98C1D9"
          onPress={() => {}}
          marginLeft={10}
        >
          <Ionicons name="reload-outline" size={20} color="black" /> Update
          Changes
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight + 10,
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#DAF0EE",
    backgroundColor: "#fff",
  },
  row: {
    marginVertical: 5,
  },

  dropdown1BtnStyle: {
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#444",
    marginVertical: 5,
    marginHorizontal: 5,
    width: "95%",
  },

  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left", fontSize: 14 },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },

  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left", fontSize: 16 },
});
