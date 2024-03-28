import { Text, View } from "@/components/Themed";
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
} from "firebase/firestore";

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
  const firestore = getFirestore();

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
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchFavorites(user);
      }
    });
    return () => unsubscribe();
  }, [favorites]);

  const fetchFavorites = async (user: User) => {
    const db = getFirestore(); // Get Firestore reference
    const userRef = doc(db, "users", user.uid);
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setFavorites(userData?.favorites || []);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  // Fetch furniture items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

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
