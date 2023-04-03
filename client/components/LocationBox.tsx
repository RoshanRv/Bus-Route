import { View, Text, TouchableOpacity } from "react-native"
import React, { Dispatch, SetStateAction, useState } from "react"
import DropDownPicker from "react-native-dropdown-picker"
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons"
import { COLORS, SIZE } from "../utils/styles"
import useSearchDetails from "../store/useSearchDetails"
import { shallow } from "zustand/shallow"
import { useTranslation } from "react-i18next"
import "../assets/i18n/i18n"

type Props = {}

const LocationBox = ({}: Props) => {
    const [openToLoc, setOpenToLoc] = useState(false)
    const [openCurrentLoc, setOpenCurrentLoc] = useState(false)

    const { currLoc, dropLoc, setCurrLoc, setDropLoc, handleSwap } =
        useSearchDetails(
            ({ currLoc, dropLoc, setCurrLoc, setDropLoc, handleSwap }) => ({
                currLoc,
                dropLoc,
                setCurrLoc,
                setDropLoc,
                handleSwap,
            }),
            shallow
        )

    const { t, i18n } = useTranslation()

    const items = [
        { label: t("Sattur"), value: "sattur" },
        { label: t("Thirumangalam"), value: "thirumangalam" },

        { label: t("Periyar Bus Stand"), value: "periyar-bustand" },
        {
            label: t("Kamaraj College Of Engineering"),
            value: "kamaraj college of engineering",
        },
        { label: t("Thirunagar"), value: "thirunagar" },
        { label: t("Kappalur"), value: "kappalur" },
        { label: t("Palanganatham"), value: "palanganatham" },
        { label: t("Villapuram"), value: "villapuram" },
        { label: t("Mandela Nagar"), value: "mandela nagar" },
        { label: t("Gorippalayam"), value: "gorippalayam" },
        { label: t("Virudhunagar"), value: "virudhunagar" },
        { label: t("Kallikudi"), value: "kallikudi" },
        { label: t("Sivarakottai"), value: "sivarakottai" },
        { label: t("Madurai"), value: "madurai" },
        { label: t("Nagarkovil"), value: "nagarkovil" },
        { label: t("etturvattam toll"), value: "etturvattam toll" },
        { label: t("naduvapatti"), value: "naduvapatti" },
        { label: t("pattampudur"), value: "pattampudur" },
        { label: t("solakar"), value: "solakar" },
        {
            label: t("virudhunagar medical college"),
            value: "virudhunagar medical college",
        },

        { label: t("maravankulam"), value: "maravankulam" },
        { label: t("tadagam"), value: "tadagam" },
        { label: t("vellakulam"), value: "vellakulam" },
        { label: t("thoppore"), value: "thoppore" },
        { label: t("PRC bus depot"), value: "PRC பஸ் டிப்போ" },
    ]

    return (
        <View className="bg-white shadow-lg p-2 py-0 pt-2 rounded-xl shadow-black flex flex-row items-center justify-around mx-6">
            {/* Icons */}
            <View className="flex flex-col gap-y-6 justify-around items-center ">
                <Ionicons
                    name="location-sharp"
                    size={SIZE.md}
                    color={COLORS.blue}
                />
                <FontAwesome
                    name="location-arrow"
                    size={SIZE.md}
                    color={COLORS.orange}
                />
            </View>

            {/*    Locations  */}
            <View className="flex flex-col-reverse  w-[70%] ">
                {/* To Select */}
                <DropDownPicker
                    showArrowIcon={false}
                    listMode="MODAL"
                    modalAnimationType="slide"
                    searchable={true}
                    searchPlaceholder={t("Search Location") as string}
                    placeholder={t("Drop Location") as string}
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
                    }}
                    searchContainerStyle={{
                        borderBottomColor: "white",
                    }}
                    searchTextInputStyle={{
                        borderColor: "white",
                        borderRadius: 0,
                        borderBottomColor: "gray",
                    }}
                    open={openToLoc}
                    setOpen={setOpenToLoc}
                    value={dropLoc}
                    onSelectItem={(e) => setDropLoc(e.value)}
                    items={items}
                />
                {/* To text */}
                <Text
                    style={{ fontFamily: "RalewayRegular" }}
                    className="pl-2 -mb-4 text-xs text-gray-300 font-semibold"
                >
                    {t("To")}
                </Text>

                {/*    HR line  */}
                <View className="border-b-2 border-gray-300 mb-2 -mt-1 z-50 mx-4 " />

                {/* From Select*/}
                <DropDownPicker
                    listMode="MODAL"
                    modalAnimationType="slide"
                    showArrowIcon={false}
                    searchable={true}
                    searchPlaceholder={t("Search Location") as string}
                    placeholder={t("Your Location") as string}
                    textStyle={{
                        color: "gray",
                        fontWeight: "500",
                        fontFamily: "RalewayRegular",
                        textTransform: "capitalize",
                    }}
                    style={{
                        borderColor: "white",
                    }}
                    dropDownContainerStyle={{
                        borderColor: "white",
                        marginTop: 4,
                        zIndex: 50,
                    }}
                    searchContainerStyle={{
                        borderBottomColor: "white",
                    }}
                    searchTextInputStyle={{
                        borderColor: "white",
                        borderRadius: 0,
                        borderBottomColor: "gray",
                    }}
                    labelStyle={{
                        textTransform: "capitalize",
                    }}
                    listItemLabelStyle={{
                        textTransform: "capitalize",
                    }}
                    open={openCurrentLoc}
                    setOpen={setOpenCurrentLoc}
                    value={currLoc}
                    items={items}
                    onSelectItem={(e) => {
                        setCurrLoc(e.value)
                    }}
                />
                {/* From text */}
                <Text
                    style={{ fontFamily: "RalewayRegular" }}
                    className="pl-2  -mb-4 text-xs text-gray-300 font-semibold "
                >
                    {t("From")}
                </Text>
            </View>

            {/*    Swap Icons  */}
            <TouchableOpacity
                onPress={handleSwap}
                className="p-2 rounded-xl bg-gray-200"
            >
                <AntDesign name="swap" size={SIZE.md} color="gray" />
            </TouchableOpacity>
        </View>
    )
}

export default LocationBox
