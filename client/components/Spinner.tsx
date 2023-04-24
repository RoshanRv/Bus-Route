import { ActivityIndicator } from "react-native"
import { View, Text } from "react-native"
import { COLORS } from "../utils/styles"

type Props = {
    color?: string
}

const Spinner = ({ color = "white" }: Props) => {
    return (
        <View className="w-max my-10  mx-auto">
            <ActivityIndicator
                className="scale-[1.7]  "
                size={"large"}
                animating={true}
                color={color}
            />
        </View>
    )
}

export default Spinner
