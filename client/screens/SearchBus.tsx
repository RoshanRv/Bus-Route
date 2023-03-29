import {
    View,
    Text,
    ImageBackground,
    Image,
    Button,
    TouchableOpacity,
    ImageComponent,
} from "react-native"
import React, { useState } from "react"
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
import Time from "../components/Time"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTranslation } from "react-i18next"
import "../assets/i18n/i18n"
import useLanguage from "../store/useLanguage"
import useSearchDetails from "../store/useSearchDetails"

type Props = {
    navigation: any
}

const SearchBus = ({ navigation }: Props) => {
    const { t, i18n } = useTranslation()

    const { currLoc, dropLoc } = useSearchDetails(({ currLoc, dropLoc }) => ({
        dropLoc,
        currLoc,
    }))

    const handleSearch = () => {
        if (dropLoc && currLoc) {
            navigation.navigate("Route")
        }
    }

    return (
        <View className="flex flex-col flex-1  ">
            <Background>
                <View className="flex flex-row justify-between mb-4 items-center ">
                    <Text className="text-transparent">Hello</Text>
                    {/*    Title  */}
                    <Text
                        style={{ fontFamily: "RalewayBold" }}
                        className="text-white text-lg"
                    >
                        {t("Enter Destination")}
                    </Text>
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
                {/*   Bus GIF   */}
                <View className="rounded-full  w-max mx-auto my-4 overflow-hidden shadow-xl shadow-black ">
                    <Image
                        className="w-60 h-60 rounded-full "
                        source={require("../assets/bus-animation.gif")}
                    />
                </View>

                {/*  Current & Drop   */}
                <LocationBox />

                <View className="flex flex-col-reverse">
                    {/*  Time  */}
                    <Time />
                    {/*   Filter   */}
                    <Filters />
                    {/*    Bus Type  */}
                    <BusType />
                </View>
                {/*    Search BTN  */}
                <TouchableOpacity
                    onPress={handleSearch}
                    className="bg-red-500 p-2 px-[.7rem] rounded-full  mx-auto shadow-2xl mt-4 shadow-black -z-20"
                >
                    <Ionicons
                        className=""
                        name="ios-search"
                        size={SIZE.lg}
                        color={"white"}
                    />
                </TouchableOpacity>
            </Background>
        </View>
    )
}

export default SearchBus
