import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import {
  ActivityIndicator,
  FAB,
  Modal,
  Portal,
  Provider,
} from "react-native-paper";
import ContractsList from "../components/ContractsList";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const dcategories = ["active", "pending", "rejected", "onhold", "completed"];
let ldata = [
  {
    id: 1,
    name: "Product 1",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "100",
    image: "https://picsum.photos/200",
    uri: "https://picsum.photos/seed/picsum/200/200/",
  },
  {
    id: 2,
    name: "Product 2",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "200",
    image: "https://picsum.photos/200",
    uri: "https://picsum.photos/seed/picsum/200/200/",
  },
  {
    id: 3,
    name: "Product 3",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "300",
    image: "https://picsum.photos/200",
  },
  {
    id: 4,
    name: "Product 4",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "400",
    image: "https://picsum.photos/200",
  },
  {
    id: 5,
    name: "Product 5",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "500",
    image: "https://picsum.photos/200",
  },
  {
    id: 6,
    name: "Product 6",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "600",
    image: "https://picsum.photos/200",
  },
  {
    id: 7,

    name: "Product 7",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "700",
    image: "https://picsum.photos/200",
  },
  {
    id: 8,
    name: "Product 8",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "800",
    image: "https://picsum.photos/200",
  },
  {
    id: 9,
    name: "Product 9",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "900",
    image: "https://picsum.photos/200",
  },
  {
    id: 10,
    name: "Product 10",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "1000",
    image: "https://picsum.photos/200",
  },
  {
    id: 11,
    name: "Product 11",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "1100",
    image: "https://picsum.photos/200",
  },
  {
    id: 12,
    name: "Product 12",
    description:
      "Description of product 1 Description of product 1Description of product 1",
    price: "1200",
    image: "https://picsum.photos/200",
  },
];

export default function UserItemScreen() {
  const [visible, setVisible] = React.useState(false);
  const [iconName, setIconName] = React.useState("plus");
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [selectedState, setSelectedState] = useState("active");

  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [imageURI, setImageURI] = useState(null);
  const [reload, setReload] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [listFlag, setListFlag] = useState(true);

  useEffect(() => {
    console.log("Main");
  }, []);

  let viewItem = (id) => {
    console.log("View Item");
    // setItemName(ldata[id].name);
    // setItemDescription(ldata[id].description);
    // setItemPrice(ldata[id].price);
    // setItemCategory(ldata[id].category);
    // setImageURI(ldata[id].uri);
    // setshowUpdateModal(true);

    showModal();
  };

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={dcategories}
        // value={pselectedCategory}
        // defaultValueByIndex={1}
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
        viewItem={viewItem}
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
    backgroundColor: "#DAF0EE",
    // backgroundColor: "#fff",
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

  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left", fontSize: 14 },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },

  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left", fontSize: 16 },
});
