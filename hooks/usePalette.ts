import { Palette } from "../types/OtherTypes";
import useStorage from "./useStorage";

export const DEFAULT_PALETTE: Palette = {
    background: "#141416",
    button: "#141416",
    navigation: "#2d2e30",
    navigationText: "#ffffff",
    navigationSelected: "#c89f00",
    navigationTextSelected: "#000000",
    textPrimary: "#ffffff",
    textSecondary: "#bbbbbb",
    innerBox: "#1f1f1f"
};

export function usePalette(): [Palette, (newTheme: Palette) => void] {
    const [palette, setPalette] = useStorage<Palette>("palette", DEFAULT_PALETTE);
    return [palette, setPalette];
}