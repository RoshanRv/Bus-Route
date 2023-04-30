import {
    View,
    Text,
    ImageBackground,
    Image,
    Button,
    TouchableOpacity,
    ImageComponent,
} from "react-native"
import React, { useEffect, useState } from "react"
import {
    Route,
    NavigationAction,
    NavigationProp,
} from "@react-navigation/native"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import Background from "../components/Background"
import LocationBox from "../components/LocationBox"
import { COLORS, SERVER_ENDPOINT, SIZE } from "../utils/styles"
import Filters from "../components/Filters"
import BusType from "../components/BusType"
import { BoldTitle } from "../components/Title"
import useSearchDetails from "../store/useSearchDetails"
import { shallow } from "zustand/shallow"
import { FontAwesome } from "@expo/vector-icons"
import Buses from "../components/Buses"
import { useTranslation } from "react-i18next"
import "../assets/i18n/i18n"
import axios from "axios"
import sendPushNotification from "../utils/sendNotification"
import Spinner from "../components/Spinner"

type Props = {
    navigation: any
    route: any
}

export interface BusRoutes {
    arrivalPlace: string
    arrivalPlace1: string
    arrivalTime: string
    arrivalTime1: string
    busNo: string
    price: number
    isfreeBus?: number
}

const Routes = ({ navigation, route }: Props) => {
    const { t, i18n } = useTranslation()

    const [isLoading, setIsLoading] = useState(false)

    const { busType, filter, setBusType, setFilter, currLoc, dropLoc } =
        useSearchDetails(
            ({ busType, filter, setBusType, setFilter, dropLoc, currLoc }) => ({
                busType,
                filter,
                setBusType,
                setFilter,
                currLoc,
                dropLoc,
            }),
            shallow
        )

    const [busRoutes, setBusRoutes] = useState<BusRoutes[][]>([[]])

    const getRoutes = async () => {
        try {
            setIsLoading(true)
            const routes = await axios.post(`${SERVER_ENDPOINT}/busdata`, {
                startPlace: currLoc,
                endPlace: dropLoc,
            })

            setBusRoutes(routes.data)
            console.log({ routes: routes.data[0] })
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getRoutes()
    }, [])

    return (
        <View className="flex flex-col flex-1  ">
            <Background>
                <View className="flex flex-row justify-between mb-4 items-center ">
                    {/*   Go Back   */}
                    <TouchableOpacity className="     ">
                        <Ionicons
                            onPress={() => navigation.goBack()}
                            className="w-max ml-auto text-center "
                            color={"white"}
                            name={"chevron-back"}
                            size={SIZE.lg}
                        />
                    </TouchableOpacity>
                    {/*    Title  */}
                    <BoldTitle
                        style={{ fontFamily: "RalewayBold" }}
                        className="text-white text-lg"
                    >
                        {t("Bus Routes")}
                    </BoldTitle>
                    {/*   Notification Btn   */}
                    <TouchableOpacity className="     ">
                        <Ionicons
                            onPress={sendPushNotification}
                            className="w-max ml-auto text-center "
                            color={"white"}
                            name={"notifications"}
                            size={SIZE.sm}
                        />
                    </TouchableOpacity>
                </View>

                {/*  Current & Drop   */}
                <LocationBox />

                {/*    Search BTN  */}
                <TouchableOpacity
                    onPress={getRoutes}
                    className="bg-red-500 p-2 px-3 rounded-full  mx-auto shadow-2xl  shadow-black z-20 -mb-1 mt-4 border-2 border-white "
                >
                    <Ionicons
                        className=""
                        name="ios-search"
                        size={SIZE.lg}
                        color={"white"}
                    />
                </TouchableOpacity>
                {/*   Buses Routes  */}
                <View
                    style={{
                        borderRadius: 50,
                    }}
                    className=" mt-2 bg-white w-full h-full shadow-lg shadow-black scale-105 p-4 "
                >
                    {/* Filters */}
                    <View className="flex flex-row justify-around text-gray-400">
                        {/* Price / Time Filter */}
                        <View className="flex flex-row gap-x-2 rounded-full p-2 py-1 border border-gray-300 bg-white  shadow-md shadow-black/50">
                            <FontAwesome
                                name="filter"
                                size={SIZE.sm}
                                color={COLORS.violet}
                            />

                            <Text
                                className="capitalize text-gray-500 "
                                style={{ fontFamily: "RalewayRegular" }}
                            >
                                {t(filter! || "time")}
                            </Text>
                        </View>
                        {/* Bus Type */}

                        <View className="flex flex-row gap-x-2 rounded-full p-2 py-1 border border-gray-300 bg-white  shadow-md shadow-black/50">
                            <Ionicons
                                name="bus"
                                size={SIZE.sm}
                                color={COLORS.red}
                            />

                            <Text
                                className="capitalize text-gray-500"
                                style={{ fontFamily: "RalewayRegular" }}
                            >
                                {t(busType || "All")}
                            </Text>
                        </View>
                    </View>
                    {/* Buses */}
                    {!isLoading ? (
                        <Buses busRoutes={busRoutes} />
                    ) : (
                        <Spinner color={COLORS.green} />
                    )}
                </View>
            </Background>
        </View>
    )
}

export default Routes
