import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
function SearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#DAF0EE' }}>
      <Text>Home!</Text>
    </View>
  );
}
function AddItemScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (

        <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Search') {
            iconName = focused
                ? 'search-circle-outline'
                : 'search-circle-sharp';
            } else if (route.name === 'AddItem') {
            iconName = focused ? 'add-circle-outline' : 'add-circle-sharp';
            }else if(route.name === 'Profile')
            {
                iconName = focused ? 'person-circle-outline' : 'person-circle-sharp';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#505050',
        tabBarInactiveTintColor: '#9DB5B2',
        })}
    >
        <Tab.Screen name="Search" component={SearchScreen} options={{headerShown:false}}/>
        <Tab.Screen name="AddItem" component={AddItemScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
      </Tab.Navigator>

  );
}