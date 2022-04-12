import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert, Image, StyleSheet, Vibration, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/common/Button';
import ScoutingElement from '../../components/elements/ScoutingElement';
import Subtitle from '../../components/text/Subtitle';
import Text from '../../components/text/Text';
import Title from '../../components/text/Title';
import useMatch from '../../hooks/useMatch';
import { usePalette } from '../../hooks/usePalette';
import useScoutingData from '../../hooks/useScoutingData';
import useTeam from '../../hooks/useTeam';
import useTemplate from '../../hooks/useTemplate';
import { ElementData, ScoutingData } from '../../types/TemplateTypes';

export default function ScoutingScreen({ route }: any) {
    const navigator = useNavigation();
    const [scoutingData, setScoutingDataHook] = useScoutingData();
    const [template] = useTemplate();
    const [team] = useTeam(route.params.teamID);
    const [match] = useMatch(route.params.matchID);
    const [palette] = usePalette();

    const isRed = match.redTeamIDs.includes(route.params.teamID);

    const onChange = (element: ElementData) => {
        const index = template.findIndex(e => e.id === element.id);
        if (index >= 0)
            template[index] = element;
    }
    const onSubmit = () => {
        Alert.alert("Are you sure?", "This will save your scouting data to local storage. You won't be able to return to this match in the future", [
            {
                text: "Confirm", onPress: () => {
                    const data: ScoutingData = {
                        id: "s_" + route.params.matchID + "_" + route.params.teamID,
                        teamID: route.params.teamID,
                        matchID: route.params.matchID,
                        values: template.map(elem => elem.value).filter(val => val != undefined) as number[]
                    };
                    setScoutingDataHook([...scoutingData, data]);

                    if (navigator.canGoBack())
                        navigator.goBack();
                    if (navigator.canGoBack())
                        navigator.goBack();
                    Vibration.vibrate(200);
                    Alert.alert("Success", "Data has been saved to storage");
                }
            },
            { text: "Cancel", style: "cancel" },
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
                            onPress={() => { navigator.navigate("Media", { mediaPath: team.mediaPaths[0] }) }}>
                            <Image
                                style={styles.thumbnail}
                                source={{ uri: team.mediaPaths[0] }}
                                key={team.id + "-0"} />
                        </Button>
                        : null}
                    <View style={{ alignSelf: "center", marginLeft: 10 }}>
                        <Title style={{ margin: 0 }}>{team.number}</Title>
                        <Subtitle>{team.name}</Subtitle>
                    </View>
                </View>

                <View style={[styles.allianceFooter, { backgroundColor: (isRed ? "#e7311f" : "#008cf1") }]} />


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
        height: 60,
        borderRadius: 5,
        padding: 10,
        margin: 10,
        marginTop: 30,
        justifyContent: "center"
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 20
    },
    thumbnail: {
        height: 80,
        width: 80,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
    },
    allianceFooter: {
        borderRadius: 10,
        height: 10,
        marginTop: 5
    },
});