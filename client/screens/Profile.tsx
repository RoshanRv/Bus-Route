import React, { useEffect, useState } from "react"
import {
    Image,
    View,
    FlatList,
    Text,
    TouchableOpacity,
    Switch,
} from "react-native"
import Background from "../components/Background"
import { Ionicons, Entypo, Fontisto } from "@expo/vector-icons"
import { COLORS, SIZE } from "../utils/styles"
import "../assets/i18n/i18n"
import { useTranslation } from "react-i18next"
import useLanguage from "../store/useLanguage"
import { shallow } from "zustand/shallow"
import AsyncStorage from "@react-native-async-storage/async-storage"
import DropDownPicker from "react-native-dropdown-picker"
import { buses } from "../utils/datas"
import sendPushNotification from "../utils/sendNotification"
import useLocation from "../store/useLocation"

type Props = {}

const Profile = ({}: Props) => {
    const { t, i18n } = useTranslation()

    const { switchLang, lang } = useLanguage(
        (state) => ({
            switchLang: state.switchLang,
            lang: state.lang,
        }),
        shallow
    )

    const [openRegular, setOpenReguler] = useState(false)
    const [regularBuses, setRegularBuses] = useState<any>([])
    const { city, icon, temp, weather } = useLocation(
        ({ city, icon, temp, weather }) => ({
            city,
            icon,
            temp,
            weather,
        }),
        shallow
    )

    const handleChange = async () => {
        console.log(regularBuses)
        try {
            await AsyncStorage.setItem(
                "regular-buses",
                JSON.stringify(regularBuses)
            )
        } catch (e) {
            console.log(e)
        }
    }

    const getData = async () => {
        try {
            let jsonValue = await AsyncStorage.getItem("regular-buses")
            jsonValue = jsonValue ? JSON.parse(jsonValue) : null
            console.log({ jsonValue })
            setRegularBuses(jsonValue ? jsonValue : [])
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <View className="flex flex-col flex-1  ">
            <Background>
                <View className="flex flex-row justify-between mb-4 items-center ">
                    {/*   Go Back   */}
                    <Text />
                    {/*    Title  */}
                    <Text
                        style={{ fontFamily: "RalewayBold" }}
                        className="text-white text-lg"
                    >
                        {t("Settings")}
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
                {/*           Weather        */}
                <View className="bg-white p-3 shadow-lg shadow-black w-[85%] mt-4  mx-auto  rounded-lg">
                    <Text
                        className="text-center"
                        style={{
                            fontFamily: "RalewayRegular",
                        }}
                    >
                        {city}
                    </Text>
                    <View className="flex flex-row justify-around items-center w-full">
                        <Image
                            className=" w-20 h-20 "
                            source={{
                                uri: `https:${icon}`,
                            }}
                        />
                        <View>
                            <Text
                                className="text-3xl"
                                style={{
                                    fontFamily: "RalewayBold",
                                    color: COLORS.blue,
                                }}
                            >{`${temp} C`}</Text>
                            <Text
                                style={{
                                    fontFamily: "RalewayRegular",
                                }}
                                className="text-center"
                            >
                                {weather}
                            </Text>
                        </View>
                    </View>
                </View>
                {/*   Settings  - LANGUAGE */}
                <View className="bg-white p-3 shadow-lg shadow-black/50 rounded-lg mx-8 mt-6 text-center">
                    <View className="w-max mx-auto mb-2">
                        <Entypo
                            className=""
                            name="language"
                            size={30}
                            color="black"
                        />
                    </View>
                    <Text
                        style={{ fontFamily: "RalewayRegular" }}
                        className="text-xl w-max mx-auto"
                    >
                        {t("Language")}
                    </Text>

                    <View className="flex flex-row gap-x-4 items-center justify-around mt-6">
                        <Text
                            style={{ fontFamily: "RalewayRegular" }}
                            className="text-xl"
                        >
                            {"தமிழ்"}
                        </Text>
                        <Switch
                            className="scale-110"
                            trackColor={{
                                false: COLORS.blue,
                                true: COLORS.violet,
                            }}
                            thumbColor={COLORS.red}
                            value={lang === "en" ? true : false}
                            onChange={switchLang}
                        />
                        <Text
                            style={{ fontFamily: "RalewayRegular" }}
                            className="text-xl"
                        >
                            {"English"}
                        </Text>
                    </View>
                </View>
                {/*     Store Fav Buses     */}
                <View className="bg-white p-3 shadow-lg shadow-black/50 rounded-lg mx-8 mt-10 text-center">
                    <View className="w-max mx-auto mb-2 flex flex-row  items-center  ">
                        <View className="w-max pr-4">
                            <Entypo
                                name="bookmark"
                                size={30}
                                color={COLORS.orange}
                            />
                        </View>
                        <Text
                            style={{ fontFamily: "RalewayRegular" }}
                            className="text-xl w-max "
                        >
                            {t("Regular Buses")}
                        </Text>
                    </View>
                    <DropDownPicker
                        listMode="MODAL"
                        modalAnimationType="slide"
                        bottomOffset={10}
                        dropDownDirection="BOTTOM"
                        modalTitle={t("Select Bus") as string}
                        placeholder={t("Select Bus") as string}
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
                        multiple
                        open={openRegular}
                        setOpen={setOpenReguler}
                        value={regularBuses}
                        setValue={setRegularBuses}
                        onChangeValue={handleChange}
                        items={buses}
                    />
                </View>
                {/*    Gridsss  */}
                <View style={{}} className="mx-3 mt-4">
                    <FlatList
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        data={regularBuses}
                        renderItem={({ index, item }) => (
                            <View
                                style={{
                                    shadowColor: "gray",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.22,
                                    shadowRadius: 2.22,

                                    elevation: 3,
                                }}
                                key={index}
                                className="p-3 rounded-md my-1 bg-white flex flex-row w-max mx-auto"
                            >
                                <Fontisto
                                    name="bus"
                                    size={28}
                                    color={COLORS.violet}
                                />
                                <Text
                                    className="pl-5 text-xl"
                                    style={{ fontFamily: "RalewayRegular" }}
                                >
                                    {item}
                                </Text>
                            </View>
                        )}
                    />
                </View>
            </Background>
        </View>
    )
}

export default Profile
