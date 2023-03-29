import { View, Text } from "react-native"
import React, { useState } from "react"
import useSearchDetails from "../store/useSearchDetails"
import { shallow } from "zustand/shallow"
import DateTimePicker from "@react-native-community/datetimepicker"
// import DropDownPicker from "react-native-dropdown-picker"
// import DatePicker from "react-native-date-picker"
import DropDownPicker from "react-native-dropdown-picker"
import { AntDesign } from "@expo/vector-icons"
import { useTranslation } from "react-i18next"
import "../assets/i18n/i18n"
type Props = {}

const Time = (props: Props) => {
    const [openBusType, setOpenBusType] = useState(false)

    const { t, i18n } = useTranslation()

    const { setTime, time } = useSearchDetails(
        ({ time, setTime }) => ({ time, setTime }),
        shallow
    )

    const items = [
        {
            label: t("Now"),
            value: "Now",
        },
        {
            label: "6:00",
            value: "6:00",
        },
        { label: "6.15", value: "6.15" },
        { label: "6.30", value: "6.30" },
        { label: "6.45", value: "6.45" },
        { label: "7.00", value: "7.00" },
        { label: "7.15", value: "7.15" },
        { label: "7.30", value: "7.30" },
    ]

    return (
        <View className=" bg-white shadow-lg p-2 py-0 pt-2 rounded-xl shadow-black flex flex-row items-center justify-around mx-6 mt-4">
            <AntDesign name="clockcircleo" size={24} color="black" />
            <View className="flex flex-col  w-[70%]">
                <Text
                    style={{ fontFamily: "RalewayRegular" }}
                    className="pl-3 text-xs text-gray-300 font-semibold z-50 -mb-3 "
                >
                    {t("Time")}
                </Text>

                <DropDownPicker
                    listMode="MODAL"
                    modalAnimationType="slide"
                    modalTitle="Select Time"
                    placeholder={"Select Time"}
                    textStyle={{
                        color: "gray",
                        fontWeight: "500",
                        fontFamily: "RalewayRegular",
                    }}
                    style={{
                        borderColor: "white",
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
                    open={openBusType}
                    setOpen={setOpenBusType}
                    value={time}
                    onSelectItem={(e) => setTime(e.value)}
                    items={items}
                />
            </View>
        </View>
    )
}

export default Time
