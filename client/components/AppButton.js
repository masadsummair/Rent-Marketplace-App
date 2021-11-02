import React from 'react'
import { StyleSheet, Text, TouchableOpacity} from 'react-native'

import colors from '../theme/color';

export default function AppButton( {title,onPress,color="primary",textColor="white",style} ) {
    return (
        <TouchableOpacity style={[styles.button,{backgroundColor:colors[color]},style]} onPress={onPress}>
                <Text style={[styles.text,{color:colors[textColor]}]}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button:{
        borderRadius:30,
        alignSelf:'center',
        alignItems:'center',
        padding:10,
        width:'90%',
        marginVertical:10,
    },
    text:
    {
        color:colors.white,
        fontSize:18,
    }
})

