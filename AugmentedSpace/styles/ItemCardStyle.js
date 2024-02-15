
import { StyleSheet } from "react-native"
import Colors from '@/constants/Colors'

export const CardStyle = StyleSheet.create({
    card: {
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
        borderWidth: 2,
        borderColor: '#000',
        paddingHorizontal: 72,
        paddingVertical: 64,
        borderRadius: 6
    },

    listContainer: {
        flexDirection:"row",
        justifyContent: 'center',
        flexWrap: 'wrap'
    }

}) 