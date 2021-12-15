import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ItemFeedScreen from "./ItemFeedScreen";
import UserItemScreen from "./UserItemScreen";
import ContractsScreen from "./ContractsScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Search") {
            iconName = focused
              ? "search-circle-outline"
              : "search-circle-sharp";
          } else if (route.name === "Items") {
            iconName = focused ? "add-circle-outline" : "add-circle-sharp";
          } else if (route.name === "Profile") {
            iconName = focused
              ? "person-circle-outline"
              : "person-circle-sharp";
          } else if (route.name === "Contracts") {
            iconName = focused ? "briefcase-outline" : "briefcase-sharp";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#505050",
        tabBarInactiveTintColor: "#9DB5B2",
      })}
    >
      <Tab.Screen
        name="Search"
        component={ItemFeedScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Items"
        component={UserItemScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Contracts"
        component={ContractsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
