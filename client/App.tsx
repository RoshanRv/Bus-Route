import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "./screens/Home"
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons"
import { COLORS, SIZE } from "./utils/styles"
import { useFonts } from "expo-font"
import Routes from "./screens/Route"
import Profile from "./screens/Profile"
import BusDetails from "./screens/BusDetails"

export default function App() {
    const Stack = createNativeStackNavigator()
    const Tab = createBottomTabNavigator()

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
                                size={SIZE.lg}
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
                            <AntDesign
                                name="home"
                                className="bg-emerald-500"
                                size={SIZE.lg}
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
                            <Ionicons
                                name="settings"
                                size={SIZE.lg}
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
