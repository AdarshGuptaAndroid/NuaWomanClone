import React from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useDispatch } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";

export default function CartItem({
  item,
}) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: item.thumbnail,
        }}
        style={styles.image}
      />

      <View style={styles.details}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <Text style={styles.price}>
          $
          {item.discountedPrice.toFixed(
            2
          )}
        </Text>

        <View
          style={
            styles.quantityContainer
          }
        >
          <TouchableOpacity
            style={
              styles.quantityButton
            }
            onPress={() =>
              dispatch(
                decreaseQuantity(
                  item.id
                )
              )
            }
          >
            <Text>-</Text>
          </TouchableOpacity>

          <Text
            style={styles.quantity}
          >
            {item.quantity}
          </Text>

          <TouchableOpacity
            style={
              styles.quantityButton
            }
            onPress={() =>
              dispatch(
                increaseQuantity(
                  item.id
                )
              )
            }
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() =>
            dispatch(
              removeFromCart(
                item.id
              )
            )
          }
        >
          <Text style={styles.remove}>
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
  },

  price: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 6,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  quantityButton: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  quantity: {
    marginHorizontal: 12,
    fontWeight: "600",
  },

  remove: {
    color: "red",
    marginTop: 8,
    fontSize: 12,
  },
});