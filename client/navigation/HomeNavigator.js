import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTab from "../screens/BottomTab";

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
