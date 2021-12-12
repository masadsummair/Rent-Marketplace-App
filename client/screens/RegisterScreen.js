import React from "react";
import {
  Dimensions,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
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
const client = axios.create({ baseURL: API_URL });

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(3).label("Password"),
  firstName:Yup.string().required().label("First Name"),
  lastName:Yup.string().required().label("Last Name"),
  cnic:Yup.string().required().label("CNIC"),
  phone:Yup.string().required().label("Phone"),
  street:Yup.string().required().label("Street"),
  area:Yup.string().required().label("Area"),
  city:Yup.string().required().label("City"),
  country:Yup.string().required().label("Country"),
  birthDate:Yup.string().required().label("Birthdate"),
});

export default function RegisterScreen({ navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");
//new
//   const signup = async (values, actions) => {
//     const res = await client.post("/signup", {
//       ...values,
//     });
//     if (res.status == 200) {
//       navigation.navigate("Home");
//     } else if (res.status == 202) {
//       let msg = JSON.parse(res["request"]["_response"]).message;
//       setMessage(msg);
//       setModalVisible(true);
//      };
//new
  const signup=async (values,actions)=>
    {
        const res = await client.post('/signup',
        {
            ...values,
        })
        if(res.status==200)
        {
          navigation.push("Home");
        }
        else if(res.status==202)
        {
          let msg=JSON.parse(res["request"]["_response"]).message;
          setMessage(msg);
          setModalVisible(true);
        }
        
        actions.resetForm({values: ''});
        actions.setSubmitting(false);

    };

    actions.resetForm({ values: "" });
    actions.setSubmitting(false);
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
//new
{/* //           <Text style={styles.heading}>Register</Text>
//           <Formik
//             initialValues={{
//               email: "",
//               password: "",
//               firstName: "",
//               lastName: "",
//               cnic: "",
//               phone: "",
//               street: "",
//               city: "",
//               country: "",
//               birthDate: "",
//             }}
//             onSubmit={signup}
//             validationSchema={validationSchema}
//           >
//             {({
//               handleChange,
//               handleSubmit,
//               errors,
//               setFieldTouched,
//               touched,
//               values,
//             }) => (
//               <>
//                 <AppTextInput
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                   onBlur={() => setFieldTouched("email")}
//                   placeholder="Enter Email"
//                   textContentType="emailAddress"
//                   onChangeText={handleChange("email")}
//                   value={values.email}
//                 />
//                 <ErrorMessage error={errors.email} visible={touched.email} /> */}
//new
            <Text style={styles.heading}>Register</Text>
            <Formik
              initialValues={{
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                cnic: '',
                phone: '',
                street: '',
                area:'',
                city: '',
                country: '',
                birthDate: ''
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
                values
              }) => (
                <>
                   <AppTextInput 
                    autoCapitalize= 'none'
                    autoCorrect={false} 
                    onBlur={()=>setFieldTouched("email")}
                    placeholder="Enter Email"
                    textContentType='emailAddress'
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

//new
{/* //                 <AppTextInput
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                   onBlur={() => setFieldTouched("firstName")}
//                   placeholder="First Name"
//                   onChangeText={handleChange("firstName")}
//                   value={values.firstName}
//                 />
//                 <ErrorMessage
//                   error={errors.firstName}
//                   visible={touched.firstName}
//                 />
//                 <AppTextInput
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                   onBlur={() => setFieldTouched("lastName")}
//                   placeholder="Last Name"
//                   onChangeText={handleChange("lastName")}
//                 />
//                 <ErrorMessage
//                   error={errors.lastName}
//                   visible={touched.lastName}
//                 />
//                 <AppTextInput
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                   onBlur={() => setFieldTouched("cnic")}
//                   placeholder="CNIC"
//                   onChangeText={handleChange("cnic")}
//                   value={values.cnic}
//                 />
//                 <ErrorMessage error={errors.cnic} visible={touched.cnic} />
//                 <AppTextInput
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                   onBlur={() => setFieldTouched("phone")}
//                   placeholder="Phone Number"
//                   onChangeText={handleChange("phone")}
//                 />
//                 <ErrorMessage error={errors.phone} visible={touched.phone} />
//                 <AppTextInput
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                   onBlur={() => setFieldTouched("street")}
//                   placeholder="Street"
//                   onChangeText={handleChange("street")}
//                   value={values.street}
//                 />
//                 <ErrorMessage error={errors.street} visible={touched.street} />
//                 <AppTextInput
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                   onBlur={() => setFieldTouched("city")}
//                   placeholder="City"
//                   onChangeText={handleChange("city")}
//                   value={values.city}
//                 />
//                 <ErrorMessage error={errors.city} visible={touched.city} />
//                 <AppTextInput
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                   onBlur={() => setFieldTouched("country")}
//                   placeholder="Country"
//                   onChangeText={handleChange("country")}
//                   value={values.country}
//                 />
//                 <ErrorMessage
//                   error={errors.country}
//                   visible={touched.country}
//                 />
//                 <AppTextInput
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                   onBlur={() => setFieldTouched("birthDate")}
//                   placeholder="Birth Date"
//                   onChangeText={handleChange("birthDate")}
//                   value={values.birthDate}
//                 />
//                 <ErrorMessage
//                   error={errors.birthDate}
//                   visible={touched.birthDate}
//                 />
//                 <AppButton title="Sign Up" onPress={handleSubmit} />
//                 <View style={{ flexDirection: "row", alignSelf: "center" }}>
//                   <Text style={styles.text}>Already have account? </Text>
//                   <TouchableOpacity
//                     onPress={() => navigation.navigate("Login")}
//                   >
//                     <Text style={[styles.text, { color: color.white }]}>
//                       Sign In{" "}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </>
//             )}
//           </Formik> */}
//new
                  <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("firstName")}
                    placeholder="First Name"
                    onChangeText={handleChange("firstName")}
                    value={values.firstName}
                  />
                  <ErrorMessage error={errors.firstName} visible={touched.firstName} />
                  <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("lastName")}
                    placeholder="Last Name"
                    onChangeText={handleChange("lastName")}
                  />
                  <ErrorMessage error={errors.lastName} visible={touched.lastName} />
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
                  <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("city")}
                    placeholder="City"
                    onChangeText={handleChange("city")}
                    value={values.city}
                  />
                  <ErrorMessage error={errors.city} visible={touched.city} />
                  <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("area")}
                    placeholder="area"
                    onChangeText={handleChange("area")}
                    value={values.area}
                  />
                  <ErrorMessage error={errors.area} visible={touched.area} />
                  <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("country")}
                    placeholder="Country"
                    onChangeText={handleChange("country")}
                    value={values.country}
                  />
                  <ErrorMessage error={errors.country} visible={touched.country} />
                  <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("birthDate")}
                    placeholder="Birth Date"
                    onChangeText={handleChange("birthDate")}
                    value={values.birthDate}
                  />
                  <ErrorMessage error={errors.birthDate} visible={touched.birthDate} />
                  <AppButton title="Sign Up" onPress={handleSubmit} />
                  <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <Text style={styles.text}>Already have account? </Text>
                    <TouchableOpacity onPress={() => navigation.push("Login")}>
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
});

