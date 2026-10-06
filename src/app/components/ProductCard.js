
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";

// import { addToCart } from ".app/redux/cartSlice";
import { addToCart } from "../redux/cartSlice";
import { logAddToCart } from '../utils/analytics';
export default function ProductCard({
  product,
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const discountedPrice =
    product.price -
    (product.price *
      product.discountPercentage) /
      100;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,

        discountedPrice: Number(
          discountedPrice.toFixed(2)
        ),
      })
    );
    logAddToCart(
      product.id,
      product.title,
      1
    );
  };

  const openDetails = () => {
    router.push(
      `/product/${product.id}`
    );
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={openDetails}
      >
        <Image
          source={{
            uri: product.thumbnail,
          }}
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

          <View style={styles.priceRow}>
            <Text style={styles.price}>
              $
              {discountedPrice.toFixed(
                2
              )}
            </Text>

            <Text style={styles.oldPrice}>
              ${product.price}
            </Text>
          </View>

          <Text style={styles.discount}>
            {product.discountPercentage}% OFF
          </Text>

          <Text style={styles.rating}>
            ⭐ {product.rating}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cartButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.cartButtonText}>
          Add to Cart
        </Text>
      </TouchableOpacity>
    </View>
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
    borderColor: "#e8e8e8",
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
    color: "#111",
  },

  category: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
    textTransform: "capitalize",
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 6,
  },

  price: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
  },

  oldPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },

  discount: {
    fontSize: 12,
    color: "green",
    fontWeight: "600",
    marginTop: 4,
  },

  rating: {
    fontSize: 12,
    marginTop: 4,
  },

  cartButton: {
    backgroundColor: "#111",
    margin: 10,
    marginTop: 0,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },

  cartButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});