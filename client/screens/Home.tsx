import {
    View,
    Text,
    ImageBackground,
    Image,
    Button,
    TouchableOpacity,
    ImageComponent,
} from "react-native"
import React, { useState } from "react"
import {
    Route,
    NavigationAction,
    NavigationProp,
} from "@react-navigation/native"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import Background from "../components/Background"
import LocationBox from "../components/LocationBox"
import { COLORS, SIZE } from "../utils/styles"
import Filters from "../components/Filters"
import BusType from "../components/BusType"
import { BoldTitle } from "../components/Title"
import Time from "../components/Time"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SearchBus from "./SearchBus"
import Routes from "./Route"

type Props = {
    navigation: any
}

const Home = ({ navigation }: Props) => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: "slide_from_left",
            }}
            initialRouteName="SearchBus"
        >
            <Stack.Screen name="SearchBus" component={SearchBus} />
            <Stack.Screen name="Route" component={Routes} />
        </Stack.Navigator>
    )
}

export default Home
