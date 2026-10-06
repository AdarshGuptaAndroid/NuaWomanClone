import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, AppState, View } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";

import { setCart } from "./redux/cartSlice";
import { store } from "./redux/store";
import {
  logAppBackgrounded,
} from "./utils/analytics";

const CART_KEY = "@ecommerce_cart";

function AppContent() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);

  const [hydrated, setHydrated] = useState(false);
  const appState = useRef(
    AppState.currentState
  );

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem(CART_KEY);

        if (storedCart) {
          dispatch(setCart(JSON.parse(storedCart)));
        }
      } catch (error) {
        console.log("Failed to load cart:", error);
      } finally {
        setHydrated(true);
      }
    };

    loadCart();
  }, [dispatch]);

  useEffect(() => {
    if (!hydrated) return;

    AsyncStorage.setItem(
      CART_KEY,
      JSON.stringify(cart)
    ).catch((error) => {
      console.log("Failed to save cart:", error);
    });
  }, [cart, hydrated]);

  useEffect(() => {
    const subscription =
      AppState.addEventListener(
        "change",
        (nextAppState) => {

          if (
            appState.current === "active" &&
            nextAppState === "background"
          ) {
            logAppBackgrounded();
          }

          appState.current =
            nextAppState;
        }
      );


    return () => {
      subscription.remove();
    };
  }, []);

  if (!hydrated) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
     <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="cart" options={{ title: "My Cart" }} />
      <Stack.Screen name="products" options={{ title: "Product Details" }} />
      <Stack.Screen name="returnPolicy" options={{ title: "Return Policy"}} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}