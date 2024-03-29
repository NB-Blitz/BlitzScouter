import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { Alert } from 'react-native';
import StandardButton from '../../components/common/StandardButton';
import ScrollContainer from '../../components/containers/ScrollContainer';
import NavTitle from '../../components/text/NavTitle';
import Subtitle from '../../components/text/Subtitle';
import Title from '../../components/text/Title';
import useEvent from '../../hooks/useEvent';
import { getMatch } from '../../hooks/useMatch';
import { setScoutingData } from '../../hooks/useScoutingData';
import { clearStorage } from '../../hooks/useStorage';
import { getTeam } from '../../hooks/useTeam';
import useTemplate from '../../hooks/useTemplate';
import { ScoutingData } from '../../types/TemplateTypes';

export default function SettingsScreen() {
    const navigator = useNavigation();
    const [event] = useEvent();
    const [template] = useTemplate();

    const clearScoutingData = () => {
        Alert.alert("Are you sure?", "This will delete all scouting data on your device.",
            [
                {
                    text: "Confirm",
                    onPress: async () => {
                        await setScoutingData([]);
                        Alert.alert("Success!", "All scouting data has been cleared");
                    }
                },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ], { cancelable: true }
        );
    }

    const clearAllData = () => {
        Alert.alert("Are you sure?", "This will delete all scouting, event, and team data on your device.",
            [
                {
                    text: "Confirm",
                    onPress: async () => {
                        await clearStorage();
                    }
                },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ], { cancelable: true }
        );
    }

    const generateRandomData = async (isConfirmed: boolean) => {
        if (!isConfirmed) {
            Alert.alert("Are you sure?", "This will replace all scouting data on your device.",
                [
                    {
                        text: "Confirm",
                        onPress: async () => {
                            await generateRandomData(true);
                            Alert.alert("Success!", "All scouting data has been randomized");
                        }
                    },
                    {
                        text: "Cancel",
                        style: "cancel"
                    }
                ], { cancelable: true }
            );
        } else {
            const scoutingData: ScoutingData[] = [];
            for (let matchID of event.matchIDs) {
                const match = await getMatch(matchID);

                if (!match)
                    continue;

                const teamIDs = [];
                teamIDs.push(...match.blueTeamIDs);
                teamIDs.push(...match.redTeamIDs);

                for (let teamID of teamIDs) {
                    const team = await getTeam(teamID);
                    if (!team)
                        continue;

                    const values = template.filter(elem => elem.value != undefined).map(() =>
                        Math.round(15 * Math.random() * (1 - ((team.rank / event.teamIDs.length))))
                    );

                    scoutingData.push({
                        id: "s_" + matchID + "_" + teamID,
                        matchID,
                        teamID,
                        values
                    });
                }
            }
            await setScoutingData(scoutingData);
        }
    }

    return (
        <ScrollContainer>

            <NavTitle>Settings</NavTitle>

            <StandardButton
                iconType={"format-paint"}
                title={"Edit Color Palette"}
                subtitle={"Customizes the app's color palette"}
                onPress={() => { navigator.navigate("Palette"); }} />

            {/* Scouting Buttons */}
            <StandardButton
                iconType={"edit"}
                title={"Edit Scouting Template"}
                subtitle={"Adjust the match scouting template"}
                onPress={() => { navigator.navigate("EditTemplate"); }} />

            <StandardButton
                iconType={"info-outline"}
                title={"About"}
                subtitle={"App version and developer details"}
                onPress={() => { navigator.navigate("About"); }} />

            <Title>Danger Zone</Title>
            <Subtitle>Actions here may overwrite your scouting data</Subtitle>

            <StandardButton
                iconType={"shuffle"}
                title={"Scramble Data"}
                subtitle={"Generates Random Data"}
                onPress={() => { generateRandomData(false); }} />

            <StandardButton
                iconType={"location-pin"}
                title={"Change Regional"}
                subtitle={"Downloads event data from TBA"}
                onPress={() => { navigator.navigate("Year"); }} />

            <StandardButton
                iconType={"delete-outline"}
                title={"Clear Scouting Data"}
                subtitle={"Wipes all scouting data"}
                onPress={() => { clearScoutingData(); }} />

            <StandardButton
                iconType={"delete-forever"}
                title={"Reset"}
                subtitle={"Wipes all app data"}
                onPress={() => { clearAllData(); }} />

        </ScrollContainer>
    );
}