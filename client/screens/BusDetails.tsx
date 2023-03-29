import { View, Text, TouchableOpacity, FlatList } from "react-native"
import React, { useEffect, useState } from "react"
import Background from "../components/Background"
import { Entypo, Fontisto, Ionicons } from "@expo/vector-icons"
import { COLORS, SIZE } from "../utils/styles"
import DropDownPicker from "react-native-dropdown-picker"
import { useTranslation } from "react-i18next"
import "../assets/i18n/i18n"
import axios from "axios"

type Props = {}

const BusDetails = (props: Props) => {
    const [busNumber, setBusNumber] = useState(null)
    const [openBus, setOpenBus] = useState(false)
    const [busInfo, setBusInfo] = useState({})

    const fetchBusDetails = async () => {
        try {
            const details = await axios.post(
                "http://192.168.60.147:9000/busdetails",
                { busNo: busNumber }
            )
            console.log(details.data)
            setBusInfo(details.data)
        } catch (e) {
            console.log(e)
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

    const details = {
        busNo: "30B",
        type: t("normal"),
        stops: [
            t("virudhunagar"),
            t("kamaraj college of engineering"),
            t("kallikudi"),
            t("sivarakottai"),
            t("thirumangalam"),
            t("kappalur"),
            t("mandela nagar"),
            t("pandi kovil"),
            t("matuthavani"),
        ],
        price: 36,
    }

    const busNoSelect = [
        {
            label: "30B",
            value: "30B",
        },
        {
            label: "36A",
            value: "36A",
        },
        {
            label: "30A",
            value: "30A",
        },
        {
            label: "30A",
            value: "30A",
        },
    ]

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
                    <TouchableOpacity className="     ">
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
                        items={busNoSelect}
                    />
                </View>

                {/*    Bus Detials  */}
                <View className="flex flex-col items-center justify-between px-1 bg-white mx-8 p-3 rounded-lg mt-6 shadow-lg shadow-black ">
                    <View className="flex flex-row gap-x-4 items-center mb-6 ">
                        <Fontisto name="bus" size={38} color={COLORS.violet} />
                        {/*    Bus No  */}
                        <Text
                            className={`text-3xl text-orange-500 `}
                            style={{ fontFamily: "InterBold" }}
                        >
                            {busInfo.busNo}
                        </Text>
                    </View>

                    {/*    Price  */}
                    <View className="bg-green-500 p-3 py-2 rounded-lg flex flex-row items-center">
                        <Entypo name="ticket" size={34} color="white" />
                        <Text
                            style={{
                                fontFamily: "InterSemiBold",
                            }}
                            className=" pl-8 text-2xl  text-white font-semibold"
                        >{`₹ ${details.price}`}</Text>
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
                                    {index != busInfo.stops.length - 1 && (
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
                                    style={{ fontFamily: "RalewayRegular" }}
                                    className="pl-3 text-base capitalize whitespace-pre-wrap "
                                >
                                    {t(item)}
                                </Text>
                            </View>
                        )}
                    />
                </View>

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
