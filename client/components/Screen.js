import React from 'react';
import { StyleSheet,} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen({children,style}) {
    return (
    // <KeyboardAvoidingView
        // behavior={Platform.OS === 'ios' ? 'position' : ''}
        // style={{flex: 1}}
        // enabled>
        <SafeAreaView style={[styles.screen],style}>{children}</SafeAreaView>
    // </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen:
    {
        flex:1
    }
})
