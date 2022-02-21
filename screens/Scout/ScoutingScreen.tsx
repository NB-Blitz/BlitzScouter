import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/common/Button';
import ScoutingElement from '../../components/elements/ScoutingElement';
import Subtitle from '../../components/text/Subtitle';
import Text from '../../components/text/Text';
import Title from '../../components/text/Title';
import { usePalette } from '../../hooks/usePalette';
import useScoutingData, { getScoutingData, setScoutingData } from '../../hooks/useScoutingData';
import useTeam from '../../hooks/useTeam';
import useTemplate from '../../hooks/useTemplate';
import { ElementData, ScoutingData } from '../../types/TemplateTypes';

export default function ScoutingScreen({ route }: any) {
    const navigator = useNavigation();
    const [scoutingData, setScoutingDataHook] = useScoutingData();
    const [template] = useTemplate(route.params.templateType);
    const [team] = useTeam(route.params.teamID);
    const [palette] = usePalette();

    const onChange = (element: ElementData) => {
        const index = template.findIndex(e => e.id === element.id);
        if (index >= 0)
            template[index] = element;
    }
    const onSubmit = () => {
        let data: ScoutingData = {
            teamID: route.params.teamID,
            matchID: route.params.matchID,
            values: []
        };
        for (let element of template) {
            if (element.value !== undefined)
                data.values.push(element.value);
        }
        scoutingData.push(data);
        setScoutingDataHook(scoutingData);

        navigator.goBack();
        navigator.goBack();
        Alert.alert("Success", "Data has been saved to storage", [
            {
                text: "Undo",
                onPress: () => {
                    Alert.alert("Are you sure?", "This will delete last round's scouting data", [
                        {
                            text: "Confirm",
                            onPress: async () => {
                                const data = await getScoutingData();
                                if (data) {
                                    data.splice(scoutingData.length - 1, 1);
                                    setScoutingData(scoutingData);
                                }
                                Alert.alert("Success!", "Last round's scouting data has been cleared");
                            }
                        },
                        {
                            text: "Cancel",
                            style: "cancel"
                        }
                    ], { cancelable: true });
                }
            },
            {
                text: "OK",
                style: "cancel"
            }
        ], { cancelable: true });
    }

    // Media

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    {team.mediaPaths.length > 0 ?
                        <Button
                            style={styles.thumbnail}
                            onPress={() => { navigator.navigate("Media", { mediaPath: team.mediaPaths[team.mediaPaths.length - 1] }) }}>
                            <Image
                                style={styles.thumbnail}
                                source={{ uri: team.mediaPaths[team.mediaPaths.length - 1] }}
                                key={team.id + "-" + (team.mediaPaths.length - 1)} />
                        </Button>
                        : null}
                    <View style={{ alignSelf: "center", marginLeft: 10 }}>
                        <Title style={{ margin: 0 }}>{team.number}</Title>
                        <Subtitle>{team.name}</Subtitle>
                    </View>
                </View>


                {template.map((element, index) =>
                    <ScoutingElement
                        data={element}
                        isEditable={false}
                        key={index}
                        onChange={onChange} />
                )}

                <Button
                    style={[styles.submitButton, { backgroundColor: palette.navigationSelected }]}
                    onPress={onSubmit}>

                    <Text style={[styles.buttonText, { color: palette.navigationTextSelected }]}>Submit</Text>

                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    submitButton: {
        height: 40,
        borderRadius: 5,
        padding: 10,
        margin: 10,
        marginTop: 30
    },
    buttonText: {
        fontWeight: "bold"
    },
    thumbnail: {
        height: 80,
        width: 80,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
    },
});