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
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
// import { Input } from 'react-native-elements';
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import Screen from "../components/Screen";
import ErrorMessage from "../components/ErrorMessage";
import color from "../theme/color";
import axios from 'axios';
const client=axios.create({baseURL:'http://192.168.43.105:8000'});

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(3).label("Password"),
});

export default function RegisterScreen({navigation}) {
  const signup=async (values,actions)=>
    {
        const res = await client.post('/signup',
        {
            ...values,
        })
        console.log(res.data.status);
        if(res.data.status)
        {
          navigation.navigate("Home");
        }
        actions.resetForm();
        actions.setSubmitting(false);
    }
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/images/welcome_background.png")}
    >
        <ScrollView>
        <Screen style={styles.container}>
         
            <Text style={styles.heading}>gister</Text>
            <Formik
              initialValues={{
                email: '',
                password: '',
                first_name: '',
                last_name: '',
                cnic: '',
                phone: '',
                street: '',
                city: '',
                country: '',
                birth_date: ''
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
              }) => (
                <>
                   <AppTextInput 
                    autoCapitalize= 'none'
                    autoCorrect={false} 
                    onBlur={()=>setFieldTouched("email")}
                    placeholder="Enter Email"
                    textContentType='emailAddress'
                    onChangeText={handleChange("email")}
                    />
                    <ErrorMessage error={errors.email} visible={touched.email} />

                  <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("password")}
                    secureTextEntry
                    placeholder="Password"
                    onChangeText={handleChange("password")}
                  />
                  <ErrorMessage
                    error={errors.password}
                    visible={touched.password}
                  />

                  <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("first_name")}
                    placeholder="First Name"
                    onChangeText={handleChange("first_name")}
                  />

                  <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("last_name")}
                    placeholder="Last Name"
                    onChangeText={handleChange("last_name")}
                  />

                  <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("cnic")}
                    placeholder="CNIC"
                    onChangeText={handleChange("cnic")}
                  />

                  <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("phone")}
                    placeholder="Phone Number"
                    onChangeText={handleChange("phone")}
                  />

                  <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("street")}
                    placeholder="Street"
                    onChangeText={handleChange("street")}
                  />

                  <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("city")}
                    placeholder="City"
                    onChangeText={handleChange("city")}
                  />

                  <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("country")}
                    placeholder="Country"
                    onChangeText={handleChange("country")}
                  />

                  <AppTextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onBlur={() => setFieldTouched("birth_date")}
                    placeholder="Birth Date"
                    onChangeText={handleChange("birth_date")}
                  />

                  <AppButton title="Sign Up" onPress={handleSubmit} />
                  <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <Text style={styles.text}>Already have account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
    marginBottom:120
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
});