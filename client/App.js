import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigation/AuthNavigator";
import HomeNavigator from "./navigation/HomeNavigator";
import { AuthContext } from "./components/context";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Black.ttf"),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const authContext = useMemo(() => {
    return {
      signIn: (token, id) => {
        setIsLoading(true);
        setTimeout(() => {
          setUserToken(token);
          setUserId(id);
          setIsLoading(false);
        }, 500);
      },
      signOut: () => {
        setUserToken(null);
        setUserId(null);
      },
      signUp: (token, id) => {
        setIsLoading(true);
        setTimeout(() => {
          setUserToken(token);
          setUserId(id);
          setIsLoading(false);
        }, 500);
      },
      userToken,
      userId,
    };
  });

  useEffect(() => {
    //Simulating checking token - if user is logged in or not
    // setTimeout(() => {
    //   setIsloading(false);
    // }, 2000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? <HomeNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
