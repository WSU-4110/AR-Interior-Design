import { View } from '@/components/Themed';
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