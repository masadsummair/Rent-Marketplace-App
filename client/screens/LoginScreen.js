import React from 'react'
import { Modal,Pressable,ScrollView,Dimensions,Text,ImageBackground,TouchableOpacity,View, StyleSheet} from 'react-native'
import { Formik, FormikConsumer,FormikBag } from 'formik';
import * as Yup from "yup"
// import { Input } from 'react-native-elements';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import Screen from '../components/Screen'
import ErrorMessage from '../components/ErrorMessage'
import color from '../theme/color';
import axios from 'axios';
import API_URL from '../config/API_URL'
const client=axios.create({baseURL:API_URL});
const validationSchema = Yup.object().shape({
    email:Yup.string().required().email().label("Email"),
    password:Yup.string().required().min(3).label("Password")
});

export default function LoginScreen({navigation}) {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const login=async (values,actions)=>
    {
        const res = await client.post('/login',
        {
            ...values,
        })
        console.log(values);
        if(res.status==200)
        {
          console.log("asad");
          navigation.push("Home");
        }
        else if(res.status==202)
        {
          let msg=JSON.parse(res["request"]["_response"]).message;
          setMessage(msg);
          setModalVisible(true);
        }
        actions.resetForm();
        actions.setSubmitting(false);
    }
    return (
    <ImageBackground
        style={styles.background}  source={require('../assets/images/welcome_background.png')}>
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
                        onPress={() => {setModalVisible(!modalVisible); console.log(modalVisible)}}
                      >
                        <Text style={styles.textStyle}>Close</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </View>
       <Screen  style={styles.container}>
            
          
            <Formik 
            initialValues={{email:"",password:""}}
            onSubmit={login}

            validationSchema={validationSchema}
            >
                {({handleChange, handleSubmit,errors,setFieldTouched,touched,values})=>(
                <>

                    <Text style={styles.heading} >Login</Text>
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
                    autoCapitalize= 'none'
                    autoCorrect={false} 
                    onBlur={()=>setFieldTouched("password")}
                    secureTextEntry
                    placeholder="Enter Password"
                    textContentType='password'
                    onChangeText={handleChange("password")}
                    value={values.password}
                    />
                    <ErrorMessage error={errors.password} visible={touched.password} />
                    <TouchableOpacity style={{}} >
                        <Text style={[styles.text,{textAlign:"right",paddingRight:10}]} onPress={() => navigation.push("Welcome")} >Forget Passowrd ?</Text>
                    </TouchableOpacity>
                    
                    <AppButton title="Sign In" onPress={handleSubmit} />
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <Text style={styles.text}>Don't have account? </Text>
                    <TouchableOpacity onPress={() => navigation.push("Register")}>
                      <Text style={[styles.text, { color: color.white }]}>
                        Sign Up{" "}
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
    container:
    {
        padding:10,
        top:50,
        marginBottom:120
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
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonClose: {
        backgroundColor: "red",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})
