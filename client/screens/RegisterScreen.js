import React, { useState } from "react";
import {
  Dimensions,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
// import { Input } from 'react-native-elements';
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import Screen from "../components/Screen";
import ErrorMessage from "../components/ErrorMessage";
import color from "../theme/color";
import axios from "axios";
import API_URL from "../config/API_URL";
import { AuthContext } from "../components/context";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DateTimePickerModal from "react-native-modal-datetime-picker";
const client = axios.create({ baseURL: API_URL });

const validationSchema = Yup.object().shape({
  // email: Yup.string().required().email().label("Email"),
  // password: Yup.string().required().min(3).label("Password"),
  // firstName:Yup.string().required().label("First Name"),
  // lastName:Yup.string().required().label("Last Name"),
  // cnic: Yup.string()
  //   .required()
  //   .matches("^[0-9]{5}-[0-9]{7}-[0-9]$", "Invalid CNIC")
  //   .label("CNIC"),
  // phone: Yup.string()
  //   .required()
  //   .matches(`^[0-9]{11}$`, "Should be of 11 digits")
  //   .label("Phone"),
  // street:Yup.string().required().label("Street"),
  // city:Yup.string().required().label("City"),
  // country:Yup.string().required().label("Country"),
  // birthDate:Yup.string().required().label("Birthdate"),
});

export default function RegisterScreen({ navigation }) {

  const [date, setDate] = useState(new Date());

  const [show, setShow] = useState(false);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const { signUp } = React.useContext(AuthContext);
  const [areas, setAreas] = React.useState([]);
  React.useEffect(() => {
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
    console.log("Result Changed");
  }, []);

  const signup = async (values, actions) => {
    console.log("values", values);
    console.log(values);
    const res = await client.post("/signup", {
      ...values,
    });
    if (res.status == 200) {
      let userId = res.data.userId;
      let token = res.data.token;
      signUp(token, userId);
    } else if (res.status == 202) {
      let msg = JSON.parse(res["request"]["_response"]).message;
      setMessage(msg);
      setModalVisible(true);
    }
    actions.resetForm({ values: "" });
    actions.setSubmitting(false);
  };
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/images/welcome_background.png")}
    >
      <ScrollView>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{message}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    console.log(modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <Screen style={styles.container}>
          <Text style={styles.heading}>Register</Text>
          <Formik
            initialValues={{
              email: "",
              password: "",
              firstName: "",
              lastName: "",
              cnic: "",
              phone: "",
              street: "",
              area: "",
              birthDate: `${date.getFullYear()}-${
                date.getMonth() + 1
              }-${date.getDate()}`,
            }}
            onSubmit={signup}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              setFieldTouched,
              touched,
              values,
            }) => (
              <>
                <AppTextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={() => setFieldTouched("email")}
                  placeholder="Enter Email"
                  textContentType="emailAddress"
                  onChangeText={handleChange("email")}
                  value={values.email}
                />
                <ErrorMessage error={errors.email} visible={touched.email} />

                <AppTextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={() => setFieldTouched("password")}
                  secureTextEntry
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  value={values.password}
                />
                <ErrorMessage
                  error={errors.password}
                  visible={touched.password}
                />

                <AppTextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={() => setFieldTouched("firstName")}
                  placeholder="First Name"
                  onChangeText={handleChange("firstName")}
                  value={values.firstName}
                />
                <ErrorMessage
                  error={errors.firstName}
                  visible={touched.firstName}
                />
                <AppTextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={() => setFieldTouched("lastName")}
                  placeholder="Last Name"
                  onChangeText={handleChange("lastName")}
                />
                <ErrorMessage
                  error={errors.lastName}
                  visible={touched.lastName}
                />
                <AppTextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={() => setFieldTouched("cnic")}
                  placeholder="CNIC"
                  onChangeText={handleChange("cnic")}
                  value={values.cnic}
                />
                <ErrorMessage error={errors.cnic} visible={touched.cnic} />
                <AppTextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={() => setFieldTouched("phone")}
                  placeholder="Phone Number"
                  onChangeText={handleChange("phone")}
                />
                <ErrorMessage error={errors.phone} visible={touched.phone} />
                <AppTextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={() => setFieldTouched("street")}
                  placeholder="Street"
                  onChangeText={handleChange("street")}
                  value={values.street}
                />
                <ErrorMessage error={errors.street} visible={touched.street} />
                {/* <AppTextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  onBlur={() => setFieldTouched("area")}
                  placeholder="Area"
                  onChangeText={handleChange("area")}
                  value={values.area}
                />
                <ErrorMessage error={errors.area} visible={touched.area} /> */}

                <SelectDropdown
                  data={areas}
                  defaultValue={areas[0]}
                  onSelect={(selectedItem, index) => {
                    handleChange("area")(selectedItem);
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
                      <FontAwesome
                        name="chevron-down"
                        color={"#444"}
                        size={18}
                      />
                    );
                  }}
                  dropdownIconPosition={"right"}
                  dropdownStyle={styles.dropdown1DropdownStyle}
                  rowStyle={styles.dropdown1RowStyle}
                  rowTextStyle={styles.dropdown1RowTxtStyle}
                />

                <TouchableOpacity
                  style={{
                    backgroundColor: "transparent",
                    opacity: 52,
                    borderWidth: 2,
                    borderColor: "#505050",
                    borderRadius: 30,
                    paddingVertical: 10,
                    paddingLeft: 30,
                  }}
                  onPress={() => {
                    setShow(true);
                  }}
                >
                  <Text style={{ fontSize: 18, color: "grey" }}>
                    {`Birth Date: ${date.getDate()}-${
                      date.getMonth() + 1
                    }-${date.getFullYear()}`}
                  </Text>
                </TouchableOpacity>
                {show ? (
                  <DateTimePickerModal
                    isVisible={show}
                    mode="date"
                    onConfirm={(date) => {
                      handleChange("birthDate")(
                        `${date.getFullYear()}-${
                          date.getMonth() + 1
                        }-${date.getDate()}`
                      );
                      setDate(date);
                      setShow(false);
                    }}
                    onCancel={() => {
                      setShow(false);
                    }}
                  />
                ) : (
                  <></>
                )}

                <AppButton title="Sign Up" onPress={handleSubmit} />
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                  <Text style={styles.text}>Already have account? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={[styles.text, { color: color.white }]}>
                      Sign In{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </Screen>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    top: 50,
    marginBottom: 120,
  },
  background: {
    flex: 1,
    width: Dimensions.get("window").width, //for full screen
    height: Dimensions.get("window").height, //for full screen
  },
  heading: {
    padding: 15,
    fontSize: 70,
    fontWeight: "bold",
    color: color.primary,
    marginBottom: 15,
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: color.primary,
    alignContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  //Dropdown Styling
  dropdown1BtnStyle: {
    backgroundColor: "transparent",
    opacity: 52,
    borderWidth: 2,
    borderColor: "#505050",
    borderRadius: 30,
    paddingVertical: 10,
    paddingLeft: 30,
    width: "100%",
    marginVertical: 10,
  },

  dropdown1BtnTxtStyle: {
    textAlign: "left",
    marginLeft: 20,
    textTransform: "capitalize",
    fontSize: 18,
    color: "grey",
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
