import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, StatusBar } from "react-native";
import ContractsList from "../components/ContractsList";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const dcategories = ["active", "pending", "rejected", "onhold","not rated" ,"completed"];
export default function UserItemScreen() {
  const [selectedState, setSelectedState] = useState("active");
  const [listFlag, setListFlag] = useState(true);

  useEffect(() => {
    console.log("Main");
  }, []);

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={dcategories}
        defaultValue={dcategories[0]}
        onSelect={(selectedItem, index) => {
          setSelectedState(selectedItem);
          setListFlag(true);
        }}
        defaultButtonText={"Select Category"}
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

      <ContractsList
        listState={selectedState}
        listFlag={listFlag}
        setListFlag={setListFlag}
      />
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
    // backgroundColor: "#DAF0EE",
    // backgroundColor: "#E0FBFC",
    backgroundColor: "#fff",
  },
  fab: {
    position: "absolute",

    margin: 16,
    right: 0,
    bottom: 0,
  },
  modal: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    marginTop: StatusBar.currentHeight + 10,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },

  //Dropdown Styling
  dropdown1BtnStyle: {
    width: "95%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#444",
    marginVertical: 5,
  },

  dropdown1BtnTxtStyle: {
    color: "#444",
    textAlign: "left",
    fontSize: 14,
    textTransform: "capitalize",
  },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },

  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: {
    color: "#444",
    textAlign: "left",
    fontSize: 16,
    textTransform: "capitalize",
  },
});
