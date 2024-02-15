import { View } from '@/components/Themed';
import {SafeAreaView, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';


export default function ItemCard(props) {


    return (
        <View style={styles.card}>
            <View style={styles.content}>
                { props.children }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        width: 175,
        height: 230,
        borderRadius: 6,
        elevation: 7,
        backgroundColor: '#fff',
        shadowOffset: {width: 2, height: 2},
        shadowColor: '#333',
        shadowOpacity: 1,
        marginHorizontal: 8,
        marginVertical: 8,

        justifyContent: 'center',
        alignItems: 'center'

        

    },

    content: {        
        textAlign: 'center',
        backgroundColor: '#fff',
        color: '#000',
        justifyContent: 'space-evenly'
    }
})