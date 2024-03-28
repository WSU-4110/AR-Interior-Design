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

interface item {
  UUID: string;
  itemName: string;
  brandName: string;
  imagePath: string;
  price: number;
}

export default function Favorites() {
  const { colors } = useTheme();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<item[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const firestore = getFirestore();

  //function to fetch items from firestore
  const fetchItems = async () => {
    const q = query(collection(firestore, "FURNITUREITEMS"));
    const querySnapshot = await getDocs(q);
    const itemsList: item[] = [];
    querySnapshot.forEach((doc) => {
      itemsList.push({
        UUID: doc.id,
        itemName: doc.data().name,
        brandName: doc.data().brand,
        imagePath: doc.data().image,
        price: doc.data().price,
      });

      console.log("document data pushed to itemsList for id: " + doc.id);
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

  //fetch furniture items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

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
      >
        <Text style={{ color: colors.text }}>Test Input</Text>
      </TextInput>

      <Text className="font-bold text-xl mt-2" style={{ color: colors.text }}>
        Your Favorites
      </Text>
      <View
        className="mb-4 mt-2 h-1 w-4/5"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <FlatList
        className="flex flex-1 h-full w-full pt-1 pr-0.5"
        contentContainerStyle={{
          gap: 20,
          justifyContent: "space-around",
        }}
        data={products}
        numColumns={1}
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
