import { create } from "zustand"

type Coords = {
    latitude: number | null
    longitude: number | null
}

export interface HolidayProps {
    items: {
        summary: string
        start: {
            date: string
        }
    }[]
}

interface Props {
    coords: Coords
    temp: number | null
    weather: string | null
    icon: string | null
    city: string | null
    holidays: HolidayProps["items"] | []
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
    updateHolidays: (holidays: HolidayProps["items"]) => void
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
    holidays: [],

    updateCoords: (coords) => set({ coords }),
    updateWeather: ({ temp, weather, icon, city }) =>
        set({
            temp,
            weather,
            icon,
            city,
        }),
    updateHolidays: (holidays) => set({ holidays }),
}))

export default useLocation
