import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";

const API_URL =
  "https://dummyjson.com/products";

const LIMIT = 10;

export default function HomeScreen() {
  const router = useRouter();

  // Redux
  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  // Product state
  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [skip, setSkip] =
    useState(0);

  const [hasMore, setHasMore] =
    useState(true);

  // Loading state
  const [loading, setLoading] =
    useState(true);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);

  const [initialLoad, setInitialLoad] =
    useState(true);

  /*
   * Fetch products
   */
  const fetchProducts = async ({
    currentSkip = 0,
    searchText = "",
    append = false,
  }) => {
    try {
      let url;

      if (searchText.trim()) {
        url =
          `${API_URL}/search?q=${encodeURIComponent(
            searchText.trim()
          )}` +
          `&limit=${LIMIT}` +
          `&skip=${currentSkip}`;
      } else {
        url =
          `${API_URL}?limit=${LIMIT}` +
          `&skip=${currentSkip}`;
      }

      const response =
        await fetch(url);

      if (!response.ok) {
        throw new Error(
          "Failed to fetch products"
        );
      }

      const data =
        await response.json();

      if (append) {
        setProducts(
          (previous) => [
            ...previous,
            ...data.products,
          ]
        );
      } else {
        setProducts(
          data.products
        );
      }

      const newSkip =
        currentSkip +
        data.products.length;

      setSkip(newSkip);

      setHasMore(
        newSkip < data.total
      );
    } catch (error) {
      console.log(
        "Product API Error:",
        error
      );
    }
  };

  /*
   * Initial load
   */
  useEffect(() => {
    const loadInitial =
      async () => {
        setLoading(true);

        await fetchProducts({
          currentSkip: 0,
          searchText: "",
          append: false,
        });

        setLoading(false);
        setInitialLoad(false);
      };

    loadInitial();
  }, []);

  /*
   * Debounced search
   *
   * Wait 500ms after typing stops.
   */
  useEffect(() => {
    if (initialLoad) {
      return;
    }

    const timer =
      setTimeout(async () => {
        setLoading(true);
        setSkip(0);
        setHasMore(true);

        await fetchProducts({
          currentSkip: 0,
          searchText: search,
          append: false,
        });

        setLoading(false);
      }, 500);

    return () =>
      clearTimeout(timer);
  }, [search, initialLoad]);

  /*
   * Infinite scroll
   */
  const loadMoreProducts =
    async () => {
      if (
        loading ||
        loadingMore ||
        !hasMore
      ) {
        return;
      }

      setLoadingMore(true);

      await fetchProducts({
        currentSkip: skip,
        searchText: search,
        append: true,
      });

      setLoadingMore(false);
    };

  /*
   * Pull to refresh
   */
  const onRefresh =
    useCallback(async () => {
      setRefreshing(true);

      setSkip(0);
      setHasMore(true);

      await fetchProducts({
        currentSkip: 0,
        searchText: search,
        append: false,
      });

      setRefreshing(false);
    }, [search]);

  /*
   * Initial loading
   */
  if (
    loading &&
    products.length === 0
  ) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
        />

        <Text style={styles.loadingText}>
          Loading products...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Welcome 👋
          </Text>

          <Text style={styles.title}>
            Discover Products
          </Text>
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() =>
            // console.log('Button was pressed!')
            router.push("cart")

          }
        >
          <Text style={styles.cartIcon}>
            🛒
          </Text>

          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {cartCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search */}

      <SearchBar
        value={search}
        onChangeText={setSearch}
      />

      {/* Results */}

      <Text style={styles.resultText}>
        {search
          ? `Results for "${search}"`
          : `${products.length} Products`}
      </Text>

      {/* Product List */}

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
          />
        )}
        keyExtractor={(item) =>
          item.id.toString()
        }
        numColumns={2}
        columnWrapperStyle={
          styles.row
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.list
        }
        onEndReached={
          loadMoreProducts
        }
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footer}>
              <ActivityIndicator />
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>
              No products found
            </Text>
          </View>
        }
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
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  greeting: {
    fontSize: 14,
    color: "#777",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 4,
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

  badge: {
    position: "absolute",
    right: -4,
    top: -4,
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

  resultText: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 15,
  },

  row: {
    justifyContent:
      "space-between",
  },

  list: {
    paddingBottom: 30,
  },

  footer: {
    paddingVertical: 20,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
  },

  empty: {
    alignItems: "center",
    marginTop: 50,
  },
});