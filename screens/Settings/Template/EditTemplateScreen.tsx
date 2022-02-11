import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../../components/common/Button';
import ScoutingElement from '../../../components/elements/ScoutingElement';
import Subtitle from '../../../components/text/Subtitle';
import Text from '../../../components/text/Text';
import Title from '../../../components/text/Title';
import { PaletteContext } from '../../../context/PaletteContext';
import useTemplate from '../../../hooks/useTemplate';
import { ElementData, TemplateType } from '../../../types/TemplateTypes';

const TEMPLATE_NAMES = ["Pit", "Match"];

export default function EditTemplateScreen({ route }: any) {
    const paletteContext = React.useContext(PaletteContext);
    const navigator = useNavigation();
    const templateType = route.params.templateType as TemplateType;
    const [template, setTemplate] = useTemplate(templateType);

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
                    <MaterialIcons name="delete-outline" size={25} color={paletteContext.palette.textPrimary} />
                </Button>
            )
        });
    });

    return (
        <View style={styles.container}>
            <ScrollView>
                <Title>Edit Template</Title>
                <Subtitle>{TEMPLATE_NAMES[templateType]} Scouting</Subtitle>

                {template.length > 0 ? template.map(element =>
                    <ScoutingElement
                        data={element}
                        isEditable={true}
                        onChange={onChange}
                        onRemove={onRemove}
                        key={element.id} />
                ) :
                    <Text key={"0"}>There are no elements yet. Add an element to scout below.</Text>
                }

                <View style={{ height: 150 }} />

            </ScrollView>

            <Button
                style={[styles.addButton, { backgroundColor: paletteContext.palette.navigationSelected }]}
                onPress={() => { navigator.navigate("ElementChooser", { templateType: templateType }); }}>

                <MaterialIcons name="add" size={30} style={{ color: paletteContext.palette.navigationTextSelected }} />

            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
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