import React, { useEffect, useState } from 'react';
import { FlatList, Alert, Pressable, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import CartCard from '@/components/CartCard';
import { View, Text } from "@/components/Themed";

const screenWidth = Dimensions.get('window').width;  // Get the width of the screen

type CartItemType = {
  id: string;
  itemName: string;
  brandName: string;
  itemCost: number;
  imagePath: string;
  quantity: number;
};

const CartScreen = () => {
  const { colors } = useTheme();
  const firestore = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(collection(firestore, `users/${user.uid}/cart`), (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          itemName: doc.data().itemName,
          brandName: doc.data().brandName,
          itemCost: doc.data().itemCost,
          imagePath: doc.data().imagePath,
          quantity: doc.data().quantity,
        })) as CartItemType[];
        setCartItems(items);
      });
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce((acc, item) => acc + Number(item.itemCost || 0), 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cartItems]);

  const handleRemoveItemFromCart = async (itemId: string) => {
    if (user) {
      await deleteDoc(doc(firestore, `users/${user.uid}/cart`, itemId));
      Alert.alert('Item removed from cart');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={cartItems}
        numColumns={2}
        renderItem={({ item }) => (
          <CartCard
            itemName={item.itemName}
            brandName={item.brandName}
            itemCost={item.itemCost}
            imagePath={item.imagePath}
            onRemove={() => handleRemoveItemFromCart(item.id)}
            width={screenWidth / 2 - 10}  // Adjust width here
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 5,
          paddingBottom: 5
        }}
      />
      <Pressable
        style={{
          backgroundColor: colors.primary,
          paddingVertical: 20,
          paddingHorizontal: 20,
          borderRadius: 20,
          alignItems: "center",
          marginBottom: 5,
          marginHorizontal: 5,
          shadowOffset: { width: 2, height: 2 },
          shadowColor: colors.shadow,
          shadowOpacity: 1,
        }}
        onPress={() => Alert.alert("Checkout feature not implemented")}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: colors.text }}>
          Checkout
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold", color: colors.text }}>
          Total: ${totalPrice.toFixed(2)}
        </Text>
      </Pressable>
    </View>
  );
};

export default CartScreen;
