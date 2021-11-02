import React from 'react'
import { Image, StyleSheet} from 'react-native'
import { Formik } from 'formik';
import * as Yup from "yup"

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import Screen from '../components/Screen'
import ErrorMessage from '../components/ErrorMessage'
import AppText from '../components/AppText';

const validationSchema = Yup.object().shape({
    email:Yup.string().required().email().label("Email"),
    password:Yup.string().required().min(3).label("Password")
});

export default function LoginScreen() {
    return (
       <Screen  style={styles.container}>
            <Image style={styles.logo} source={require('../assets/favicon.png')} />
            
            <Formik 
            initialValues={{email:"",password:""}}
            onSubmit={values => console.log(values)}
            validationSchema={validationSchema}
            >
                {({handleChange, handleSubmit,errors,setFieldTouched,touched})=>(
                <>
                    <AppTextInput 
                    autoCapitalize= 'none'
                    autoCorrect={false} 
                    icon="email"
                    keyboard="email-address" 
                    onBlur={()=>setFieldTouched("email")}
                    placeholder="Email"
                    textContentType='emailAddress'
                    onChangeText={handleChange("email")}
                    />
                    <ErrorMessage error={errors.email} visible={touched.email} />

                    <AppTextInput 
                    autoCapitalize= 'none'
                    autoCorrect={false} 
                    icon="lock"
                    onBlur={()=>setFieldTouched("password")}
                    secureTextEntry
                    placeholder="Password"
                    textContentType='password'
                    onChangeText={handleChange("password")}
                    />
                    <ErrorMessage error={errors.password} visible={touched.password} />

                    <AppButton title="login" onPress={handleSubmit} />
                </>
                )}
            </Formik>
            
       </Screen>
    );
}

const styles = StyleSheet.create({
    container:
    {
        padding:10
    },
    logo:
    {
        width:80,
        height:80,
        alignSelf:'center',
        marginTop:50,
        marginBottom:20
    }
})
