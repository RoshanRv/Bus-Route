import { View, Text, FlatList } from "react-native"
import React from "react"
import BusGroup from "./BusGroup"
import { BusRoutes } from "../screens/Route"

type Props = {
    busRoutes: BusRoutes[][]
}

const Buses = ({ busRoutes }: Props) => {
    const busDetails = [
        [
            {
                busNo: "30B",
                start: "kamaraj college of engineering",
                drop: "mandela nagar",
                price: 40,
                time: "7.20",
            },
            {
                busNo: "27C",
                start: "mandela nagar",
                drop: "periyar bus stand",
                price: 40,
                time: "8.10",
            },
        ],
        [
            {
                busNo: "30B",
                start: "kamaraj college of engineering",
                drop: "thirumangalam",
                price: 40,
                time: "7.20",
            },
            {
                busNo: "23A",
                start: "thirumangalam",
                drop: "periyar bus stand",
                price: 37,
                time: "8.00",
            },
        ],
        [
            {
                busNo: "30B",
                start: "kamaraj college of engineering",
                drop: "thirumangalam",
                price: 40,
                time: "7.20",
            },
            {
                busNo: "27C",
                start: "thirumangalam",
                drop: "kappalur",
                price: 40,
                time: "7.50",
            },
            {
                busNo: "23A",
                start: "kappalur",
                drop: "periyar bus stand",
                price: 37,
                time: "8.40",
            },
        ],
    ]

    return (
        <View style={{ flex: 1 }} className="mt-6">
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{
                    marginBottom: 550,
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
