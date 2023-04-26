import { View, Text, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import { Fontisto } from "@expo/vector-icons"
import {
    Ionicons,
    FontAwesome,
    Entypo,
    MaterialIcons,
} from "@expo/vector-icons"
import { COLORS, MODEL_ENDPOINT, SIZE } from "../utils/styles"
import { AntDesign } from "@expo/vector-icons"
import { useTranslation } from "react-i18next"
import "../assets/i18n/i18n"
import { BusRoutes } from "../screens/Route"
import { FontAwesome5 } from "@expo/vector-icons"
import axios from "axios"
import useLocation from "../store/useLocation"

type Props = {
    item: BusRoutes | null
    index: number
    len: number
}

const BusCard = ({ item, index, len }: Props) => {
    const { t, i18n } = useTranslation()
    const [crowdLvl, setCrowdLvl] = useState<null | number>(null)

    const selectLogo = (len: number, i: number, spot: "start" | "end") => {
        if (i == 0 && spot === "start" && len - 0 > i) return "start"
        if (len - 1 == i && spot == "end") return "end"

        if (
            (len - 1 == i && spot === "start") ||
            (len - 0 > i && spot === "end")
        )
            return "merge"
    }

    const weather = useLocation((state) => state.weather)

    const predictCrowd = async () => {
        try {
            axios
                .post(`${MODEL_ENDPOINT}/predict`, {
                    BusNo: item?.busNo,
                    FestiveDay: "Yes",
                    Weather: weather?.includes("rain") ? "Rainy" : "Sunny",
                })
                .then((resp) => {
                    console.log(resp.data)
                    setCrowdLvl(resp.data.prediction)
                })
        } catch (e) {
            console.log(e)
        }
    }

    const predictMsg = (lvl: number | null) => {
        if (lvl === 0 || lvl === 1) {
            return "Low Crowd"
        } else if (lvl === 2) {
            return "Moderate Crowd"
        } else if (lvl && lvl >= 3) {
            return "High Crowd"
        } else {
            return ""
        }
    }

    useEffect(() => {
        predictCrowd()
    }, [])

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
                            >{`₹ ${Math.abs(item?.price)}`}</Text>
                        </View>
                        {/* Lady */}
                        {item.isfreeBus === 1 && (
                            <View className="">
                                <FontAwesome5
                                    name="female"
                                    size={24}
                                    color="#ec4899"
                                />
                            </View>
                        )}
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
                        {/*      Crowd Level    */}
                        <TouchableOpacity className="flex flex-row w-max items-center mx-auto text-center">
                            <MaterialIcons
                                name="groups"
                                size={24}
                                color={
                                    crowdLvl === 0 || crowdLvl === 1
                                        ? COLORS.green
                                        : crowdLvl == 2
                                        ? COLORS.yellow
                                        : COLORS.red
                                }
                            />
                            <Text
                                className="pl-3 "
                                style={{
                                    fontFamily: "RalewayRegular",
                                }}
                            >
                                {t(predictMsg(crowdLvl) || "")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <Text>No Buses</Text>
            )}
            {/*   Dotted Lines   */}
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
