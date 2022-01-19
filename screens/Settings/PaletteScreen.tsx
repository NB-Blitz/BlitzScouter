import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import HorizontalBar from "../../components/common/HorizontalBar";
import StandardButton from "../../components/common/StandardButton";
import ScrollContainer from "../../components/containers/ScrollContainer";
import Subtitle from "../../components/text/Subtitle";
import Title from "../../components/text/Title";
import { PaletteContext } from "../../context/PaletteContext";

export function PaletteScreen() {
    const navigator = useNavigation();
    const paletteContext = React.useContext(PaletteContext);

    const promptForColor = (swatch: string) => {
        navigator.navigate("ColorPicker", {
            defaultColor: paletteContext.palette[swatch],
            onPick: (color: string) => {
                paletteContext.palette[swatch] = color;
                paletteContext.setPalette(paletteContext.palette);
            }
        });
    }

    return (
        <ScrollContainer>
            <Title>Color Palette</Title>
            <Subtitle>Change the color palette to match your team</Subtitle>
            <HorizontalBar />

            <StandardButton
                iconColor={paletteContext.palette.background}
                title="Background"
                subtitle="Used globally"
                onPress={() => { promptForColor("background"); }}
            />
            <StandardButton
                iconColor={paletteContext.palette.button}
                title="Button Background"
                subtitle="Used for most buttons"
                onPress={() => { promptForColor("button"); }}
            />
            <StandardButton
                iconColor={paletteContext.palette.navigation}
                title="Nav Background"
                subtitle="BG for nav bar"
                onPress={() => { promptForColor("navigation"); }}
            />
            <StandardButton
                iconColor={paletteContext.palette.navigationSelected}
                title="Nav Selected Background"
                subtitle="BG for nav bar"
                onPress={() => { promptForColor("navigationSelected"); }}
            />
            <StandardButton
                iconColor={paletteContext.palette.navigationText}
                title="Nav Text"
                subtitle="Title/Icon for nav bar"
                onPress={() => { promptForColor("navigationText"); }}
            />
            <StandardButton
                iconColor={paletteContext.palette.navigationTextSelected}
                title="Nav Selected Text"
                subtitle="Title/Icon for selected nav bar"
                onPress={() => { promptForColor("navigationTextSelected"); }}
            />
            <StandardButton
                iconColor={paletteContext.palette.textPrimary}
                title="Primary Text"
                subtitle="Used globally for titles"
                onPress={() => { promptForColor("textPrimary"); }}
            />
            <StandardButton
                iconColor={paletteContext.palette.textSecondary}
                title="Secondary Text"
                subtitle="Used globally for subtitles"
                onPress={() => { promptForColor("textSecondary"); }}
            />
        </ScrollContainer>
    );
}