import {
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useLocalSearchParams,
} from "expo-router";

import { useRouter } from "expo-router";


import { useDispatch } from "react-redux";

import { addToCart } from "../redux/cartSlice";

const { width } =
  Dimensions.get("window");

export default function ProductDetails() {

  const router = useRouter();
  const { id } =
    useLocalSearchParams();

  const dispatch = useDispatch();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct =
    async () => {
      try {
        const response =
          await fetch(
            `https://dummyjson.com/products/${id}`
          );

        const data =
          await response.json();

        setProduct(data);
      } catch (error) {
        console.log(
          "Product detail error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loader}>
        <Text>
          Product not found
        </Text>
      </View>
    );
  }

  /*
   * Discount calculation
   */
  const discountedPrice =
    product.price -
    (product.price *
      product.discountPercentage) /
    100;

  const images =
    product.images?.length
      ? product.images
      : [product.thumbnail];

  const handleAddToCart =
    () => {
      dispatch(
        addToCart({
          ...product,

          discountedPrice:
            Number(
              discountedPrice.toFixed(
                2
              )
            ),
        })
      );
    };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* Image Carousel */}

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={
          false
        }
      >
        {images.map(
          (image, index) => (
            <Image
              key={`${image}-${index}`}
              source={{
                uri: image,
              }}
              style={styles.image}
              resizeMode="contain"
            />
          )
        )}
      </ScrollView>

      {/* Product Details */}

      <View style={styles.content}>
        <Text style={styles.category}>
          {product.category}
        </Text>

        <Text style={styles.title}>
          {product.title}
        </Text>

        <View
          style={
            styles.ratingRow
          }
        >
          <Text style={styles.rating}>
            ⭐ {product.rating}
          </Text>

          <Text style={styles.stock}>
            {product.stock} available
          </Text>
        </View>

        {/* Price */}

        <View
          style={
            styles.priceContainer
          }
        >
          <Text
            style={
              styles.discountedPrice
            }
          >
            $
            {discountedPrice.toFixed(
              2
            )}
          </Text>

          <Text
            style={
              styles.originalPrice
            }
          >
            ${product.price}
          </Text>

          <Text
            style={styles.discount}
          >
            {product.discountPercentage}%
            OFF
          </Text>
        </View>

        {/* Description */}

        <Text
          style={styles.sectionTitle}
        >
          Description
        </Text>

        <Text
          style={styles.description}
        >
          {product.description}
        </Text>

        {/* Product Information */}

        <Text
          style={styles.sectionTitle}
        >
          Product Information
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>
            Brand
          </Text>

          <Text style={styles.value}>
            {product.brand ||
              "N/A"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>
            Category
          </Text>

          <Text style={styles.value}>
            {product.category}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>
            SKU
          </Text>

          <Text style={styles.value}>
            {product.sku ||
              "N/A"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>
            Warranty
          </Text>

          <Text style={styles.value}>
            {product.warrantyInformation ||
              "N/A"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>
            Shipping
          </Text>

          <Text style={styles.value}>
            {product.shippingInformation ||
              "N/A"}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.returnPolicyButton}
          onPress={() => router.push("/returnPolicy")}
        >
          <Text style={styles.returnPolicyText}>
            View Return Policy
          </Text>
        </TouchableOpacity>

        {/* Add to Cart */}

        <TouchableOpacity
          style={styles.addButton}
          onPress={
            handleAddToCart
          }
        >
          <Text
            style={
              styles.addButtonText
            }
          >
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  image: {
    width,
    height: 350,
    backgroundColor: "#f7f7f7",
  },

  content: {
    padding: 20,
  },

  category: {
    fontSize: 14,
    color: "#888",
    textTransform: "capitalize",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 8,
  },

  ratingRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    marginTop: 12,
  },

  rating: {
    fontSize: 15,
  },

  stock: {
    color: "green",
    fontWeight: "600",
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },

  discountedPrice: {
    fontSize: 28,
    fontWeight: "700",
  },

  originalPrice: {
    fontSize: 16,
    color: "#999",
    textDecorationLine:
      "line-through",
  },

  discount: {
    fontSize: 13,
    color: "green",
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 25,
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    color: "#555",
    lineHeight: 23,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  label: {
    color: "#777",
  },

  value: {
    fontWeight: "600",
    maxWidth: "60%",
    textAlign: "right",
  },

  addButton: {
    backgroundColor: "#111",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },

  addButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  returnPolicyButton: {
    marginTop: 20,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#111",
    borderRadius: 8,
    alignItems: "center",
  },

  returnPolicyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
});