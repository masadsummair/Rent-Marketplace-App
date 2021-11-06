import React from 'react';
import  Constants  from 'expo-constants';
import { StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen({children,style}) {
    return (
       <SafeAreaView style={[styles.screen],style}>{children}</SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen:
    {
        paddingTop:Constants.statusBarHeight,
        flex:1
    }
})
