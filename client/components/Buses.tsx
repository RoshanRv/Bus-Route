import { View, Text, FlatList } from "react-native"
import React from "react"
import BusGroup from "./BusGroup"
import { BusRoutes } from "../screens/Route"

type Props = {
    busRoutes: BusRoutes[][]
}

const Buses = ({ busRoutes }: Props) => {
    return (
        <View style={{ flex: 1 }} className="mt-3">
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{
                    marginBottom: 470,
                }}
                // className="mb-96"
                data={busRoutes}
                renderItem={({ item }) => <BusGroup items={item} />}
                keyExtractor={({}, i) => i.toString()}
            />
        </View>
    )
}

export default Buses
