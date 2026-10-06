// import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function Cart() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>

      <Text style={styles.empty}>
        Your cart is empty
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
  },

  empty: {
    marginTop: 40,
    textAlign: "center",
    color: "#777",
    fontSize: 16,
  },
});