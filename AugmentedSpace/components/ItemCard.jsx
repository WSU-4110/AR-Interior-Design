import { View } from '@/components/Themed';
import {SafeAreaView, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import { CardStyle } from '@/styles/ItemCardStyle';


export default function ItemCard(props) {


    return (
        <View style={CardStyle.card}>
            <View style={CardStyle.content}>
                { props.children }
            </View>
        </View>
    )
}