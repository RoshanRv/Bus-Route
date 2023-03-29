import { View, Text } from "react-native"
import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
    useTransition,
} from "react"
import { FontAwesome } from "@expo/vector-icons"
import DropDownPicker from "react-native-dropdown-picker"

import { COLORS, SIZE } from "../utils/styles"
import useSearchDetails from "../store/useSearchDetails"
import { shallow } from "zustand/shallow"
import { useTranslation } from "react-i18next"
import "../assets/i18n/i18n"
import useLanguage from "../store/useLanguage"

type Props = {}

const Filters = ({}: Props) => {
    const [openFilter, setOpenFilter] = useState(false)
    const { filter, setFilter } = useSearchDetails(
        ({ filter, setFilter }) => ({ filter, setFilter }),
        shallow
    )

    const { t, i18n } = useTranslation()

    const lang = useLanguage((state) => state.lang)

    useEffect(() => {
        i18n.changeLanguage(lang)
    }, [lang])

    const items = [
        {
            label: t("Time"),
            value: "time",
        },
        { label: t("Price"), value: "price" },
    ]

    return (
        <View className="bg-white shadow-lg p-2 py-0 pt-2 rounded-xl shadow-black flex flex-row items-center justify-around mx-6 mt-4">
            <FontAwesome name="filter" size={SIZE.md} color={COLORS.violet} />
            <View className="flex flex-col  w-[70%]">
                <Text
                    style={{ fontFamily: "RalewayRegular" }}
                    className="pl-3 text-xs text-gray-300 font-semibold z-50 -mb-3 "
                >
                    {t("Filter")}
                </Text>
                <DropDownPicker
                    bottomOffset={10}
                    dropDownDirection="BOTTOM"
                    placeholder={t("Select Filter") as string}
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
                    open={openFilter}
                    setOpen={setOpenFilter}
                    value={filter}
                    onSelectItem={(e) => setFilter(e.value)}
                    items={items}
                />
            </View>
        </View>
    )
}

export default Filters
