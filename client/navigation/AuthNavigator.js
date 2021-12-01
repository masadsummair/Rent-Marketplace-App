import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Home from '../screens/HomeScreen'; 
import BottomTab from '../screens/BottomTab'
const Stack = createStackNavigator();

export default function AuthNavigator() 
{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}} />
            <Stack.Screen name="Home" component={BottomTab} options={{headerShown:false}} />
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
        </Stack.Navigator>
    )
}

