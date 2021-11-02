import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import AppButton from '../components/AppButton'


export default function WelcomeScreen({navigation}) {
    return (
       <ImageBackground
       blurRadius={15}
       style={styles.background}
       source={require('../assets/welcome.jpg')}
       >
           <View style={styles.logoContainer}>
                <Image style={styles.logo} 
                source={require("../assets/favicon.png")}
                />
                <Text style={styles.tagline}>Rent what You want</Text>
           </View>
          <View style={styles.buttonContainer}>
            <AppButton title='login' onPress={() => navigation.navigate("Login")} />
            <AppButton title='Register' color='secondary' onPress={() => navigation.navigate("Register")}  />
          </View>
       </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background:
    {
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    buttonContainer:
    {
        padding:20,
        width:'100%'
    },
    logo:
    {
        width:100,
        height:100
    },
    logoContainer:
    {
        position:'absolute',
        top:70,
        alignItems:'center'
    },
    tagline:
    {
        fontSize:25,
        fontWeight:'600',
        paddingVertical:20,
    }
})
