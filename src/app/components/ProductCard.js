import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProductCard({
  product,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {product.title}
        </Text>

        <Text style={styles.category}>
          {product.category}
        </Text>

        <View style={styles.bottom}>
          <Text style={styles.price}>
            ${product.price}
          </Text>

          <Text style={styles.rating}>
            ⭐ {product.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },

  image: {
    width: "100%",
    height: 160,
    backgroundColor: "#f5f5f5",
  },

  content: {
    padding: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    minHeight: 40,
  },

  category: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  price: {
    fontSize: 17,
    fontWeight: "700",
  },

  rating: {
    fontSize: 12,
  },
});