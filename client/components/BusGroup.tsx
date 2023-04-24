import { View, Text } from "react-native"
import React from "react"
import BusCard from "./BusCard"
import { BusRoutes } from "../screens/Route"
import { Entypo } from "@expo/vector-icons"

type Props = {
    items: BusRoutes[] | null
}

const BusGroup = ({ items }: Props) => {
    return (
        <View className="border-2 border-gray-100 shadow-lg p-3 py-1 rounded-xl m-3 mx-5 bg-gray-50 shadow-black/50">
            {items && items[0] ? (
                items.map((item, i) => (
                    <BusCard key={i} item={item} index={i} len={items.length} />
                ))
            ) : (
                <View className="text-center w-full flex flex-col justify-center items-center pb-4 border-2 rounded-lg border-gray-300">
                    <Text
                        style={{
                            fontFamily: "RalewayRegular",
                        }}
                        className="p-4 text-2xl"
                    >
                        {`No Buses Found`}
                    </Text>
                    <Entypo
                        name="emoji-sad"
                        size={30}
                        color="black"
                        className="w-max mx-auto p-4"
                    />
                </View>
            )}
        </View>
    )
}

export default BusGroup
