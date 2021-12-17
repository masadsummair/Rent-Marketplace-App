import React from "react";
import { View, Text, TextInput, StyleSheet, StatusBar } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../components/context";
import Ionicons from "react-native-vector-icons/Ionicons";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import API_URL from "../config/API_URL";

export default function ProfileScreen() {
  const { userId, signOut } = React.useContext(AuthContext);
  const itemCategory = ["Clothes", "Electronics", "Gulshan Iqbal", "Other"];
  const [name,setName] = React.useState("");
  const [email,setEmail] = React.useState("");
  const [cnic,setCnic] = React.useState("");
  const [phone,setPhone] = React.useState("");
  const [area,setArea] = React.useState("");
  const [areas,setAreas] = React.useState([]);
  const client = axios.create({
    baseURL: API_URL,
  });

  React.useEffect(()=>
  {
    client.get(`/getuser?userId=${userId}`).then(
      (response) => {
        let user = response["data"];
        setName(user[0].firstname);
        setEmail(user[0].email);
        setPhone(user[0].phone);
        setCnic(user[0].cnic);
        setArea(user[0].area_name);
      },
      (response) => {
        console.log(response["request"]["_response"]);
      }
    );
    var dareas = [""];
    client.get("/area").then(
      (response) => {
        let area_data = response["data"];
        for (let i = 0; i < area_data.length; i++) {
          dareas.push(area_data[i].area_name);
        }
        setAreas(dareas);
      },
      (response) => {
        console.log(response);
      }
    );
  },[])
  const updateData=async()=>
  {
    console.log(phone)
    console.log(userId)
    client.put("/updateuser",{
      "userId":userId,
      "areaName":area,
      "phone":phone
    }).then(
      (response) => {
        console.log(response["request"]["_response"]);
      },
      (response) => {
        console.log(response["request"]["_response"]);
      }
    );
  }
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
          HI <Text style={{ fontWeight: "bold" }}>{name}</Text>
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
          {email}
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
          {cnic}
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
          data={areas}
          value={area}
          // defaultValueByIndex={1}
          defaultValue={area}
          onSelect={(selectedItem, index) => {
            setArea(selectedItem);
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
          <Text  style={{ marginLeft: 5 }}>Phone Number</Text>
        </View>
        <TextInput
          borderWidth={1}
          borderColor="black"
          padding={10}
          marginVertical={5}
          width="95%"
          backgroundColor={"#fff"}
          keyboardType="number-pad"
          marginHorizontal={5}
          value={String(phone)}
          onChangeText={(value) => {if(value>=0 &&value.length<11){setPhone(value)}}}
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
          onPress={()=>{updateData()}}
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
