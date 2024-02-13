import {useState} from 'react';
import { Text, View } from "@/components/Themed";
import { ItemCard } from '@/components/ItemCard';
import {Alert, Pressable, StyleSheet, SafeAreaView} from 'react-native'
import { useRouter } from 'expo-router';


import Colors from '@/constants/Colors';



export default function catalog() {
    const router = useRouter();


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.dark.background}}>
            <ItemCard>

            </ItemCard>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    View: {
        justifyContent: 'center'

    },

    Text: {
        color: "#ffffff"
    }
})