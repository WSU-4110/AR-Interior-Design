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
            <FlatList contentContainerStyle={{flexDirection:"row", flexWrap: "wrap", justifyContent: 'center'}} 
                data={loop} 
                renderItem={({item}) => 
                    <TouchableOpacity onPress={() => Alert.alert(`card ${item} touched`)}>
                        <ItemCard>
                            <Image source={require("@/assets/images/favicon.png")} style={{marginVertical: 32}}/> 
                            <Text style={{fontSize: 24}}>Item Num {item}</Text>
                            <Text style={{fontSize: 12, fontWeight: 'bold', fontStyle: 'italic', color: '#888888'}}>Brand Name</Text>
                            <Text style={{fontWeight: "bold", color: '#2211ff'}}>$24.99</Text>
                        </ItemCard>
                    </TouchableOpacity>
                }>
            </FlatList>
        </SafeAreaView>
    );
}

