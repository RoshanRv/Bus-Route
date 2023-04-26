import { StatusBar } from "expo-status-bar"
import { useEffect, useRef, useState } from "react"
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "./screens/Home"
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import {
    AntDesign,
    Ionicons,
    FontAwesome,
    MaterialCommunityIcons,
} from "@expo/vector-icons"
import { COLORS, SIZE } from "./utils/styles"
import { useFonts } from "expo-font"
import Routes from "./screens/Route"
import Profile from "./screens/Profile"
import BusDetails from "./screens/BusDetails"

import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import BusStop from "./screens/BusStop"
import Breakdown from "./screens/Breakdown"

import * as Location from "expo-location"
import useLocation from "./store/useLocation"
import axios from "axios"
import { shallow } from "zustand/shallow"

export interface WeatherProps {
    current: {
        cloud: number
        condition: {
            icon: string
            text: string
        }
        humidity: number
        is_day: 0 | 1
        temp_c: number
    }
    location: {
        name: string
        region: string
    }
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
})

// Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken: string) {
    const message = {
        to: expoPushToken,
        sound: "default",
        title: "52 A - Bus",
        body: "52 A will arrive in 5 min",
        data: { someData: "goes here" },
    }

    await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    })
}

async function registerForPushNotificationsAsync() {
    let token
    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!")
            return
        }
        token = (await Notifications.getExpoPushTokenAsync()).data
        console.log(token)
    } else {
        alert("Must use physical device for Push Notifications")
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        })
    }

    return token
}

export default function App() {
    const Stack = createNativeStackNavigator()
    const Tab = createBottomTabNavigator()

    const [expoPushToken, setExpoPushToken] = useState<any>("")
    const [notification, setNotification] = useState<any>(false)
    const notificationListener = useRef<any>()
    const responseListener = useRef<any>()

    console.log(expoPushToken)

    useEffect(() => {
        // if (notificationListener.current) {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        )

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification)
            })

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(response)
                }
            )
        // }

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            )
            Notifications.removeNotificationSubscription(
                responseListener.current
            )
        }
    }, [])

    const { updateCoords, updateWeather } = useLocation(
        (state) => ({
            updateCoords: state.updateCoords,
            updateWeather: state.updateWeather,
        }),
        shallow
    )

    useEffect(() => {
        ;(async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== "granted") {
            }
            let {
                coords: { latitude, longitude },
            } = await Location.getCurrentPositionAsync({})
            updateCoords({
                latitude,
                longitude,
            })

            const { data } = await axios.get<WeatherProps>(
                "https://weatherapi-com.p.rapidapi.com/current.json",
                {
                    params: { q: `${latitude},${longitude}` },
                    headers: {
                        "X-RapidAPI-Key":
                            "6b7d2d8110mshbf6b400bc432cf7p13576ejsn10d6dacaf0c2",
                    },
                }
            )
            updateWeather({
                city: data.location.name,
                icon: data.current.condition.icon,
                temp: data.current.temp_c,
                weather: data.current.condition.text,
            })
        })()
    }, [])

    const [loaded] = useFonts({
        InterBold: require("./assets/fonts/Inter-Bold.ttf"),
        InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
        // InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
        InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
        // InterLight: require("./assets/fonts/Inter-Light.ttf"),
        RalewayLight: require("./assets/fonts/Raleway-Regular.ttf"),
        RalewayRegular: require("./assets/fonts/Raleway-SemiBold.ttf"),
        RalewayBold: require("./assets/fonts/Raleway-Bold.ttf"),
    })

    if (!loaded) return null

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: COLORS.green,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        borderTopColor: "transparent",
                        shadowColor: "transparent",
                    },
                }}
            >
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name="bus"
                                size={SIZE.md}
                                color={focused ? color : "gray"}
                            />
                        ),
                    }}
                    name="Stops"
                    component={BusDetails}
                />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialCommunityIcons
                                name="bus-alert"
                                size={SIZE.md}
                                color={focused ? color : "gray"}
                            />
                        ),
                    }}
                    name="Breakdown"
                    component={Breakdown}
                />

                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <AntDesign
                                name="home"
                                className="bg-emerald-500"
                                size={SIZE.md}
                                color={focused ? color : "gray"}
                            />
                        ),
                    }}
                    name="Home"
                    component={Home}
                />

                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialCommunityIcons
                                name="bus-stop"
                                size={SIZE.lg}
                                color={focused ? color : "gray"}
                            />
                        ),
                    }}
                    name="BusStop"
                    component={BusStop}
                />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name="settings"
                                size={SIZE.md}
                                color={focused ? color : "gray"}
                            />
                        ),
                    }}
                    name="Profile"
                    component={Profile}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
