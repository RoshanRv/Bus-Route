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
import { COLORS, SIZE } from "../utils/styles"
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
}

const Routes = ({ navigation, route }: Props) => {
    const { t, i18n } = useTranslation()

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
            const routes = await axios.post(
                `http://192.168.60.147:9000/busdata`,
                {
                    startPlace: currLoc,
                    endPlace: dropLoc,
                }
            )

            setBusRoutes(routes.data)
            console.log(routes.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        console.log("heeh")

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
                <TouchableOpacity className="bg-red-500 p-2 px-[.7rem] rounded-full  mx-auto shadow-2xl mt-4 shadow-black -z-20">
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
                    className=" mt-12 bg-white w-full h-full shadow-lg shadow-black scale-105 p-4 "
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
                                {t(filter!)}
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
                                {t(busType || "")}
                            </Text>
                        </View>
                    </View>
                    {/* Buses */}
                    <Buses busRoutes={busRoutes} />
                </View>
            </Background>
        </View>
    )
}

export default Routes
