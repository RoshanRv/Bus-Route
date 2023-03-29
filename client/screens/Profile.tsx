import React from "react"
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    TouchableOpacity,
} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import Background from "../components/Background"
import { Ionicons } from "@expo/vector-icons"
import { SIZE } from "../utils/styles"
import "../assets/i18n/i18n"
import { useTranslation } from "react-i18next"
import { Entypo } from "@expo/vector-icons"
import useLanguage from "../store/useLanguage"

type Props = {}

const Profile = ({}: Props) => {
    const { t, i18n } = useTranslation()

    const switchLang = useLanguage((state) => state.switchLang)

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
                    <TouchableOpacity className="     ">
                        <Ionicons
                            className="w-max ml-auto text-center "
                            color={"white"}
                            name={"notifications"}
                            size={SIZE.sm}
                        />
                    </TouchableOpacity>
                </View>
                {/*   Settings   */}
                <View className="bg-white p-3 shadow-lg shadow-black/50 rounded-lg mx-8 mt-10 text-center">
                    <View className="w-max mx-auto mb-2">
                        <Entypo
                            className=""
                            name="language"
                            size={30}
                            color="black"
                        />
                    </View>
                    <View className="flex flex-row gap-x-4 items-center justify-around w-max mx-auto">
                        <Text className="text-xl w-max mx-auto">
                            {t("Language")}
                        </Text>
                        <Text className="text-xl">
                            {i18n.language === "ta" ? ": தமிழ்" : ": English"}
                        </Text>
                    </View>
                    {/* Switch Btn */}
                    <TouchableOpacity onPress={switchLang}>
                        <Text className="text-lg p-2 px-4 shadow-lg shadow-black/60 mt-4 rounded-full w-max mx-auto bg-emerald-400 text-white">
                            {t("Switch")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Background>
        </View>
    )
}

export default Profile
