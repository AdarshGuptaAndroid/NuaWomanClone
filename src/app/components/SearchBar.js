import {
    StyleSheet,
    TextInput,
    View,
} from "react-native";

export default function SearchBar({
  value,
  onChangeText,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search products..."
        placeholderTextColor="#999"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 15,
    justifyContent: "center",
  },

  input: {
    fontSize: 16,
  },
});