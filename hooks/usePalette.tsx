import * as React from "react";
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
    const paletteContext = React.useContext(PaletteContext);
    return [paletteContext.palette, paletteContext.setPalette];
}

export const PaletteContext = React.createContext({
    palette: {} as any,
    setPalette: (newTheme: Palette) => { }
});

export function PaletteProvider(props: { children: React.ReactNode }) {
    const [palette, setPalette] = useStorage<Palette>("palette", DEFAULT_PALETTE);
    const [version, setVersion] = React.useState(0);

    const setPaletteFromContext = (newPalette: Palette) => {
        setPalette(newPalette);
        setVersion(v => v + 1);
    }

    return (
        <PaletteContext.Provider value={{ palette, setPalette: setPaletteFromContext }}>
            {props.children}
        </PaletteContext.Provider>
    )
}