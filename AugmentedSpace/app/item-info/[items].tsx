import { infoPageStyle } from "@/styles/itemInfoPageStyles";
import { router, useLocalSearchParams } from "expo-router";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProductScreen = () => {

  const firestore = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  //get params from index.tsx
  const { items } = useLocalSearchParams();
  const { imageSource } = useLocalSearchParams();
  const { itemCost } = useLocalSearchParams();
  const { brandName } = useLocalSearchParams();
  const { itemName } = useLocalSearchParams();

  const [imageUrl, setImageUrl] = useState("");

  const addToCart = async () => {
    if (user) {
      try {
        const cartItem = {
          itemName: items,
          brandName: brandName,
          itemCost: itemCost,
          imagePath: imageSource,
          quantity: 1,
        };
        // Adding the item to the user's cart collection
        const cartRef = collection(firestore, `users/${user.uid}/cart`);
        await setDoc(doc(cartRef), cartItem);
        Alert.alert("Success", "Item added to cart");
      } catch (error) {
        console.error("Error adding item to cart: ", error);
        Alert.alert("Error", "There was an error adding the item to the cart");
      }
    } else {
      Alert.alert("Sign In Required", "Please sign in to add items to your cart");
    }
  };
  //log params
  console.log("items: " + items);
  console.log("imageSource: " + imageSource);
  console.log("itemCost: " + itemCost);
  console.log("brandName: " + brandName);
  console.log("itemName: " + itemName);
  console.log("itemQuantity: " + 1);

  useEffect(() => {
    //retrieve image url from firebase
    const getImageUrl = async () => {
      const storage = getStorage();
      const reference = ref(storage, imageSource.toString());
      await getDownloadURL(reference).then((x) => {
        setImageUrl(x);
      })
    }

    getImageUrl();
  }, []);
  
  return (
    <ScrollView style={infoPageStyle.container}>
      {/* Product image */}
      <View style={infoPageStyle.imageContainer}>
        <Image
          source={{uri: imageUrl}}
          style={infoPageStyle.productImage}
          resizeMode="contain"
        />
      </View>
      <View style={infoPageStyle.detailsContainer}>
        <View style={infoPageStyle.firstRow}>
          <Text style={infoPageStyle.productName}>
        {brandName + "'s"+ ' ' + items }
        </Text>
        <TouchableOpacity style={infoPageStyle.addToCartButton} onPress={addToCart} >
            <Text style={infoPageStyle.addToCartButtonText} >Add to Cart</Text>
        </TouchableOpacity>
        </View>
        <Text style={infoPageStyle.productDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
          dolorum quo. Nesciunt vero similique, soluta neque dolorum voluptas at
          sequi facilis fuga. Repellendus quas, dicta dignissimos sed delectus
          reprehenderit modi.
        </Text>
        <View style={infoPageStyle.priceRow}>
          <TouchableOpacity
            style={infoPageStyle.buyButton}
            onPress={() => Alert.alert("Buy button pressed")}
          >
            <Text style={infoPageStyle.buyButtonText}>
              Buy <Text style={infoPageStyle.priceText}>{itemCost}</Text>
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
          style = {infoPageStyle.buyButton}
          onPress={() => Alert.alert("You have added this item to cart")}
          >
            <Text style={infoPageStyle.buyButtonText}>
              Add to cart
            </Text>
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity
          style={infoPageStyle.viewInYourRoomButton}
          onPress={() => Alert.alert("View in Room button pressed")}
        >
          <Text style={infoPageStyle.buyButtonText}>View In Your Room</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;
