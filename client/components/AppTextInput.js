import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'
import color from '../theme/color'
export default function AppTextInput({icon, ...otherProps}) {
    return (
        <View style={styles.container}>
          {icon && <MaterialCommunityIcons name={icon} size={20} color={color.secondary} style={styles.icon} />}
          <TextInput style={styles.TextInput} {...otherProps} />
        </View>
    )
}
 
const styles = StyleSheet.create({
    container:{
        backgroundColor:color.white,
        borderRadius:25,
        flexDirection:"row",
        width:'100%',
        padding:15,
        marginVertical:10
    },
    icon:
    {
        marginRight:10,
        marginVertical:7
    },
    TextInput:
    {
        fontSize:18,
        // fontFamily:
    }
})
