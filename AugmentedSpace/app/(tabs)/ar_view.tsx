import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface FurnitureStore {
  id: string;
  city: string;
}

export default function AR_View() {
  const { colors } = useTheme();
  const [furnitureStores, setFurnitureStores] = useState<FurnitureStore[]>([]);
  const { currentUser } = getAuth();
  const firestore = getFirestore();

  // Function to fetch furniture stores from Firestore
  const fetchFurnitureStores = async () => {
    const q = query(collection(firestore, "FURNITURE_STORES"));
    const querySnapshot = await getDocs(q);
    const stores: FurnitureStore[] = [];
    querySnapshot.forEach((doc) => {
      stores.push({
        id: doc.id,
        city: doc.data().CITY,
      });
    });
    setFurnitureStores(stores);
  };

  // Fetch furniture stores on component mount
  useEffect(() => {
    fetchFurnitureStores();
  }, []);

  // Function to handle navigation to store
  const navigateToStore = () => {
    // Add your navigation logic here
    console.log("Navigating to store...");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={furnitureStores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <View style={styles.rowContainer}>
              <Text style={styles.idText}>{item.id}</Text>
              <Text style={styles.cityText}>{item.city}</Text>
            </View>
            <TouchableOpacity onPress={navigateToStore} style={styles.button}>
              <Text style={styles.buttonText}>Go to Store</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Light gray background
    padding: 10,
  },
  item: {
    backgroundColor: "white", // White card background
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2, // Add shadow for a modern look
  },
  rowContainer: {
    flexDirection: "column",
    flex: 1,
  },
  cityText: {
    color: "#888", // Gray text color
    fontSize: 14,
  },
  idText: {
    color: "black", // Black text color
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007BFF", // Blue button background
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "white", // White button text color
    fontSize: 14,
    fontWeight: "bold",
  },
});
