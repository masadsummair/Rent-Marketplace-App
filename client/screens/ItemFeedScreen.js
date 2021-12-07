import React, { useEffect } from "react";
import { Searchbar } from "react-native-paper";
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
} from "react-native";
import axios from "axios";
import API_URL from "../config/API_URL";
import color from "../theme/color";

import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import List from "../components/List";

export default function ItemFeedScreen() {
  const [categories, setCategories] = React.useState([]);
  const [areas, setAreas] = React.useState([]);
  const [showFilters, setShowFilters] = React.useState(false);
  const [filterText, setFilterText] = React.useState("Show Filters");

  const [query, setQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedArea, setSelectedArea] = React.useState("");
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(0);

  const [pquery, psetQuery] = React.useState("");
  const [pselectedCategory, psetSelectedCategory] = React.useState("");
  const [pselectedArea, psetSelectedArea] = React.useState("");
  const [pminPrice, psetMinPrice] = React.useState(0);
  const [pmaxPrice, psetMaxPrice] = React.useState(0);

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    // const client = axios.create({
    //   baseURL: API_URL,
    // });

    // client
    //   .get("https://jsonplaceholder.typicode.com/todos")
    //   .then((response) => {
    //     console.log(response.data);
    //     setCategories(response.data);
    //   });

    const dareas = ["", "Shadman", "Nazimabad", "Gulshan", "DHA"];
    const dcategories = ["", "Electronics", "Fashion", "Home", "Books"];
    setAreas(dareas);
    setCategories(dcategories);

    setSelectedArea("");
    setSelectedCategory("");
    setMinPrice(0);
    setMaxPrice(0);
    setQuery("");

    psetSelectedArea("");
    psetSelectedCategory("");
    psetMinPrice(0);
    psetMaxPrice(0);
    psetQuery("");

    // const client = axios.create({ baseURL: API_URL });
    // client
    //   .get(`https://jsonplaceholder.typicode.com/todos/${search}`)
    //   .then((res) => {
    //     setProducts([...res.data]);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    //Setting Categories

    console.log("Result Changed");
  }, []);

  // let typingTimer;
  // const requestTimer = (query) => {
  //   clearTimeout(typingTimer);
  //   typingTimer = setTimeout(() => {
  //     setSearch(query);
  //   }, 1000);
  // };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Type product name"
        style={{ marginHorizontal: 10, marginVertical: 5 }}
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
              onChangeText={(text) => psetMinPrice(text)}
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
              onChangeText={(text) => psetMaxPrice(text)}
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
        category={selectedCategory}
        area={selectedArea}
        query={query}
        min={minPrice}
        max={maxPrice}
      />
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
