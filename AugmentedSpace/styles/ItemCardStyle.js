
import { Dimensions, StyleSheet } from "react-native"
import Colors from '@/constants/Colors'

export const CardStyle = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width / 3.5,
        height: Dimensions.get('window').width / 3.5 * 1.5,
        flex: 1,
        borderRadius: 6,
        elevation: 7,
        backgroundColor: '#fff',
        shadowOffset: {width: 2, height: 2},
        shadowColor: '#333',
        shadowOpacity: 1,
        marginHorizontal: 8,
        marginVertical: 8,
        padding: 8,


        justifyContent: 'center',
        alignItems: 'center'

    },

    content: {
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.background,
        color: Colors.light.text,
        justifyContent: 'space-evenly',
        padding: 6
    },

    itemText: {
        fontSize: 24
    },

    priceText: {
        fontWeight: "bold",
        color: '#2211ff'
    },

    brandText: {
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#888888'
    },

    image: {
        flex:1,
        //placeholder image size values: creates 3 rows iphone 15 pro max
        height: Dimensions.get('window').width / 4.25,
        width: Dimensions.get('window').width / 4.25,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 6
    },

    listContainer: {
        flexDirection:"row",
        justifyContent: 'center',
        flexWrap: 'wrap'
    }

}) 