import { create } from "zustand"

interface Props {
    lang: "ta" | "en"
    switchLang: () => void
}

const useLanguage = create<Props>((set) => ({
    lang: "en",
    switchLang: () =>
        set((state) => ({ lang: state.lang === "en" ? "ta" : "en" })),
}))

export default useLanguage
