import { useTheme } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Pressable, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { ShowPopup } from "./popup";
import { router } from "expo-router";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

type FavButtonProps = {
  onPress?: () => void;
  className?: string;
  itemUUID: string;
  //testID?: string
};

export default function FavButton(props: FavButtonProps) {
  const { colors } = useTheme();
  const [liked, setLiked] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        fetchFavorites(user);
        setLiked(favorites.includes(props.itemUUID));
      }
    });
    return () => unsubscribe();
  }, [favorites, props.itemUUID]);

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

  const updateFavoritesInFirestore = async (newFavorites: string[]) => {
    if (!currentUser) return;
    const db = getFirestore();
    console.log("Trying to update " + currentUser.uid + "'s favorites");
    const userRef = doc(db, "users", currentUser.uid);
    try {
      await updateDoc(userRef, { favorites: newFavorites });
      console.log("Updated favorites in Firestore");
    } catch (error) {
      console.error("Error updating favorites in Firestore:", error);
    }
  };

  function handleFavoriteItem() {
    if (!currentUser) {
      ShowPopup("Please log in to favorite items");
      router.push("/logIn");
    } else {
      // Update liked state with functional form of setLiked
      setLiked((prevLiked) => !prevLiked);

      let updatedFavorites: string[];
      if (!liked) {
        updatedFavorites = [...favorites, props.itemUUID]; // Add itemUUID
      } else {
        updatedFavorites = favorites.filter((fav) => fav !== props.itemUUID); // Remove itemUUID
      }
      updateFavoritesInFirestore(updatedFavorites);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 999, // Large value for rounded shape
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        backgroundColor: colors.card,
        position: "absolute",
        shadowOffset: { width: 0, height: 2 },
        shadowColor: colors.shadow,
        shadowOpacity: 1,
      }}
    >
      <Pressable onPress={handleFavoriteItem}
        testID="fav-button">
        <MaterialCommunityIcons
          name={liked ? "heart" : "heart-outline"}
          size={30}
          color={liked ? "red" : "gray"}
        />
      </Pressable>
    </View>
  );
}
