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
import ItemsList from "../components/ItemsList";
import * as ImagePicker from "expo-image-picker";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const dareas = ["", "Shadman", "Nazimabad", "Gulshan", "DHA"];
const dcategories = ["", "Electronics", "Fashion", "Home", "Books"];
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

  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [imageURI, setImageURI] = useState(null);
  const [reload, setReload] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result);
      // console.log(result["base64"]);
      setImageURI(result.uri);
    }
  };

  async function uploadData() {
    const data = new FormData();
    data.append("file", {
      name: "someRandomName",
      type: "image/jpeg",
      uri: imageURI,
    });
    data.append("itemName", itemName);
    data.append("itemDescription", itemDescription);
    data.append("itemPrice", itemPrice);
    data.append("itemCategory", itemCategory);
    // const response = await fetch(my_upload_api.php, {
    //   method: "POST",
    //   body: data,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    setReload(true);
  }

  useEffect(() => {
    console.log("Main");
  }, []);

  let viewItem = (id) => {
    setItemName(ldata[id].name);
    setItemDescription(ldata[id].description);
    setItemPrice(ldata[id].price);
    setItemCategory(ldata[id].category);
    setImageURI(ldata[id].uri);
    setshowUpdateModal(true);

    showModal();
    setIconName("close");
  };

  return (
    <View style={styles.container}>
      <ItemsList reload={reload} reloadSetter={setReload} viewItem={viewItem} />

      {/* Add Item Modal */}
      <Modal
        dismissable={false}
        visible={visible}
        contentContainerStyle={styles.modal}
      >
        <Image
          source={{ uri: imageURI }}
          style={{
            borderWidth: 1,
            borderColor: "black",
            width: 200,
            height: 200,
            marginVertical: 5,
          }}
        />

        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
            marginVertical: 5,
            height: 50,
            width: "95%",
            backgroundColor: "#fff",
            marginHorizontal: 5,
          }}
          onPress={() => {
            pickImage();
          }}
        >
          <FontAwesome name="search" size={15} color="black" />
          <Text style={{ marginHorizontal: 10 }}>Upload Image</Text>
        </TouchableOpacity>
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
          value={itemName}
          onChangeText={(text) => {
            setItemName(text);
          }}
        />

        <TextInput
          borderWidth={1}
          borderColor="black"
          padding={10}
          marginVertical={5}
          height={70}
          width="95%"
          backgroundColor={"#fff"}
          placeholder="Item Description"
          marginHorizontal={5}
          value={itemDescription}
          multiline={true}
          onChangeText={(text) => {
            setItemDescription(text);
          }}
        />
        <TextInput
          borderWidth={1}
          borderColor="black"
          padding={10}
          marginVertical={5}
          height={50}
          width="95%"
          backgroundColor={"#fff"}
          placeholder="Price"
          marginHorizontal={5}
          keyboardType="number-pad"
          value={String(itemPrice)}
          onChangeText={(text) => {
            setItemPrice(text);
          }}
        />

        <SelectDropdown
          data={dcategories}
          // value={pselectedCategory}
          // defaultValueByIndex={1}
          defaultValue={dcategories[1]}
          onSelect={(selectedItem, index) => {
            // psetSelectedCategory(selectedItem);
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
        {!showUpdateModal ? (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "black",
              padding: 10,
              marginVertical: 5,
              height: 50,
              width: "95%",
              backgroundColor: "#fff",
              marginHorizontal: 5,
            }}
            onPress={() => {
              // Set Loader to true
              // setSubmitting(true);
              setSubmitting(true);

              //Send the request to the server
              setTimeout(() => {
                //After getting the result, set the loader to false
                setSubmitting(false);
                //Hide the modal
                hideModal();

                //Set icon name of floating button
                setIconName("plus");

                //Set reload to true, to render the list again
                setReload(true);
              }, 5000);

              //Clearing All Fields
              setImageURI(null);
              setItemName("");
              setItemDescription("");
              setItemPrice(0);
              setItemCategory("");
            }}
          >
            {submitting ? (
              <ActivityIndicator size="small" color="black" />
            ) : (
              <>
                <FontAwesome name="paper-plane" size={15} color="black" />
                <Text style={{ marginHorizontal: 10 }}>Add Item</Text>
              </>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "black",
              padding: 10,
              marginVertical: 5,
              height: 50,
              width: "95%",
              backgroundColor: "#fff",
              marginHorizontal: 5,
            }}
            onPress={() => {
              // Set Loader to true
              // setSubmitting(true);
              setSubmitting(true);

              //Send the request to the server
              setTimeout(() => {
                if (showUpdateModal) {
                  console.log("Update Request");
                } else {
                  console.log("Add Request");
                }

                //After getting the result, set the loader to false
                setSubmitting(false);
                //Hide the modal
                hideModal();

                //Set icon name of floating button
                setIconName("plus");

                //Set reload to true, to render the list again
                setReload(true);
              }, 2000);

              //Clearing All Fields
              setImageURI(null);
              setItemName("");
              setItemDescription("");
              setItemPrice(0);
              setItemCategory("");
            }}
          >
            {submitting ? (
              <ActivityIndicator
                size="small"
                color={showUpdateModal ? "#ffcc00" : "black"}
              />
            ) : (
              <>
                <FontAwesome
                  name={showUpdateModal ? "pencil" : "paper-plane"}
                  size={15}
                  color="black"
                />

                <Text style={{ marginHorizontal: 10 }}>
                  {showUpdateModal ? "Update Item" : "Add Item"}
                </Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </Modal>

      <FAB
        style={styles.fab}
        large
        icon={iconName}
        onPress={() => {
          if (!visible) {
            showModal();
            setIconName("close");
          } else {
            hideModal();

            //Clearing All Fields
            setImageURI(null);
            setItemName("");
            setItemDescription("");
            setItemPrice(0);
            setItemCategory("");
            setIconName("plus");
            setshowUpdateModal(false);
          }
          console.log("Pressed");
          console.log(visible);
        }}
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
