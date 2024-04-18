import React, { useState, useEffect } from "react";
import { Text, View } from "@/components/Themed";
import { FlatList, TextInput, ActivityIndicator } from "react-native";
import { useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import { getAuth } from "firebase/auth";
import { useTheme } from "@react-navigation/native";
import ItemCard from "@/components/ItemCard";
import { getFirestore, collection, getDocs, query } from "firebase/firestore";

interface Item {
  UUID: string;
  itemName: string;
  brandName: string;
  imagePath: string;
  price: number;
}

export default function CatalogScreen() {
  const { colors } = useTheme();
  const { currentUser } = getAuth();
  const [products, setProducts] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const firestore = getFirestore();

  // Fetch items from firestore
  const fetchItems = async () => {
    const q = query(collection(firestore, "FURNITUREITEMS"));
    const querySnapshot = await getDocs(q);
    const itemsList: Item[] = [];
    querySnapshot.forEach((doc) => {
      itemsList.push({
        UUID: doc.id,
        itemName: doc.data().name,
        brandName: doc.data().brand,
        imagePath: doc.data().image,
        price: doc.data().price,
      });
    });
    setProducts(itemsList);
    setLoading(false);
  };

  // Fetch furniture items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchItems();
    }, [])
  );

  // Filtered products based on search query
  const filteredProducts = products.filter(
    (item) =>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.price.toString().includes(searchQuery.toLowerCase())
  );

  // Function to handle changes in the search bar text
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View
      className="flex-1 items-center justify-center my-4"
      style={{ backgroundColor: colors.background }}
    >
      <TextInput
        className="flex w-full h-10 bg-slate-300 rounded-xl align-middle content-center p-2 justify-center m-1"
        style={{
          color: colors.text,
          backgroundColor: colors.card,
          shadowOffset: { width: 2, height: 2 },
          shadowColor: colors.shadow,
          shadowOpacity: 1,
        }}
        placeholder="Search for items"
        onChangeText={handleSearch} // Call handleSearch when text changes
        value={searchQuery} // Value of the search bar
      />

      <FlatList
        className="flex flex-1 h-full w-full pt-1 pr-0.5"
        contentContainerStyle={{
          gap: 20,
          justifyContent: "space-around",
        }}
        data={filteredProducts} // Use filtered products
        numColumns={2}
        renderItem={({ item }) => (
          <ItemCard
            onPress={() =>
              router.push({
                pathname: "/item-info/[items]",
                params: {
                  items: item.itemName,
                  imageSource: item.imagePath,
                  itemCost: item.price,
                  brandName: item.brandName,
                },
              })
            }
            UUID={item.UUID}
            itemName={item.itemName}
            brandName={item.brandName}
            imagePath={item.imagePath}
            itemCost={item.price}
          />
        )}
      ></FlatList>
    </View>
  );
}
