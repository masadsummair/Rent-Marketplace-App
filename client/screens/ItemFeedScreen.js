import React, { useEffect } from "react";
import { Searchbar, Modal, Button as RNButton } from "react-native-paper";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import axios from "axios";
import API_URL from "../config/API_URL";
import color from "../theme/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import List from "../components/List";

export default function ItemFeedScreen() {
  const [categories, setCategories] = React.useState([]);
  const [areas, setAreas] = React.useState([]);
  const [showFilters, setShowFilters] = React.useState(false);
  const [filterText, setFilterText] = React.useState("Show Filters");
  const [reload, setReload] = React.useState(true); //New

  const [query, setQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedArea, setSelectedArea] = React.useState("");
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(0);

  const [pquery, psetQuery] = React.useState("");
  const [pselectedCategory, psetSelectedCategory] = React.useState("");
  const [pselectedArea, psetSelectedArea] = React.useState("");
  const [pminPrice, psetMinPrice] = React.useState("");
  const [pmaxPrice, psetMaxPrice] = React.useState("");

//new
  //Set Modal Data - New
  const [itemId, setItemId] = React.useState("");
  const [itemName, setItemName] = React.useState("");
  const [itemPrice, setItemPrice] = React.useState(0);
  const [itemDescription, setItemDescription] = React.useState("");
  const [itemImage, setItemImage] = React.useState("");
  const [itemCategory, setItemCategory] = React.useState("");
  const [itemArea, setItemArea] = React.useState("");
  const [itemOwner, setItemOwner] = React.useState("");
  const [itemDays, setItemDays] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  //Set Modal Data - New

  const [loading, setLoading] = React.useState(false);
  //new
  let viewItem = (id,name,username,description,price,imageURL) => {
    console.log(id);
    setItemDescription(id);
    setItemName(name);
    setItemDescription(description);
    setItemPrice(price);
    setItemImage(imageURL);
    setItemOwner(username);
    setItemDays("");
    console.log(username);
    setVisible(true);
  };
  //new

  useEffect(() => {
    const client = axios.create({
      baseURL: API_URL,
    });
    const dareas = [""];
    const dcategories = [""];
    client.get("/area").then((response) => {
      let area_data = response["data"];
      for (let i = 0; i < area_data.length; i++) {
        dareas.push(area_data[i].area_name);
      }
    });
    client.get("/category").then((response) => {
      let category_data = response["data"];
      for (let i = 0; i < category_data.length; i++) {
        dcategories.push(category_data[i].cate_name);
      }
    });

    setAreas(dareas);
    setCategories(dcategories);

    setSelectedArea("");
    setSelectedCategory("");
    setMinPrice(0);
    setMaxPrice(0);
    setQuery("");

    psetSelectedArea("");
    psetSelectedCategory("");
    psetMinPrice("");
    psetMaxPrice("");
    psetQuery("");
    console.log("Result Changed");
  }, []);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Type product name"
        style={{ marginHorizontal: 10, marginVertical: 5, elevation: 0 }}
        onChangeText={
          // (query) => requestTimer(query)
          (query) => psetQuery(query)
        }
        value={pquery}
      />

      {showFilters ? (
        <View>
          <SelectDropdown
            data={categories}
            // value={pselectedCategory}
            // defaultValueByIndex={1}
            defaultValue={pselectedCategory}
            onSelect={(selectedItem, index) => {
              psetSelectedCategory(selectedItem);
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
              return (
                <FontAwesome name="chevron-down" color={"#444"} size={18} />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />

          <SelectDropdown
            // value={pselectedArea}
            data={areas}
            // defaultValueByIndex={1}
            defaultValue={pselectedArea}
            onSelect={(selectedItem, index) => {
              psetSelectedArea(selectedItem);
            }}
            defaultButtonText={"Select Area"}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={() => {
              return (
                <FontAwesome name="chevron-down" color={"#444"} size={18} />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />

          <View style={styles.minMaxContainer}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "black",
                padding: 10,
                marginVertical: 5,
              }}
              height={40}
              width="45%"
              backgroundColor={"#fff"}
              placeholder="Min"
              marginHorizontal={5}
              keyboardType="number-pad"
              value={String(pminPrice)}
              onChangeText={(value) => {(value>0)?psetMinPrice(value):psetMinPrice("");}}
            />

            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "black",
                padding: 10,
                marginVertical: 5,
              }}
              height={40}
              width="45%"
              backgroundColor={"#fff"}
              placeholder="Max"
              marginHorizontal={5}
              keyboardType="number-pad"
              value={String(pmaxPrice)}
              onChangeText={(value) => {(value>0)?psetMaxPrice(value):psetMaxPrice("");}}
            />
          </View>
        </View>
      ) : null}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          style={{
            width: "45%",
            flexDirection: "row",
            borderColor: "black",
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 10,
            padding: 10,
          }}
          onPress={() => {
            setQuery(pquery);
            setSelectedCategory(pselectedCategory);
            setSelectedArea(pselectedArea);
            setMinPrice(pminPrice);
            setMaxPrice(pmaxPrice);
            setReload(true); //New
          }}
        >
          <FontAwesome name="search" size={30} color={color.primary} />
          <Text style={{ marginHorizontal: 10 }}> Search </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "45%",
            flexDirection: "row",
            borderColor: "black",
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 10,
            padding: 10,
          }}
          onPress={() => {
            if (showFilters) {
              setShowFilters(false);
              setFilterText("Show Filters");
            } else {
              setShowFilters(true);
              setFilterText("Hide Filters");
            }
          }}
        >
          <FontAwesome name="filter" size={30} color={color.primary} />
          <Text style={{ marginHorizontal: 10 }}> {filterText} </Text>
        </TouchableOpacity>
      </View>

      <List
        userId={1} //userid come from session
        category={selectedCategory}
        area={selectedArea}
        query={query}
        min={minPrice}
        max={maxPrice}
        viewItem={viewItem}
        reload={reload}
        setReload={setReload}
      />

      <Modal
        dismissable={false}
        visible={visible}
        contentContainerStyle={styles.modal}
      >
        <Image
          source={{ uri: itemImage }}
          style={{
            borderWidth: 1,
            borderColor: "black",
            width: 200,
            height: 200,
            marginVertical: 5,
          }}
        />
        <Text
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
            marginVertical: 5,
            textAlign: "center",
            width: "95%",
            backgroundColor: "#fff",
            marginHorizontal: 5,
            
          }}
        >
          {itemName}
        </Text>

        <Text
          value={() => {}}
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
            marginVertical: 5,
            textAlign: "center",
            width: "95%",
            backgroundColor: "#fff",
            marginHorizontal: 5,
          }}
        >
          {itemDescription}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            borderWidth={1}
            borderColor="black"
            padding={10}
            marginVertical={5}
            height={50}
            width="25%"
            backgroundColor={"#fff"}
            placeholder="Enter Days"
            keyboardType="number-pad"
            marginHorizontal={5}
            value={String(itemDays)}
            onChangeText={(value) => {(value>0)?setItemDays(value):setItemDays("");}}

          />
          <View
            style={{
              marginVertical: 5,
              marginHorizontal: 5,
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "green",
              padding: 10,
              width: "65%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="cash-outline" size={20} color="green" />
            <Text
              style={{
                textTransform: "uppercase",
                marginLeft: 5,
                fontSize: 12,
              }}
            >
              You will pay {(itemDays=="")?itemPrice:itemPrice*itemDays} Rs to {itemOwner}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
          }}
        >
          <RNButton
            width="45%"
            icon="check"
            color="#00ab66"
            mode="contained"
            onPress={() => {
              //Initiate the contract here
              //You can find all the data about the product using the Modal Data state

              //Close the modal
              setVisible(false);

              //Setting reload to true will reload the list
              setReload(true);
            }}
          >
            Rent Item
          </RNButton>

          <RNButton
            marginLeft={10}
            width="45%"
            icon="close"
            color="#c70000"
            mode="contained"
            onPress={() => {
              setVisible(false);
            }}
          >
            Close
          </RNButton>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: StatusBar.currentHeight + 10,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#DAF0EE",
  },

  modal: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    marginTop: StatusBar.currentHeight + 10,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
    elevation: 1,
  },

  minMaxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
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

  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },

  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
});
