import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Alert, Pressable, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import CartCard from '@/components/CartCard';
import { router } from 'expo-router';

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
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(collection(firestore, `users/${user.uid}/cart`), (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          itemName: doc.data().itemName,
          brandName: doc.data().brandName,
          itemCost: doc.data().itemCost,
          imagePath: doc.data().imagePath,
        })) as CartItemType[];
        setCartItems(items);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const [totalPrice, setTotalPrice] = useState(0);

useEffect(() => {
  if (Array.isArray(cartItems) && cartItems.length > 0) {
    const total = cartItems.reduce((acc, item) => acc + Number(item.itemCost || 0), 0);
    setTotalPrice(total);
  } else {
    setTotalPrice(0); // Reset to 0 if cartItems is empty or not an array
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
      className="flex flex-1 h-full w-full p-2"
        contentContainerStyle={{
          gap:10,
          justifyContent: "space-around",
        }}
        data={cartItems}
        numColumns={1}
        renderItem={({ item }) => (
          <CartCard
            itemName={item.itemName}
            brandName={item.brandName}
            itemCost={item.itemCost}
            imagePath={item.imagePath}
            onRemove={() => handleRemoveItemFromCart(item.id)}
            /**onPress={() =>
              router.push({
                pathname: "/item-info/[items]" ,
                params: {
                  items: item.itemName,
                  imageSource: item.imagePath,
                  itemCost: item.itemCost,
                  brandName: item.brandName
                },
              })
            }**/
          />
          )}
        keyExtractor={(item) => item.id}
        style={{ padding: 10,}}
      />
      <Pressable style={{
        backgroundColor: colors.primary,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: "center",
        marginBottom: 5,
        marginHorizontal: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: colors.shadow,
        shadowOpacity: 1,}}
        onPress={() => Alert.alert("NA")}
        >
        <Text style={{
          color: colors.text,
          fontSize: 20,
          fontWeight: "bold",}}>
          Checkout
        </Text>
        <Text style={{
          fontSize: 15,
          fontWeight: "bold",
          color: colors.text,
        }}>
        Total: ${totalPrice.toFixed(2)}
        </Text>
      </Pressable>

    </View>
  );
};

export default CartScreen;