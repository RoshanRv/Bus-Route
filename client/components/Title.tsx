import { View, Text, TextProps } from "react-native"
import React, { ReactNode } from "react"

interface Props extends TextProps {
    children: ReactNode
}

export const LightTitle = ({ children, ...props }: Props) => {
    return (
        <Text style={{ fontFamily: "RalewayLight" }} {...props}>
            {children}
        </Text>
    )
}

export const RegularTitle = ({ children, ...props }: Props) => {
    return (
        <Text style={{ fontFamily: "RalewayRegular" }} {...props}>
            {children}
        </Text>
    )
}

export const BoldTitle = ({ children, ...props }: Props) => {
    return (
        <Text style={{ fontFamily: "RalewayBold" }} {...props}>
            {children}
        </Text>
    )
}
