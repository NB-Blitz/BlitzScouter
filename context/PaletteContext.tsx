import * as React from 'react';
import { Palette } from '../types/OtherTypes';

export const DARK_PALETTE: Palette = {
    background: "#141416",
    button: "#1b1b1b",
    navigation: "#2d2e30",
    navigationText: "#ffffff",
    navigationSelected: "#c89f00",
    navigationTextSelected: "#000000",
    textPrimary: "#ffffff",
    textSecondary: "#bbbbbb"
};

export const LIGHT_PALETTE: Palette = {
    background: "#ffffff",
    button: "#f7f7f7",
    navigation: "#d0d0d0",
    navigationText: "#000000",
    navigationSelected: "#008bc7",
    navigationTextSelected: "#000000",
    textPrimary: "#111111",
    textSecondary: "#424242"
};

export const PaletteContext = React.createContext({
    palette: {} as any,
    setPalette: (newTheme: Palette) => { }
});

export function PaletteProvider(props: { children: React.ReactNode }) {
    const [palette, setPalette] = React.useState(DARK_PALETTE);
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