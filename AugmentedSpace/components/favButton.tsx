import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, View } from "react-native"
import {MaterialCommunityIcons} from "@expo/vector-icons"

type FavButtonProps = {
    onPress?: () => void;
    className?: string;
}
export default function FavButton(props: FavButtonProps) {
    const { colors } = useTheme();
    const [liked, setLiked] = useState(false);
    

    return (
        <View
            className=" flex-auto rounded-full items-center p-1 self-end"
            style={{
                backgroundColor: colors.card,
                position: "absolute",
                shadowOffset: { width:0, height:2 },
                shadowColor: colors.shadow,
                shadowOpacity: 1,

            }}
            >
            <Pressable
                onPress={ () => setLiked(!liked) }
            >
                <MaterialCommunityIcons
                    name={liked ? "heart" : "heart-outline"}
                    size={30}
                    color={liked ? "red" : "gray"}
                    />
            </Pressable>
        </View>
    )
}