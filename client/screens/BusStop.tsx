import {
    View,
    Text,
    StatusBar,
    FlatList,
    TouchableOpacity,
    TextInput,
} from "react-native"
import React, { useEffect, useState } from "react"
import MapView from "react-native-maps"
import { WebView } from "react-native-webview"
import axios from "axios"
import useLocation from "../store/useLocation"
import useLanguage from "../store/useLanguage"
import { shallow } from "zustand/shallow"
import Background from "../components/Background"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import StopCard from "../components/StopCard"
import { useTranslation } from "react-i18next"
import { SERVER_ENDPOINT } from "../utils/styles"

type Props = {}

export interface StopProps {
    results: {
        name: string
        geometry: {
            location: {
                lat: number
                lng: number
            }
        }
    }[]
}

const BusStop = (props: Props) => {
    const [stops, setStops] = useState<StopProps["results"]>([])
    const [showModal, setShowModal] = useState(false)
    const { switchLang, lang } = useLanguage(
        (state) => ({
            switchLang: state.switchLang,
            lang: state.lang,
        }),
        shallow
    )

    const { coords, city } = useLocation(({ coords, city }) => ({
        coords,
        city,
    }))

    // Modal
    const [modalLat, setModalLat] = useState(coords.latitude?.toString())
    const [modalLng, setModalLng] = useState(coords.longitude?.toString())
    const [modalCity, setModalCity] = useState(city || "")
    const [modalName, setModalName] = useState("")

    const getNearByStop = async () => {
        try {
            const stops = await axios.get<StopProps>(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.latitude},${coords.longitude}&radius=6000000&type=bus_station&language=${lang}&key=AIzaSyCg7kGi7TcjlfmIyq_UKxoejX2Lb-M380U`
            )
            console.log(stops.data)
            setStops(stops.data.results)
        } catch (e) {
            console.log(e)
        }
    }

    const addBusStop = async () => {
        try {
            axios.post(`${SERVER_ENDPOINT}/stopdata`, {
                latitude: modalLat,
                longitude: modalLng,
                cityName: modalCity,
                stopName: modalName,
            })
        } catch (e) {
            console.warn(e)
        }
    }

    useEffect(() => {
        getNearByStop()
    }, [lang])

    const { t, i18n } = useTranslation()

    return (
        <Background>
            <FlatList
                style={{ height: "100%" }}
                data={stops}
                renderItem={({ item }) => (
                    <StopCard
                        stop={item.name}
                        coords={{
                            lat: item.geometry.location.lat,
                            lng: item.geometry.location.lng,
                        }}
                    />
                )}
                ListHeaderComponent={
                    <Text
                        className="text-white w-max mx-auto text-lg my-1 mb-6"
                        style={{
                            fontFamily: "RalewayBold",
                        }}
                    >
                        {t("Nearby Bus Stop")}
                    </Text>
                }
            />
            {/*    Add Btn  */}
            <TouchableOpacity
                onPress={() => setShowModal((e) => !e)}
                className="p-3 bg-emerald-400 shadow-md shadow-black w-12 rounded-lg flex flex-row justify-center absolute right-6 bottom-10"
            >
                <Ionicons
                    name="add-outline"
                    size={24}
                    color="white"
                    className="w-max bg-red-500"
                />
            </TouchableOpacity>

            {showModal && (
                <View className="bg-white rounded-md shadow-2xl shadow-black p-3 px-5 absolute top-[27%] left-6  -translate-x-1/2 w-[90%]">
                    <Text
                        className="text-xl text-center"
                        style={{ fontFamily: "RalewayBold" }}
                    >
                        {t("Add New Stop")}
                    </Text>
                    {/*   Inputs   */}
                    <View className="mt-4">
                        {/* Lat */}
                        <View>
                            {/* Lat Label */}
                            <Text
                                className="text-sm text-gray-400"
                                style={{ fontFamily: "RalewayRegular" }}
                            >
                                {t("Latitude")}
                            </Text>
                            {/* Lat Input */}
                            <TextInput
                                className="p-1 border-b-2 border-emerald-800"
                                style={{ fontFamily: "RalewayRegular" }}
                                onChangeText={(e) => {
                                    setModalLat(e)
                                }}
                                value={modalLat}
                            ></TextInput>
                        </View>
                        {/* lon */}
                        <View className="mt-4">
                            {/* lon Label */}
                            <Text
                                className="text-sm text-gray-400"
                                style={{ fontFamily: "RalewayRegular" }}
                            >
                                {t("Longitude")}
                            </Text>
                            {/* lon Input */}
                            <TextInput
                                className="p-1 border-b-2 border-emerald-800"
                                style={{ fontFamily: "RalewayRegular" }}
                                onChangeText={(e) => {
                                    setModalLng(e)
                                }}
                                value={modalLng}
                            ></TextInput>
                        </View>
                        {/* stop */}
                        <View className="mt-4">
                            {/* stop Label */}
                            <Text
                                className="text-sm text-gray-400"
                                style={{ fontFamily: "RalewayRegular" }}
                            >
                                {t("Stop Name")}
                            </Text>
                            {/* stop Input */}
                            <TextInput
                                className="p-1 border-b-2 border-emerald-800"
                                style={{ fontFamily: "RalewayRegular" }}
                                onChangeText={(e) => {
                                    setModalName(e)
                                }}
                                value={modalName}
                            ></TextInput>
                        </View>
                        {/* city */}
                        <View className="mt-4">
                            {/* city Label */}
                            <Text
                                className="text-sm text-gray-400"
                                style={{ fontFamily: "RalewayRegular" }}
                            >
                                {t("City Name")}
                            </Text>
                            {/* city Input */}
                            <TextInput
                                className="p-1 border-b-2 border-emerald-800"
                                style={{ fontFamily: "RalewayRegular" }}
                                onChangeText={(e) => {
                                    setModalCity(e)
                                }}
                                // @ts-ignore
                                value={t(modalCity || "")}
                            ></TextInput>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            addBusStop()
                            setShowModal(false)
                        }}
                        className="py-3 px-4 mt-4 bg-emerald-400 rounded-md"
                    >
                        <Text
                            className="text-white text-center"
                            style={{ fontFamily: "RalewayBold" }}
                        >
                            {t("Add Stop")}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </Background>
    )
}

export default BusStop
