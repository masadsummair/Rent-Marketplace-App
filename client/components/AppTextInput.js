import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import {MaterialCommunityIcons} from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'
import color from '../theme/color'
export default function AppTextInput({icon,color="", ...otherProps}) {
    return (
        <View style={styles.container}>
          {/* {icon && <MaterialCommunityIcons name={icon} size={20} color={color.secondary} style={styles.icon} />} */}
          <TextInput style={styles.input} {...otherProps} />
        </View>
    )
}
 
const styles = StyleSheet.create({
    container:{
        // backgroundColor:color.white,
        // borderRadius:30,
        // justifyContent:'center',
        // justifyContent:'center',
        // flexDirection:"row",
        // width:'20%',
        marginVertical:10,
    },
    // icon:
    // {
    //     marginRight:10,
    //     marginVertical:7
    // },
    input:
    {
        backgroundColor:'transparent',
        opacity:52,
        borderWidth:2,
        borderColor:'#505050',
        borderRadius:30,
        fontSize:18,
        paddingVertical:10,
        paddingLeft:30
    }
})
