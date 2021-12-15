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
      <View style={{ ...styles.row }} width="95%">
        <Text style={{ textAlign: "left" }}>
          <Ionicons name="ios-person-outline" size={20} color="black" />
          Username
        </Text>
        <TextInput
          borderWidth={1}
          borderColor="black"
          padding={10}
          marginVertical={5}
          height={50}
          width="95%"
          backgroundColor={"#fff"}
          placeholder="Item Name"
          marginHorizontal={5}
          value={""}
          onChangeText={() => {}}
        />
      </View>

      <View style={{ ...styles.row }} width="95%">
        <Text style={{ textAlign: "left" }}>
          <Ionicons name="lock-closed-outline" size={20} color="black" />
          Password
        </Text>
        <TextInput
          borderWidth={1}
          borderColor="black"
          padding={10}
          marginVertical={5}
          height={50}
          width="95%"
          backgroundColor={"#fff"}
          placeholder="Item Name"
          marginHorizontal={5}
          value={""}
          onChangeText={() => {}}
        />
      </View>

      <View style={{ ...styles.row }} width="95%">
        <Text style={{ textAlign: "left" }}>
          <Ionicons name="home-outline" size={20} color="black" />
          Area
        </Text>
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
      <Button
        mode="contained"
        onPress={() => {
          signOut();
        }}
      >
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight + 10,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DAF0EE",

    // backgroundColor: "#fff",
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
  },

  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left", fontSize: 14 },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },

  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left", fontSize: 16 },
});
