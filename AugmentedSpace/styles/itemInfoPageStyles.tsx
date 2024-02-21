import { StyleSheet } from "react-native"
import Colors from '@/constants/Colors'
export const infoPageStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 100,
    },
    productImage: {
        width: 250,
        height: 300,
    },
    view360Button: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#f8f8f8',
        padding: 8,
        borderRadius: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    detailsContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#333',
        marginBottom: 5,
    },
    productDescription: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginBottom: 20,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    buyButton: {
        backgroundColor: 'lightblue',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 20,
    },
    buyButtonText: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
    },
    priceText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
    },
    viewInYourRoomButton: {
        backgroundColor: 'lightblue',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 20,
        marginTop: 20,
}
});