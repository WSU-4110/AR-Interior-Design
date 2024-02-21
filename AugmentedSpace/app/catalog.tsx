import { Text } from "@/components/Themed";
import  ItemCard  from '@/components/ItemCard';
import {SafeAreaView, Alert, TouchableOpacity, StyleSheet, ScrollView, FlatList, Image} from 'react-native'
import { useRouter } from 'expo-router';


import {CardStyle} from '@/styles/ItemCardStyle'



export default function catalog() {
    const router = useRouter();

    const ItemPlaceholder = "Item Num";
    const BrandPlaceholder = "Brand Name";
    const PricePlaceholder = "$24.99";

    var loop =[];
    for (let i = 0; i < 50; i++) {
        loop.push(i)
    }


    return (
        <SafeAreaView className="flex-row flex-wrap items-center">
            <FlatList contentContainerStyle={CardStyle.listContainer} 
                data={loop} 
                renderItem={({item}) => 
                    <TouchableOpacity onPress={() => router.push('/item-info')}>
                        <ItemCard>
                            <Image source={require("@/assets/images/favicon.png")} 
                                style={CardStyle.image}/> 
                            <Text style={CardStyle.itemText}>{ItemPlaceholder} {item}</Text>
                            <Text style={CardStyle.brandText}>
                                {BrandPlaceholder}
                            </Text>
                            <Text style={CardStyle.priceText}>{PricePlaceholder}</Text>
                        </ItemCard>
                    </TouchableOpacity>
                }>
            </FlatList>
        </SafeAreaView>
    );
}

