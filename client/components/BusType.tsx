import { View, Text } from "react-native"
import React, { Dispatch, SetStateAction, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import DropDownPicker from "react-native-dropdown-picker"

import { COLORS, SIZE } from "../utils/styles"
import useSearchDetails from "../store/useSearchDetails"
import { shallow } from "zustand/shallow"
import { useTranslation } from "react-i18next"
import "../assets/i18n/i18n"

type Props = {
    // busType: string | null
    // setBusType: Dispatch<SetStateAction<any>>
}

const BusType = ({}: Props) => {
    const [openBusType, setOpenBusType] = useState(false)

    const { t, i18n } = useTranslation()

    const { busType, setBusType } = useSearchDetails(
        ({ busType, setBusType }) => ({ busType, setBusType }),
        shallow
    )

    const items = [
        {
            label: t("All"),
            value: "all",
        },
        { label: t("Normal"), value: "normal" },
        { label: t("Express"), value: "express" },
        { label: t("Deluxe"), value: "deluxe" },
    ]

    return (
        <View className="bg-white shadow-lg p-2 py-0 pt-2 rounded-xl shadow-black flex flex-row items-center justify-around mx-6 mt-4">
            <Ionicons name="bus" size={SIZE.md} color={COLORS.red} />
            <View className="flex flex-col  w-[70%]">
                <Text
                    style={{ fontFamily: "RalewayRegular" }}
                    className="pl-3 text-xs text-gray-300 font-semibold z-50 -mb-3 "
                >
                    {t("Bus Type")}
                </Text>
                <DropDownPicker
                    placeholder={t("Select Bus Type") as string}
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
                    value={busType}
                    onSelectItem={(e) => setBusType(e.value)}
                    items={items}
                />
            </View>
        </View>
    )
}

export default BusType
