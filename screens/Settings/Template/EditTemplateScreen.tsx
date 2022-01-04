import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import BlitzDB from '../../../api/BlitzDB';
import Button from '../../../components/common/Button';
import HorizontalBar from '../../../components/common/HorizontalBar';
import ScrollContainer from '../../../components/containers/ScrollContainer';
import ScoutingElement from '../../../components/elements/ScoutingElement';
import Subtitle from '../../../components/text/Subtitle';
import Text from '../../../components/text/Text';
import Title from '../../../components/text/Title';

export default function EditTemplateScreen({ route }: any) {
    const templateType = route.params.templateType;
    const template = BlitzDB.matchTemplate.useTemplate();
    const navigator = useNavigation();

    // Delete Event
    const onDeleteEvent = () => {
        Alert.alert("Are you sure?", "This will wipe this entire template from your device. Are you sure you want to continue?", [{
            text: "Confirm",
            onPress: () => {
                BlitzDB.matchTemplate.setTemplate([]);
            }
        },
        { text: "Cancel", style: "cancel" }], { cancelable: true });
    };

    // Delete Button
    React.useLayoutEffect(() => {
        navigator.setOptions({
            headerRight: () => (
                <Button onPress={onDeleteEvent}>
                    <MaterialIcons name="delete-outline" size={25} color={"#ffffff"} />
                </Button>
            )
        });
    });

    // Save on Exit
    React.useEffect(() => {
        navigator.addListener("beforeRemove", (e) => {
            BlitzDB.matchTemplate.save();
        });
    });


    // Element Preview
    let elementList: JSX.Element[] = [];
    if (template.length > 0) {
        elementList = template.map(element => <ScoutingElement data={element} isEditable={true} key={Math.random()} />)
    }
    else {
        elementList = [<Text key={"0"}>There are no elements yet. Add an element to scout below.</Text>];
    }

    return (
        <View style={styles.parentView}>
            <ScrollContainer>
                <Title>Edit Template</Title>
                <Subtitle>Match Scouting</Subtitle>
                <HorizontalBar />

                {elementList}
            </ScrollContainer>

            <Button
                style={styles.addButton}
                onPress={() => { navigator.navigate("ElementChooser", { templateType: templateType }); }}>

                <MaterialIcons name="add" size={30} style={{ color: "#000000" }} />

            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    parentView: {
        height: "100%",
        width: "100%"
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

        backgroundColor: "#c89f00",
        color: "#000000"
    }
});