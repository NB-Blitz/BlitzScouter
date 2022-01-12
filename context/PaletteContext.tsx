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
    button: "#e7e7e7",
    navigation: "#b6b6b6",
    navigationText: "#000000",
    navigationSelected: "#008bc7",
    navigationTextSelected: "#000000",
    textPrimary: "#000000",
    textSecondary: "#424242"
};

export const PaletteContext = React.createContext({
    palette: {} as Palette,
    setPalette: (newTheme: Palette) => { }
});

export function PaletteProvider(props: { children: React.ReactNode }) {
    const [palette, setPalette] = React.useState(DARK_PALETTE);

    return (
        <PaletteContext.Provider value={{ palette, setPalette }}>
            {props.children}
        </PaletteContext.Provider>
    )
}