import React from 'react'
import { Dimensions,Text,ImageBackground,TouchableOpacity,View, StyleSheet} from 'react-native'
import { Formik } from 'formik';
import * as Yup from "yup"
// import { Input } from 'react-native-elements';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import Screen from '../components/Screen'
import ErrorMessage from '../components/ErrorMessage'
import color from '../theme/color';
const API_URL =  'http://localhost:3000/login' 

const validationSchema = Yup.object().shape({
    email:Yup.string().required().email().label("Email"),
    password:Yup.string().required().min(3).label("Password")
});

export default function LoginScreen({navigation}) {
    return (
        <ImageBackground
            style={styles.background}  source={require('../assets/images/welcome_background.png')}>
       <Screen  style={styles.container}>

          
            <Formik 
            initialValues={{email:"",password:""}}
            onSubmit={values => fetch(API_URL, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: values.email,
                  password: values.password,
                })
              }).then((response) => console.log(response.json()))
            }
            validationSchema={validationSchema}
            >
                {({handleChange, handleSubmit,errors,setFieldTouched,touched})=>(
                <>

                    <Text style={styles.heading} >Login</Text>
                    <AppTextInput 
                    autoCapitalize= 'none'
                    autoCorrect={false} 
                    keyboard="email-address" 
                    onBlur={()=>setFieldTouched("email")}
                    placeholder="Enter Email"
                    textContentType='emailAddress'
                    onChangeText={handleChange("email")}
                    />
                    <ErrorMessage error={errors.email} visible={touched.email} />

                    <AppTextInput 
                    autoCapitalize= 'none'
                    autoCorrect={false} 
                    onBlur={()=>setFieldTouched("password")}
                    secureTextEntry
                    placeholder="Enter Password"
                    textContentType='password'
                    onChangeText={handleChange("password")}
                    />
                    <ErrorMessage error={errors.password} visible={touched.password} />
                    <TouchableOpacity style={{}} >
                        <Text style={[styles.text,{textAlign:"right",paddingRight:10}]} onPress={() => navigation.navigate("Welcome")} >Forget Passowrd ?</Text>
                    </TouchableOpacity>
                    <AppButton title="Sign In" onPress={handleSubmit} />
                    <View style={{flexDirection:"row",alignSelf:"center"}} >
                        <Text style={styles.text} >Don’t have account? </Text> 
                        <TouchableOpacity >
                                <Text style={[styles.text,{color:color.white}]} onPress={() => navigation.navigate("Register")} >Sign Up </Text>
                        </TouchableOpacity>
                    </View>
                    
                </>
                )}
            </Formik>
           
        </Screen>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container:
    {
        padding:10,
        top:50
    },
    background:
    {
        flex: 1,
        width: Dimensions.get("window").width, //for full screen
        height: Dimensions.get("window").height, //for full screen
    },
    heading:{
        padding:15,
        fontSize:70,
        fontWeight:'bold',
        color:color.primary,
        marginBottom:15
    },
    text:
    {
        textAlign:'center',
        fontSize:15,
        fontWeight:'bold',
        color:color.primary,
        alignContent:'center'
    }
})
