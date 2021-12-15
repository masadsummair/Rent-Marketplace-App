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
  StatusBar,
} from "react-native";
import { ActivityIndicator, FAB } from "react-native-paper";
import { Card as Modal } from "react-native-paper";
import ItemsList from "../components/ItemsList";
import * as ImagePicker from "expo-image-picker";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import API_URL from "../config/API_URL";
import { AuthContext } from "../components/context";

export default function UserItemScreen() {
  const [visible, setVisible] = React.useState(false);
  const [iconName, setIconName] = React.useState("plus");
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { userId } = React.useContext(AuthContext);

  const [itemName, setItemName] = useState("");
  const [itemid, setItemid] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState([]);
  const [defaultitemCategory, setDefaultItemCategory] = useState("");
  const [imageURI, setImageURI] = useState(null);
  const [imageName, setImageName] = useState("");
  const [reload, setReload] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);

  const client = axios.create({
    baseURL: API_URL,
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setUpdateImage(true);
    if (!result.cancelled) {
      console.log(result.uri);
      setImageURI(result.uri);
    }
  };

  async function uploadData() {
    if (showUpdateModal) {
      let imageFileName = null;
      if (updateImage) {
        await client
          .delete("/images", {
            data: {
              image_name: `${imageName}`,
            },
          })
          .then(
            (response) => {
              console.log(response["request"]["_response"]);
            },
            (response) => {
              console.log(response["request"]["_response"]);
              return;
            }
          );

        if (imageName != null) {
          imageFileName = `${itemName}_${Date.now()}.png`;
          const data = new FormData();
          data.append("image", {
            name: imageFileName,
            type: "image/jpeg",
            uri: imageURI,
          });
          client
            .post("/images", data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then(
              (response) => {
                console.log("image add sucessfully");
                console.log(response["request"]["_response"]);
              },
              (response) => {
                console.log("image add not sucessfully");
                console.log(response["request"]["_response"]);
              }
            );
        }
      }
      let itemData = {
        user_id: userId, //come from session
        item_id: itemid,
        item_name: itemName,
        description: itemDescription,
        price: itemPrice,
        image_url: imageFileName != null ? imageFileName : imageName,
        category_name: defaultitemCategory,
      };
      await client.put("/updateitem", itemData).then(
        (response) => {
          console.log("update sucessfully");
          console.log(response["request"]["_response"]);
        },
        (response) => {
          console.log("update not sucessfully");
          console.log(response["request"]["_response"]);
        }
      );
    } else {
      let imageFileName = null;
      if (imageURI != null) {
        imageFileName = `${itemName}_${Date.now()}.png`;
        const data = new FormData();
        data.append("image", {
          name: imageFileName,
          type: "image/jpeg",
          uri: imageURI,
        });
        client
          .post("/images", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(
            (response) => {
              console.log("image add sucessfully");
              console.log(response["request"]["_response"]);
            },
            (response) => {
              console.log("image add not sucessfully");
              console.log(response["request"]["_response"]);
            }
          );
      }

      let itemData = {
        user_id: userId, //come from session
        itemName: itemName,
        description: itemDescription,
        price: itemPrice,
        image_url: imageFileName,
        category_name: defaultitemCategory,
      };
      client.post("/additem", itemData).then(
        (response) => {
          console.log("add sucessfully");
          console.log(response["request"]["_response"]);
        },
        (response) => {
          console.log("add not sucessfully");
          console.log(response["request"]["_response"]);
        }
      );
    }
    setImageURI(null);
    setItemName("");
    setItemDescription("");
    setItemPrice(0);
    setItemCategory("");
    setReload(true);
  }

  useEffect(() => {
    console.log("Main");
  }, []);
  let intialItem = async () => {
    client.get("/category").then(
      (response) => {
        let category_data = response["data"];
        let dcategories = [];
        for (let i = 0; i < category_data.length; i++) {
          dcategories.push(category_data[i].cate_name);
        }
        setItemCategory(dcategories);
      },
      () => {
        console.log("error while getting category on item(useritemscreeen.js)");
      }
    );
  };
  let viewItem = (
    id,
    name,
    description,
    price,
    imageURL,
    category,
    availability
  ) => {
    if (availability == "available") {
      setItemid(id);
      setItemName(name);
      setItemDescription(description);
      setItemPrice(price);
      setDefaultItemCategory(category);
      setImageURI(API_URL + "/images/" + imageURL);
      setImageName(imageURL);
      setUpdateImage(false);
      intialItem();
      setshowUpdateModal(true);
      showModal();
      setIconName("close");
    }
  };

  return (
    <View style={styles.container}>
      <ItemsList reload={reload} reloadSetter={setReload} viewItem={viewItem} />

      {visible ? (
        <Modal>
          <ScrollView
            contentContainerStyle={{
              width: Dimensions.get("window").width,
              marginTop: StatusBar.currentHeight + 10,
              backgroundColor: "white",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingTop: 50,
              paddingBottom: 50,
            }}
          >
            <Image
              source={{
                uri: imageURI,
              }}
              style={{
                borderWidth: 1,
                borderColor: "black",
                width: 200,
                marginLeft: 0,
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
              data={itemCategory}
              // value={pselectedCategory}
              // defaultValueByIndex={1}
              defaultValue={defaultitemCategory}
              onSelect={(selectedItem, index) => {
                setDefaultItemCategory(selectedItem);
              }}
              defaultButtonText={
                showUpdateModal ? defaultitemCategory : "Select Category"
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
                return (
                  <FontAwesome name="chevron-down" color={"#444"} size={18} />
                );
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
                  //After getting the result, set the loader to false
                  if (showUpdateModal) {
                    console.log("error in add modal");
                  } else {
                    uploadData();
                    console.log("Add Request");
                    setSubmitting(false);
                    //Hide the modal
                    hideModal();

                    //Set icon name of floating button
                    setIconName("plus");

                    //Set reload to true, to render the list again
                    setReload(true);
                  }
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

                  if (showUpdateModal) {
                    uploadData();
                    console.log("Update Request");
                  } else {
                    console.log("error in update modal");
                  }

                  //After getting the result, set the loader to false
                  setSubmitting(false);
                  //Hide the modal
                  hideModal();

                  //Set icon name of floating button
                  setIconName("plus");

                  //Set reload to true, to render the list again
                  setReload(true);

                  //Clearing All Fields
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
          </ScrollView>
        </Modal>
      ) : (
        <></>
      )}

      <FAB
        style={styles.fab}
        large
        icon={iconName}
        onPress={() => {
          if (!visible) {
            intialItem();
            showModal();
            setIconName("close");
          } else {
            hideModal();

            //Clearing All Fields
            setImageURI(null);
            setItemName("");
            setItemDescription("");
            setItemPrice(0);
            setItemCategory([]);
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
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DAF0EE",
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
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

  dropdown1BtnStyle: {
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
