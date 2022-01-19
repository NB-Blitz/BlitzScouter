import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "../../components/common/Button";
import HorizontalBar from "../../components/common/HorizontalBar";
import ScrollContainer from "../../components/containers/ScrollContainer";
import Text from "../../components/text/Text";
import Title from "../../components/text/Title";
import { PaletteContext } from "../../context/PaletteContext";

export function ColorPickerScreen({ route }: any) {
    const paletteContext = React.useContext(PaletteContext);
    const [color, setColor] = React.useState(route.params.defaultColor);
    const navigator = useNavigation();
    const onPick = route.params.onPick as (color: string) => void;

    const onSubmit = () => {
        onPick(color);
        navigator.goBack();
    }

    return (
        <ScrollContainer>
            <Title>Color Picker</Title>
            <HorizontalBar />
            <TextInput
                key={"color-picker"}
                placeholder="#000000"
                placeholderTextColor={paletteContext.palette.textSecondary}
                value={color}
                style={[styles.textInput, { color: paletteContext.palette.textPrimary, backgroundColor: paletteContext.palette.button }]}
                onChangeText={setColor}
            />

            <Button onPress={onSubmit} style={[styles.button, { backgroundColor: paletteContext.palette.navigationSelected }]}>
                <Text>Done</Text>
            </Button>

            <HorizontalBar />

            <View style={{ width: "100%", height: 100, borderRadius: 5, backgroundColor: color }} />
        </ScrollContainer>
    );
}

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        marginTop: 5,
        borderRadius: 5
    }
});