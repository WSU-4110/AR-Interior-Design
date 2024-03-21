import { View } from '@/components/Themed';
import { CardStyle } from '@/styles/ItemCardStyle';
import { Image, Text } from 'react-native';


type ItemCardProps = {
    itemName: String,
    brandName: String,
    itemCost: number,
}

export default function ItemCard(props: ItemCardProps) {


    return (
        <View style={CardStyle.card}>
            <View style={CardStyle.content}>
                {/* { props.itemName } */}
                <Image source={require("@/assets/images/favicon.png")} 
                                style={CardStyle.image}/> 
                <Text style={CardStyle.itemText}>{props.itemName}</Text>
                <Text style={CardStyle.brandText}>
                    {props.brandName}
                </Text>
                <Text style={CardStyle.priceText}>{props.itemCost}</Text>
            </View>
        </View>
    )
}

