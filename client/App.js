import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './navigation/AuthNavigator';
import { useFonts } from 'expo-font';

export default function App() {
  const [loaded] = useFonts({
    Roboto: require('./assets/fonts/Roboto-Black.ttf'),
});
  
  return (
    <NavigationContainer>
      <AuthNavigator/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
