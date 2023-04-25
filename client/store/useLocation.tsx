import { create } from "zustand"

type Coords = {
    latitude: string | null
    longitude: string | null
}

interface Props {
    coords: Coords
    upadteCoords: (coords: Coords) => void
}

const useLanguage = create<Props>((set) => ({
    coords: {
        latitude: null,
        longitude: null,
    },
    upadteCoords: (coords) =>
        set((state) => ({ lang: state.lang === "en" ? "ta" : "en" })),
}))

export default useLanguage
