import { Text, View } from "@/components/Themed";
import  ItemCard  from '@/components/ItemCard';
import {SafeAreaView, Alert, TouchableOpacity, StyleSheet, ScrollView, FlatList, Image} from 'react-native'
import { useRouter } from 'expo-router';


import Colors from '@/constants/Colors';



export default function catalog() {
    const router = useRouter();

    var loop =[];
    for (let i = 0; i < 100; i++) {
        loop.push(i)
    }


    return (
        <SafeAreaView className="flex-row flex-wrap items-center">
            <FlatList contentContainerStyle={{flexDirection:"row", flexWrap: "wrap"}} data={loop} 
                renderItem={({item}) => 
                    <TouchableOpacity onPress={() => Alert.alert(`card ${item} touched`)}>
                        <ItemCard>
                            <Image source={require("@/assets/images/favicon.png")} />
                            <Text>Card Num {item}</Text>
                            <Text>Price</Text>
                        </ItemCard>
                    </TouchableOpacity>
                }>
            </FlatList>
        </SafeAreaView>
    );
}

