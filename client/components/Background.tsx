import { View, Text, ImageBackground } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"

import React, { ReactNode } from "react"

type Props = {
    children: ReactNode
}

const Background = ({ children }: Props) => {
    return (
        <SafeAreaProvider className="flex flex-1">
            <ImageBackground
                source={require("../assets/bg.png")}
                resizeMode="cover"
                className="flex flex-1 h-full w-full  scale-y-105"
            >
                <View className="w-full pt-12 px-2 ">{children}</View>
            </ImageBackground>
        </SafeAreaProvider>
    )
}

export default Background
