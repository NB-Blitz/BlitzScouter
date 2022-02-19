import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { fromHsv, TriangleColorPicker } from 'react-native-color-picker';
import { HsvColor } from "react-native-color-picker/dist/typeHelpers";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../components/common/Button";
import Subtitle from "../../components/text/Subtitle";
import Text from "../../components/text/Text";
import Title from "../../components/text/Title";
import { PaletteContext } from "../../context/PaletteContext";

export function ColorPickerScreen({ route }: any) {
    const paletteContext = React.useContext(PaletteContext);
    const [color, setColor] = React.useState(route.params.defaultColor);
    const [pickerColor, setPickerColor] = React.useState(route.params.defaultColor);
    const navigator = useNavigation();
    const onPick = route.params.onPick as (color: string) => void;

    const onSubmit = () => {
        onPick(color);
        navigator.goBack();
    }

    const onHexChange = (hex: string) => {
        setColor(hex);
        setPickerColor(hex);
    }

    const onPickerChange = (newColor: HsvColor) => {
        setColor(fromHsv(newColor));
        setPickerColor(newColor);
    }

    return (
        <ScrollView style={styles.container}>
            <Title>Color Picker</Title>
            <Subtitle>Pick a color, any color</Subtitle>
            <TextInput
                key={"color-picker"}
                placeholder="#000000"
                placeholderTextColor={paletteContext.palette.textSecondary}
                value={color}
                style={[styles.textInput, { color: paletteContext.palette.textPrimary, backgroundColor: paletteContext.palette.button }]}
                onChangeText={onHexChange}
            />

            <TriangleColorPicker
                onColorChange={onPickerChange}
                style={styles.colorPicker}
                defaultColor={route.params.defaultColor}
                color={pickerColor}
                hideControls={true}
            />

            <Button onPress={onSubmit} style={[styles.button, { backgroundColor: paletteContext.palette.navigationSelected }]}>
                <Text>Done</Text>
            </Button>

            <View style={{ width: "100%", height: 100, borderRadius: 5, marginTop: 15, backgroundColor: color }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    textInput: {
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        marginTop: 5,
        borderRadius: 5
    },
    colorPicker: {
        width: "100%",
        aspectRatio: 1
    }
});