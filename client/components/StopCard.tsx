import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import {
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons"
import axios from "axios"
import useLocation from "../store/useLocation"
import { useSSR, useTranslation } from "react-i18next"
import { COLORS } from "../utils/styles"
import useLanguage from "../store/useLanguage"

type Props = {
    stop: string
    coords: {
        lat: number
        lng: number
    }
}

interface DistanceTimeProps {
    rows: [
        {
            elements: [
                {
                    distance: {
                        text: string
                    }
                    duration: {
                        text: string
                    }
                }
            ]
        }
    ]
}

const StopCard = ({ stop, coords }: Props) => {
    const currCoords = useLocation((state) => state.coords)
    const lang = useLanguage((state) => state.lang)
    const [disTime, setDisTime] = useState<DistanceTimeProps["rows"]>()

    const { t, i18n } = useTranslation()

    const getDistanceTime = async () => {
        try {
            const { data } = await axios.get<DistanceTimeProps>(
                `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${currCoords.latitude},${currCoords.longitude}&destinations=${coords.lat},${coords.lng}&language=${lang}&key=AIzaSyCg7kGi7TcjlfmIyq_UKxoejX2Lb-M380U`
            )
            setDisTime(data.rows)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getDistanceTime()
    }, [lang])

    return (
        <View className="bg-white shadow-lg shadow-black rounded-md flex flex-row w-[80%] mx-auto my-3 p-3 py-4 justify-around items-center ">
            {/*    Icon  */}
            <MaterialCommunityIcons
                name="bus-stop"
                size={42}
                color={COLORS.violet}
            />
            {/*   Stops  */}
            <View>
                {/* Stop Name */}
                <Text
                    style={{
                        fontFamily: "RalewayRegular",
                    }}
                >
                    {stop}
                </Text>
                {/*   Time & Dis   */}
                <View className="flex flex-row mt-4">
                    {/* Dis */}
                    <View className="flex flex-row items-center ">
                        <FontAwesome5
                            name="route"
                            size={16}
                            color={COLORS.orange}
                        />
                        <Text
                            className="pl-2"
                            style={{
                                fontFamily: "RalewayRegular",
                            }}
                        >
                            {disTime
                                ? t(disTime[0].elements[0].distance.text)
                                : "N/A"}
                        </Text>
                    </View>
                    {/* Time */}
                    <View className="flex flex-row items-center justify-center pl-5">
                        <Ionicons
                            name="time-outline"
                            size={16}
                            color={COLORS.blue}
                        />
                        <Text
                            className="pl-2"
                            style={{
                                fontFamily: "RalewayRegular",
                            }}
                        >
                            {disTime
                                ? t(disTime[0].elements[0].duration.text)
                                : "N/A"}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default StopCard
