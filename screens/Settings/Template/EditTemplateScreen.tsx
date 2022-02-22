import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert, StyleSheet, Vibration, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../../components/common/Button';
import ScoutingElement from '../../../components/elements/ScoutingElement';
import Subtitle from '../../../components/text/Subtitle';
import Text from '../../../components/text/Text';
import Title from '../../../components/text/Title';
import { usePalette } from '../../../hooks/usePalette';
import useTemplate from '../../../hooks/useTemplate';
import { ElementData } from '../../../types/TemplateTypes';

export default function EditTemplateScreen({ route }: any) {
    const [palette] = usePalette();
    const navigator = useNavigation();
    const [template, setTemplate] = useTemplate();

    // Delete Event
    const onDeleteEvent = () => {
        Alert.alert("Are you sure?", "This will wipe this entire template from your device. Are you sure you want to continue?", [{
            text: "Confirm",
            onPress: () => {
                setTemplate([]);
            }
        },
        { text: "Cancel", style: "cancel" }], { cancelable: true });
    };

    const onRemove = (element: ElementData) => {
        const newTemplate = template.filter((e) => e.id !== element.id);
        setTemplate(newTemplate);
    }
    const onMove = (element: ElementData, delta: number) => {
        const index = template.findIndex((e) => e.id === element.id);
        const newIndex = index + delta;
        if (newIndex < 0 || newIndex >= template.length) {
            Vibration.vibrate(10);
            return;
        }

        const temp = template[newIndex];
        template[newIndex] = template[index];
        template[index] = temp;
        setTemplate(template);
    }
    const onUp = (element: ElementData) => {
        onMove(element, -1);
    }
    const onDown = (element: ElementData) => {
        onMove(element, 1);
    }

    // Edit Event
    const onChange = (element: ElementData) => {
        const index = template.findIndex(e => e.id === element.id);
        if (index >= 0) {
            template[index] = element;
            setTemplate(template);
        }
    }

    // Delete Button
    React.useLayoutEffect(() => {
        navigator.setOptions({
            headerRight: () => (
                <Button onPress={onDeleteEvent} style={styles.trashButton}>
                    <MaterialIcons name="delete-outline" size={25} color={palette.textPrimary} />
                </Button>
            )
        });
    });

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                    <Title>Edit Template</Title>
                    <Subtitle>Match Scouting</Subtitle>

                    {template.length <= 0 ? <Text key={"0"}>There are no elements yet. Add an element to scout below.</Text> : undefined}
                </View>

                {template.map(element =>
                    <ScoutingElement
                        data={element}
                        isEditable={true}
                        onChange={onChange}
                        onRemove={onRemove}
                        onUp={onUp}
                        onDown={onDown}
                        key={element.id} />
                )}

                <View style={{ height: 150 }} />
            </ScrollView>

            <Button
                style={[styles.addButton, { backgroundColor: palette.navigationSelected }]}
                onPress={() => { navigator.navigate("ElementChooser"); }}>

                <MaterialIcons name="add" size={30} style={{ color: palette.navigationTextSelected }} />

            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    trashButton: {
        alignSelf: "flex-end",
        margin: 11
    },
    addButton: {
        height: 50,
        width: 50,
        borderRadius: 5,

        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: 'stretch',

        position: "absolute",
        bottom: 40,
        right: 25,
        padding: 10,
    }
});