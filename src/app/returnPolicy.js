import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function ReturnPolicy() {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: "https://dummyjson.com/",
        }}
        style={styles.webview}
        startInLoadingState
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});