import { Dispatch, SetStateAction } from "react"
import { create } from "zustand"

interface useSearchDetailsProps {
    currLoc: string | null
    dropLoc: string | null
    busType: string | null
    filter: string | null
    time: string
    setCurrLoc: Dispatch<SetStateAction<any>>
    setDropLoc: Dispatch<SetStateAction<any>>
    setBusType: Dispatch<SetStateAction<any>>
    setFilter: Dispatch<SetStateAction<any>>
    setTime: Dispatch<SetStateAction<any>>
    handleSwap: () => void
}

const useSearchDetails = create<useSearchDetailsProps>((set) => ({
    currLoc: null,
    dropLoc: null,
    busType: null,
    filter: null,
    time: "Now",
    setCurrLoc: (currLoc) => set((state) => ({ currLoc })),
    setDropLoc: (dropLoc) => set({ dropLoc }),
    setBusType: (busType) => set({ busType }),
    setFilter: (filter) => set({ filter }),
    setTime: (time) => set({ time }),
    handleSwap: () =>
        set((state) => ({ currLoc: state.dropLoc, dropLoc: state.currLoc })),
}))

export default useSearchDetails
