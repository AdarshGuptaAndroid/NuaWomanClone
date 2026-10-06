import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

// import SearchBar from "../components/SearchBar";
// import ProductCard from "../components/ProductCard";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";
const API_URL = "https://dummyjson.com/products";

export default function Home() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      setProducts(data.products);
    } catch (error) {
      console.log("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderProduct = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => console.log("Product:", item.id)}
    />
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome 👋</Text>
          <Text style={styles.title}>Discover Products</Text>
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push("cart") }
        >
          <Text style={styles.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <SearchBar
        value={search}
        onChangeText={setSearch}
      />

      {/* Product count */}
      <Text style={styles.resultText}>
        {filteredProducts.length} Products
      </Text>

      {/* Products */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  greeting: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
  },

  cartButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },

  cartIcon: {
    fontSize: 22,
  },

  resultText: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 15,
  },

  row: {
    justifyContent: "space-between",
  },

  list: {
    paddingBottom: 30,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});