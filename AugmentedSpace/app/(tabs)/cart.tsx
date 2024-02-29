import { Text, View } from "@/components/Themed";
import { useTheme } from "@react-navigation/native";

export default function Cart() {
  const { colors } = useTheme();

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.background }}
    >
      <Text className="font-bold text-xl">This Is Your Cart</Text>
      <View
        className="my-8 h-1 w-4/5"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

// import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// export interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
// }

// type CartState = CartItem[];

// type CartAction =
//   | { type: 'ADD_ITEM'; payload: CartItem }
//   | { type: 'REMOVE_ITEM'; payload: { id: number } }
//   | { type: 'CLEAR_CART' };

// interface CartContextType {
//   cart: CartState;
//   dispatch: React.Dispatch<CartAction>;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// const cartReducer = (state: CartState, action: CartAction): CartState => {
//   switch (action.type) {
//     case 'ADD_ITEM':
//       return [...state, action.payload];
//     case 'REMOVE_ITEM':
//       return state.filter(item => item.id !== action.payload.id);
//     case 'CLEAR_CART':
//       return [];
//     default:
//       return state;
//   }
// };

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, dispatch] = useReducer(cartReducer, []);

//   return (
//     <CartContext.Provider value={{ cart, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// };’
// cart.tsx ‘import React from 'react';
// import { TouchableOpacity, FlatList, Alert, StyleSheet, View, Text } from 'react-native';
// import { FontAwesome } from '@expo/vector-icons';
// import { useCart, CartItem } from './CartContext';

// export default function Cart() {
//   const { cart, dispatch } = useCart();

//   const handleRemoveItem = (id: number) => {
//     dispatch({ type: 'REMOVE_ITEM', payload: { id } });
//   };

//   const handleCheckout = () => {
//     Alert.alert('Checkout', 'Proceed to checkout', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'OK', onPress: () => console.log('Checkout Process') },
//     ]);
//   };

//   const calculateTotal = (): string => {
//     return cart.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0).toFixed(2);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>This Is Your Cart</Text>
//       <FlatList
//         data={cart}
//         renderItem={({ item }) => (
//           <View style={styles.itemContainer}>
//             <Text style={styles.itemText}>{item.name} - ${item.price} x {item.quantity}</Text>
//             <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
//               <FontAwesome name="remove" size={24} color="red" />
//             </TouchableOpacity>
//           </View>
//         )}
//         keyExtractor={(item) => item.id.toString()}
//       />
//       <Text style={styles.total}>Total: ${calculateTotal()}</Text>
//       <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
//         <Text style={styles.checkoutButtonText}>Checkout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
