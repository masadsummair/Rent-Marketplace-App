import { Form } from "formik";
import React from "react";

import { View, Text, StyleSheet } from "react-native";

export default function ContractsScreen() {
  return (
    <View style={styles.container}>
      <Text>ContractsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
