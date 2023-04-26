import { create } from "zustand"

type Coords = {
    latitude: number | null
    longitude: number | null
}

interface Props {
    coords: Coords
    temp: number | null
    weather: string | null
    icon: string | null
    city: string | null
    updateCoords: (coords: Coords) => void
    updateWeather: ({
        temp,
        weather,
        icon,
        city,
    }: {
        temp: number
        weather: string
        icon: string
        city: string
    }) => void
}

const useLocation = create<Props>((set) => ({
    coords: {
        latitude: null,
        longitude: null,
    },
    city: null,
    icon: null,
    temp: null,
    weather: null,

    updateCoords: (coords) => set({ coords }),
    updateWeather: ({ temp, weather, icon, city }) =>
        set({
            temp,
            weather,
            icon,
            city,
        }),
}))

export default useLocation
