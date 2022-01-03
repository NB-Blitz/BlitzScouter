import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BlitzDB from '../../../api/BlitzDB';
import { ElementData } from '../../../api/models/TemplateModels';
import HorizontalBar from '../../../components/common/HorizontalBar';
import ScrollContainer from '../../../components/containers/ScrollContainer';
import ScoutingElement from '../../../components/elements/ScoutingElement';
import Subtitle from '../../../components/text/Subtitle';
import Text from '../../../components/text/Text';
import Title from '../../../components/text/Title';

export default function EditTemplateScreen({ route }: any) {
    const [version, setVersion] = React.useState(0);
    const navigator = useNavigation();
    const templateType = route.params.type;

    // Element Preview
    const stringType = BlitzDB.templates.getTemplateString(templateType);
    const template: ElementData[] = BlitzDB.templates.getTemplate(templateType);
    let elementList: JSX.Element[] = [];
    if (template.length > 0) {
        for (let elementData of template) {
            elementList.push(
                <ScoutingElement data={elementData} key={Math.random()} />
            );
        }
    }
    else {
        elementList.push(<Text key={"0"}>There are no elements yet. Add an element to scout below.</Text>);
    }

    // Clear Behaviour
    const clearTemplate = () => {
        Alert.alert("Are you sure?", "This will delete all elements in this template. Are you sure you want to continue?",
            [
                {
                    text: "Confirm",
                    onPress: () => {
                        //BlitzDB.templates[props.type] = [];
                        setVersion(version + 1);
                    }
                },
                { text: "Cancel", style: "cancel" }
            ], { cancelable: true }
        );
    }

    return (
        <View style={styles.parentView}>
            <ScrollContainer>

                <Title>Edit Template</Title>
                <Subtitle>{stringType} Scouting</Subtitle>

                <HorizontalBar />

                {elementList}

                <HorizontalBar />

            </ScrollContainer>

            <View style={styles.addButton}>
                <TouchableOpacity onPress={() => { navigator.navigate("ElementChooser", { type: templateType }); }}>
                    <MaterialIcons name="add" size={30} style={{ color: "#000000" }} />
                </TouchableOpacity>
            </View>
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