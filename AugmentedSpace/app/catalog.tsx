import { Text, View } from "@/components/Themed";
import  ItemCard  from '@/components/ItemCard';
import {SafeAreaView, Alert, TouchableOpacity, StyleSheet, ScrollView, FlatList, Image} from 'react-native'
import { useRouter } from 'expo-router';


import Colors from '@/constants/Colors';



export default function catalog() {
    const router = useRouter();

    const ItemPlaceholder = "Item Num";
    const BrandPlaceholder = "Brand Name";
    const PricePlaceholder = "$24.99";

    var loop =[];
    for (let i = 0; i < 100; i++) {
        loop.push(i)
    }


    return (
        <SafeAreaView className="flex-row flex-wrap items-center">
            <FlatList contentContainerStyle={{flexDirection:"row", flexWrap: "wrap", justifyContent: 'center'}} 
                data={loop} 
                renderItem={({item}) => 
                    <TouchableOpacity onPress={() => Alert.alert(`card ${item} touched`)}>
                        <ItemCard>
                            <Image source={require("@/assets/images/favicon.png")} 
                                style={{ borderWidth: 2, borderColor: '#000', paddingHorizontal: 72, paddingVertical: 64, borderRadius: 6}}/> 
                            <Text style={{fontSize: 24}}>{ItemPlaceholder} {item}</Text>
                            <Text style={{fontSize: 12, fontWeight: 'bold', fontStyle: 'italic', color: '#888888'}}>
                                {BrandPlaceholder}
                            </Text>
                            <Text style={{fontWeight: "bold", color: '#2211ff'}}>{PricePlaceholder}</Text>
                        </ItemCard>
                    </TouchableOpacity>
                }>
            </FlatList>
        </SafeAreaView>
    );
}

