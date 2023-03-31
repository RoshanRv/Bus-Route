import { View, Text } from "react-native"
import React from "react"
import BusCard from "./BusCard"
import { BusRoutes } from "../screens/Route"

type Props = {
    items: BusRoutes[] | null
}

const BusGroup = ({ items }: Props) => {
    console.log({ items })

    return (
        <View className="border-2 border-gray-100 shadow-lg p-3 py-1 rounded-xl m-3 mx-5 bg-gray-50 shadow-black/50">
            {items && items[0] ? (
                items.map((item, i) => (
                    <BusCard key={i} item={item} index={i} len={items.length} />
                ))
            ) : (
                <Text className="p-4 text-2xl">No Buses</Text>
            )}
        </View>
    )
}

export default BusGroup
