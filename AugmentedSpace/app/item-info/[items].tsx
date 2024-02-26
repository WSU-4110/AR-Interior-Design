import React from 'react';
import { Alert, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { infoPageStyle } from '@/styles/itemInfoPageStyles';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
const ProductScreen = () => {
    const {items} = useLocalSearchParams();
return (
    <ScrollView style={infoPageStyle.container}>
      {/* Product image */}
        <View style={infoPageStyle.imageContainer}>
            <Image
                source={require("@/assets/images/favicon.png")}
                style={infoPageStyle.productImage}
                resizeMode="contain"
            />
            <TouchableOpacity style={infoPageStyle.view360Button}>
                <Text>360°</Text>
            </TouchableOpacity>
        </View>
        <View style={infoPageStyle.detailsContainer}>
            <Text style={infoPageStyle.productName}>Product name {items}</Text>
            <Text style={infoPageStyle.productDescription}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, dolorum quo. Nesciunt vero similique, soluta neque dolorum voluptas at sequi facilis fuga. Repellendus quas, dicta dignissimos sed delectus reprehenderit modi.
            </Text>
            <View style={infoPageStyle.priceRow}>
                <TouchableOpacity style={infoPageStyle.buyButton} onPress={() => Alert.alert("Buy button pressed")}>
                    <Text style={infoPageStyle.buyButtonText}>Buy</Text>
                </TouchableOpacity>
            <Text style={infoPageStyle.priceText}>$99.99</Text>
            </View>
                <TouchableOpacity style={infoPageStyle.viewInYourRoomButton} onPress={() => Alert.alert("View in Room button pressed")}>
                    <Text style={infoPageStyle.buyButtonText}>View In Your Room</Text>
                </TouchableOpacity>
        </View>
    </ScrollView>
);
};


export default ProductScreen;
