import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function ReturnPolicy() {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: "https://nuawoman.com/returns-and-cancellations?srsltid=AU7gw4VUMPPhEV1J4maJirM9Tp7NlpjabNhLB2WXMHS6FXMZ7625t6oF",
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