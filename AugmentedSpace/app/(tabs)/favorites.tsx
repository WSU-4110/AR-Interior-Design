import { Text, View, ActivityIndicator } from "react-native";
import { FlatList, TextInput } from "react-native";
import { router } from "expo-router";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useTheme } from "@react-navigation/native";
import ItemCard from "@/components/ItemCard";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

interface Item {
  UUID: string;
  itemName: string;
  brandName: string;
  imagePath: string;
  price: number;
}

export default function Favorites() {
  const { colors } = useTheme();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Item[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const firestore = getFirestore();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchItems();
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        if (user) {
          fetchFavorites(user);
        }
      });
      return () => unsubscribe();
    }, [])
  );

  // Function to fetch items from firestore
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

  useEffect(() => {
    fetchItems();
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchFavorites(user);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchFavorites = async (user: User) => {
    const db = getFirestore();
    const userRef = doc(db, "users", user.uid);
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setFavorites(userData?.favorites || []);

        // Subscribe to changes in favorites
        const unsubscribeFavorites = onSnapshot(userRef, (docSnapshot) => {
          const updatedUserData = docSnapshot.data();
          setFavorites(updatedUserData?.favorites || []);
        });

        // Clean up the subscription
        return () => unsubscribeFavorites();
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      const db = getFirestore();
      const userRef = doc(db, "users", currentUser.uid);

      // Subscribe to changes in favorites
      const unsubscribeFavorites = onSnapshot(userRef, (docSnapshot) => {
        const userData = docSnapshot.data();
        setFavorites(userData?.favorites || []);
      });

      // Clean up the subscription
      return () => unsubscribeFavorites();
    }
  }, [currentUser]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid);
        const unsubscribeFavorites = onSnapshot(userRef, (docSnapshot) => {
          const userData = docSnapshot.data();
          setFavorites(userData?.favorites || []);
        });
        return () => unsubscribeFavorites();
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
        backgroundColor: colors.background,
      }}
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
      ></TextInput>

      <Text className="font-bold text-xl mt-4" style={{ color: colors.text }}>
        Your Favorites
      </Text>
      <View
        className="my-2 h-1 w-4/5"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <FlatList
        style={{ flex: 1, width: "100%", padding: 5 }}
        contentContainerStyle={{ justifyContent: "space-around" }}
        data={products.filter((item) => favorites.includes(item.UUID))}
        keyExtractor={(item) => item.UUID}
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
      />
    </View>
  );
}
