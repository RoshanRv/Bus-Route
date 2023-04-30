import { View, Text, TouchableOpacity, FlatList } from "react-native"
import React, { useEffect, useState } from "react"
import Background from "../components/Background"
import { Entypo, Fontisto, Ionicons } from "@expo/vector-icons"
import { COLORS, SERVER_ENDPOINT, SIZE } from "../utils/styles"
import DropDownPicker from "react-native-dropdown-picker"
import { useTranslation } from "react-i18next"
import "../assets/i18n/i18n"
import axios from "axios"
import { buses } from "../utils/datas"
import sendPushNotification from "../utils/sendNotification"
import Spinner from "../components/Spinner"

type BusInfoProps = {
    busNo: string
    type: string
    stops: string[]
    busTimes: string[]
    price: number
}

const BusDetails = () => {
    const [busNumber, setBusNumber] = useState(null)
    const [openBus, setOpenBus] = useState(false)
    const [busInfo, setBusInfo] = useState<BusInfoProps | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchBusDetails = async () => {
        try {
            setIsLoading(true)
            const details = await axios.post(`${SERVER_ENDPOINT}/busdetails`, {
                busNo: busNumber,
            })
            console.log({ details: details.data })
            setBusInfo(details.data)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    console.log(busNumber)

    useEffect(() => {
        console.log("hehe")

        if (busNumber) {
            fetchBusDetails()
        }
    }, [busNumber])

    const { t, i18n } = useTranslation()

    return (
        <View className="flex flex-col flex-1 ">
            <Background>
                <View className="flex flex-row justify-between mb-4 items-center ">
                    <Text></Text>
                    {/*    Title  */}
                    <Text
                        style={{ fontFamily: "RalewayBold" }}
                        className="text-white text-lg"
                    >
                        {t("Bus Details")}
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

                {/*    Search Bus Details  */}
                <View className="mx-4">
                    <DropDownPicker
                        listMode="MODAL"
                        modalAnimationType="slide"
                        modalTitle={t("Select Bus No.") as string}
                        placeholder={t("Select Bus No.") as string}
                        textStyle={{
                            color: "gray",
                            fontWeight: "500",
                            fontFamily: "RalewayRegular",
                        }}
                        style={{
                            borderColor: "white",
                            shadowColor: "gray",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                            // marginHorizontal: 10,
                        }}
                        dropDownContainerStyle={{
                            borderColor: "white",
                            shadowColor: "gray",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3,
                        }}
                        open={openBus}
                        setOpen={setOpenBus}
                        value={busNumber}
                        setValue={setBusNumber}
                        items={buses}
                    />
                </View>

                {/*    Bus Detials  */}
                {busInfo ? (
                    <>
                        <View className="flex flex-col items-center justify-between px-1 bg-white mx-8 p-6 rounded-lg mt-6 shadow-lg shadow-black ">
                            <View className="flex flex-row gap-x-4 items-center  ">
                                <Fontisto
                                    name="bus"
                                    size={42}
                                    color={COLORS.violet}
                                />
                                {/*    Bus No  */}
                                <Text
                                    className={`text-4xl text-orange-500 `}
                                    style={{ fontFamily: "InterBold" }}
                                >
                                    {busInfo.busNo}
                                </Text>
                            </View>
                        </View>

                        {/* Stops */}

                        <Text
                            style={{ fontFamily: "RalewayBold" }}
                            className="text-black text-lg text-center mt-4 "
                        >
                            {t("Stops")}
                        </Text>

                        <View className="p-6 py-2 h-max mt-3 rounded-lg bg-white shadow-lg shadow-black/50 mx-6">
                            <FlatList
                                className="h-max"
                                style={{
                                    paddingBottom: 750,
                                }}
                                data={busInfo.stops}
                                renderItem={({ item, index }) => (
                                    <View className=" flex flex-row items-center py-2 z-10">
                                        {/* Dot */}
                                        <View className="w-4 h-4 rounded-full bg-orange-500  relative shadow-lg shadow-black/40">
                                            {/* Line */}
                                            {index !=
                                                busInfo.stops.length - 1 && (
                                                <View
                                                    style={{
                                                        top: 15,
                                                        left: "22%",
                                                        zIndex: -1,
                                                    }}
                                                    className="h-10 w-2 bg-orange-300  absolute    "
                                                />
                                            )}
                                        </View>
                                        <Text
                                            style={{
                                                fontFamily: "RalewayRegular",
                                            }}
                                            className="pl-3 text-base capitalize whitespace-pre-wrap "
                                        >
                                            {`${t(item)} - ${
                                                busInfo.busTimes[index]
                                            }`}
                                        </Text>
                                    </View>
                                )}
                            />
                        </View>
                    </>
                ) : !isLoading ? (
                    <Text
                        style={{ fontFamily: "RalewayRegular" }}
                        className="p-4 shadow-lg shadow-black/50 rounded-lg bg-white mx-6 mt-10"
                    >
                        {t("No Data Found")}
                    </Text>
                ) : (
                    <Spinner />
                )}

                {/* Search BTN 
                <TouchableOpacity
                    className="bg-red-500 p-2 px-[.7rem] rounded-full  mx-auto shadow-2xl mt-4 shadow-black -z-20"
                >
                    <Ionicons
                        className=""
                        name="ios-search"
                        size={SIZE.lg}
                        color={"white"}
                    />
                </TouchableOpacity> */}
            </Background>
        </View>
    )
}

export default BusDetails
