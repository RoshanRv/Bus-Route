import { View, Text } from "react-native"
import React from "react"
import { Fontisto } from "@expo/vector-icons"
import {
    Ionicons,
    FontAwesome,
    Entypo,
    MaterialIcons,
} from "@expo/vector-icons"
import { COLORS, SIZE } from "../utils/styles"
import { AntDesign } from "@expo/vector-icons"
import { useTranslation } from "react-i18next"
import "../assets/i18n/i18n"
import { BusRoutes } from "../screens/Route"

type Props = {
    item: BusRoutes | null
    index: number
    len: number
}

const BusCard = ({ item, index, len }: Props) => {
    const { t, i18n } = useTranslation()

    const selectLogo = (len: number, i: number, spot: "start" | "end") => {
        if (i == 0 && spot === "start" && len - 0 > i) return "start"
        if (len - 1 == i && spot == "end") return "end"

        if (
            (len - 1 == i && spot === "start") ||
            (len - 0 > i && spot === "end")
        )
            return "merge"
    }

    return (
        <>
            {item && (
                <View className="flex flex-row  p-1 px-3 w-max mx-auto -mb-1 border border-gray-300 bg-white shadow-md shadow-black/40 rounded-md  items-center">
                    <AntDesign
                        name="clockcircleo"
                        size={20}
                        color="black"
                        className="w-max"
                    />

                    <Text
                        style={{ fontFamily: "InterSemiBold" }}
                        className=" pl-2"
                    >
                        {item?.arrivalTime1}
                    </Text>
                </View>
            )}

            {item ? (
                <View className="p-3 border-2 border-gray-200 my-2 rounded-lg shadow-md bg-white shadow-black/30 ">
                    {/* Upper */}
                    <View className="flex flex-row items-center justify-between px-1">
                        <View className="flex flex-row gap-x-4 items-center">
                            <Fontisto name="bus" size={28} color="black" />
                            {/*    Bus No  */}
                            <Text
                                className={`text-2xl ${
                                    index == 0
                                        ? "text-sky-500"
                                        : index > 0 && len - 1 == index
                                        ? "text-orange-500"
                                        : "text-red-500"
                                } `}
                                style={{ fontFamily: "InterBold" }}
                            >
                                {item?.busNo}
                            </Text>
                        </View>

                        {/*    Price  */}
                        <View className="bg-green-500 p-2 py-1 rounded-lg flex flex-row items-center">
                            <Entypo name="ticket" size={24} color="white" />
                            <Text
                                style={{
                                    fontFamily: "InterSemiBold",
                                }}
                                className=" pl-2 text-base text-white font-semibold"
                            >{`₹ ${item?.price}`}</Text>
                        </View>
                    </View>
                    {/*     Lower */}
                    {/*    Stops  */}
                    <View className="mt-4 ">
                        {/*    Strating Pt.  */}
                        <View className="flex flex-row gap-x-4 items-center p-1">
                            {selectLogo(len, index, "start") === "start" ? (
                                <Ionicons
                                    name="location-sharp"
                                    size={SIZE.sm}
                                    color={COLORS.blue}
                                />
                            ) : selectLogo(len, index, "start") === "end" ? (
                                <FontAwesome
                                    name="location-arrow"
                                    size={SIZE.sm}
                                    color={COLORS.orange}
                                />
                            ) : (
                                <MaterialIcons
                                    name="alt-route"
                                    size={SIZE.sm}
                                    color={COLORS.red}
                                />
                            )}

                            <Text
                                style={{ fontFamily: "RalewayRegular" }}
                                className="capitalize "
                            >
                                {t(item?.arrivalPlace)}
                            </Text>
                        </View>
                        {/*    End Pt.  */}
                        <View className="flex flex-row gap-x-4 p-1">
                            {selectLogo(len, index, "end") === "start" ? (
                                <Ionicons
                                    name="location-sharp"
                                    size={SIZE.sm}
                                    color={COLORS.blue}
                                />
                            ) : selectLogo(len, index, "end") === "end" ? (
                                <FontAwesome
                                    name="location-arrow"
                                    size={SIZE.sm}
                                    color={COLORS.orange}
                                />
                            ) : (
                                <MaterialIcons
                                    name="alt-route"
                                    size={SIZE.sm}
                                    color={COLORS.orange}
                                />
                            )}

                            <Text
                                style={{ fontFamily: "RalewayRegular" }}
                                className="capitalize "
                            >
                                {t(item?.arrivalPlace1)}
                            </Text>
                        </View>
                    </View>
                </View>
            ) : (
                <Text>No Buses</Text>
            )}
            {index != len - 1 && item && (
                <View className="-mt-1">
                    <View className="h-1 border-l-2 border-gray-400 w-2 mx-auto mb-1" />
                    <View className="h-1 border-l-2 border-gray-400 w-2 mx-auto mb-1" />
                    <View className="h-1 border-l-2 border-gray-400 w-2 mx-auto mb-1" />
                </View>
            )}
        </>
    )
}

export default BusCard