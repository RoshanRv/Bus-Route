import { View, Text, StatusBar } from "react-native"
import React from "react"
import MapView from "react-native-maps"
import { WebView } from "react-native-webview"

type Props = {}

const BusStop = (props: Props) => {
    return (
        <View className="mt-8" style={{ flex: 1 }}>
            {/* <StatusBar backgroundColor={"black"} />
            <MapView
                initialRegion={{
                    latitude: 9.894821,
                    longitude: 78.119921,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                className="h-full w-full"
            /> */}
            <WebView
                geolocationEnabled={true}
                // style={styles.container}
                source={{
                    uri: "https://www.google.com/search?tbs=lf:1,lf_ui:8&tbm=lcl&sxsrf=APwXEdcg7mcZiJKPKIYQBrKkxIKJ5_lV-g:1680200480886&q=bus+stops+near+me&rflfq=1&num=10&sa=X&ved=2ahUKEwjW9sHGooT-AhUyxzgGHbmdA8AQjGp6BAgbEAE&biw=1920&bih=973&dpr=1",
                }}
            />
        </View>
    )
}

export default BusStop
