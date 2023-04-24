import { View, Text, TouchableOpacity, FlatList } from "react-native"
import React, { useEffect, useState } from "react"
import Background from "../components/Background"
import { Entypo, Fontisto, Ionicons } from "@expo/vector-icons"
import { COLORS, SERVER_ENDPOINT, SIZE } from "../utils/styles"
import { useSSR, useTranslation } from "react-i18next"
import "../assets/i18n/i18n"
import axios from "axios"
import { MaterialIcons } from "@expo/vector-icons"
import sendPushNotification from "../utils/sendNotification"
import Spinner from "../components/Spinner"

type Props = {}

interface BreakdownProps {
    busNo: string
    isBreakdown: number
}

const Breakdown = (props: Props) => {
    const { t, i18n } = useTranslation()
    const [breakdownBuses, setBreakdownBuses] = useState<BreakdownProps[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const getBreakdownBuses = async () => {
        try {
            setIsLoading(true)
            const breakdown = await axios.get(`${SERVER_ENDPOINT}/breakdown`)
            setBreakdownBuses(breakdown.data)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getBreakdownBuses()
    }, [])

    return (
        <View className="flex flex-col flex-1  ">
            <Background>
                {/*    Title  */}
                <View className="flex flex-row justify-between mb-4 items-center ">
                    <Text className="text-transparent"></Text>
                    {/*    Title  */}
                    <Text
                        style={{ fontFamily: "RalewayBold" }}
                        className="text-white text-lg"
                    >
                        {t("Brokedown Buses")}
                    </Text>
                    {/*   Notification Btn   */}
                    <TouchableOpacity
                        onPress={sendPushNotification}
                        className="     "
                    >
                        <Ionicons
                            className="w-max ml-auto text-center "
                            color={"white"}
                            name={"notifications"}
                            size={SIZE.sm}
                        />
                    </TouchableOpacity>
                </View>
                {/*    Buses  */}
                {!isLoading ? (
                    <View className="w-full  ">
                        <FlatList
                            numColumns={2}
                            data={breakdownBuses}
                            contentContainerStyle={{
                                justifyContent: "space-around",
                            }}
                            className="w-full "
                            renderItem={({ item }) => (
                                <View className="p-4 rounded-md bg-white shadow-lg shadow-black flex flex-row w-max mx-auto">
                                    <View className="flex flex-row items-end z-50">
                                        <Entypo
                                            name="warning"
                                            size={24}
                                            color={COLORS.red}
                                        />
                                        <View className="-ml-3 mb-1 -z-10 ">
                                            <Fontisto
                                                name="bus"
                                                size={36}
                                                color={COLORS.violet}
                                            />
                                        </View>
                                    </View>
                                    <Text
                                        className="pl-4 text-2xl"
                                        style={{ fontFamily: "InterBold" }}
                                    >
                                        {item.busNo}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>
                ) : (
                    <Spinner />
                )}
            </Background>
        </View>
    )
}

export default Breakdown
