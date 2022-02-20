import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Alert, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../components/common/Button";
import StandardButton from "../../components/common/StandardButton";
import Subtitle from "../../components/text/Subtitle";
import Title from "../../components/text/Title";
import { DEFAULT_PALETTE, usePalette } from "../../hooks/usePalette";

export function PaletteScreen() {
    const navigator = useNavigation();
    const [palette, setPalette] = usePalette();

    const promptForColor = (swatch: string) => {
        navigator.navigate("ColorPicker", {
            defaultColor: (palette as any)[swatch],
            onPick: (color: string) => {
                (palette as any)[swatch] = color;
                setPalette(palette);
            }
        });
    }

    const resetPalette = () => {
        Alert.alert("Are you sure?", "This will reset the color palette to default.",
            [
                {
                    text: "Confirm",
                    onPress: () => {
                        setPalette(DEFAULT_PALETTE);
                        Alert.alert("Success!", "Color palette has been reset!");
                    }
                },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ], { cancelable: true }
        );

    }

    // Reset Button
    React.useLayoutEffect(() => {
        navigator.setOptions({
            headerRight: () => (
                <Button onPress={resetPalette} style={styles.resetButton}>
                    <MaterialIcons name="delete-outline" size={25} color={palette.textPrimary} />
                </Button>
            )
        });
    });

    return (
        <ScrollView style={styles.container}>
            <Title>Color Palette</Title>
            <Subtitle>Change the color palette to match your team</Subtitle>

            <StandardButton
                iconColor={palette.background}
                title="Background"
                subtitle="Used globally"
                onPress={() => { promptForColor("background"); }}
            />
            <StandardButton
                iconColor={palette.button}
                title="Button Background"
                subtitle="Used for most buttons"
                onPress={() => { promptForColor("button"); }}
            />
            <StandardButton
                iconColor={palette.navigation}
                title="Nav Background"
                subtitle="BG for nav bar"
                onPress={() => { promptForColor("navigation"); }}
            />
            <StandardButton
                iconColor={palette.navigationSelected}
                title="Nav Selected Background"
                subtitle="BG for nav bar"
                onPress={() => { promptForColor("navigationSelected"); }}
            />
            <StandardButton
                iconColor={palette.navigationText}
                title="Nav Text"
                subtitle="Title/Icon for nav bar"
                onPress={() => { promptForColor("navigationText"); }}
            />
            <StandardButton
                iconColor={palette.navigationTextSelected}
                title="Nav Selected Text"
                subtitle="Title/Icon for selected nav bar"
                onPress={() => { promptForColor("navigationTextSelected"); }}
            />
            <StandardButton
                iconColor={palette.textPrimary}
                title="Primary Text"
                subtitle="Used globally for titles"
                onPress={() => { promptForColor("textPrimary"); }}
            />
            <StandardButton
                iconColor={palette.textSecondary}
                title="Secondary Text"
                subtitle="Used globally for subtitles"
                onPress={() => { promptForColor("textSecondary"); }}
            />

            <StandardButton
                iconColor={palette.innerBox}
                title="Inner Box"
                subtitle="Textbox and chart backgrounds"
                onPress={() => { promptForColor("innerBox"); }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    resetButton: {
        alignSelf: "flex-end",
        margin: 11
    }
})