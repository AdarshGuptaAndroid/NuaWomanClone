
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  clearCart,
} from "./redux/cartSlice";

import CartItem from "./components/CartItem";

export default function CartScreen() {
  const dispatch = useDispatch();

  const cart = useSelector(
    (state) => state.cart.items
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      item.discountedPrice *
        item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>
          🛒
        </Text>

        <Text
          style={styles.emptyTitle}
        >
          Your cart is empty
        </Text>

        <Text
          style={styles.emptyText}
        >
          Add some products to your
          cart.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <CartItem
            item={item}
          />
        )}
        showsVerticalScrollIndicator={
          false
        }
      />

      <View style={styles.bottom}>
        <View style={styles.totalRow}>
          <Text
            style={styles.totalLabel}
          >
            Total
          </Text>

          <Text style={styles.total}>
            ${cartTotal.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkout}
          onPress={() =>
            console.log(
              "Checkout pressed"
            )
          }
        >
          <Text
            style={
              styles.checkoutText
            }
          >
            Proceed to Checkout
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clear}
          onPress={() =>
            dispatch(clearCart())
          }
        >
          <Text
            style={styles.clearText}
          >
            Clear Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  bottom: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    marginBottom: 15,
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
  },

  total: {
    fontSize: 22,
    fontWeight: "700",
  },

  checkout: {
    backgroundColor: "#111",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  clear: {
    alignItems: "center",
    marginTop: 12,
  },

  clearText: {
    color: "red",
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIcon: {
    fontSize: 50,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 15,
  },

  emptyText: {
    color: "#777",
    marginTop: 8,
  },
});