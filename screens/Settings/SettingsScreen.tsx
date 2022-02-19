import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import { Alert, ToastAndroid } from 'react-native';
import StandardButton from '../../components/common/StandardButton';
import ScrollContainer from '../../components/containers/ScrollContainer';
import NavTitle from '../../components/text/NavTitle';
import Subtitle from '../../components/text/Subtitle';
import Title from '../../components/text/Title';
import { DARK_PALETTE, LIGHT_PALETTE, PaletteContext } from '../../context/PaletteContext';
import useEvent from '../../hooks/useEvent';
import { getMatch } from '../../hooks/useMatch';
import { setScoutingData } from '../../hooks/useScoutingData';
import { clearStorage } from '../../hooks/useStorage';
import { getTeam } from '../../hooks/useTeam';
import useTemplate from '../../hooks/useTemplate';
import { ScoutingData, TemplateType } from '../../types/TemplateTypes';

export default function SettingsScreen() {
    const paletteContext = React.useContext(PaletteContext);
    const navigator = useNavigation();
    const [event] = useEvent();
    const [template] = useTemplate(TemplateType.Match);

    const clearData = () => {
        Alert.alert("Are you sure?", "This will delete all team, event, match, and scouting data on your device.",
            [
                {
                    text: "Confirm",
                    onPress: () => {
                        clearStorage().then(() => {
                            Alert.alert("Success!", "All scouting data has been cleared");
                        });
                    }
                },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ], { cancelable: true }
        );
    }

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

                console.log(match.id);

                const teamIDs = match.blueTeamIDs;
                teamIDs.push(...match.redTeamIDs);

                for (let teamID of teamIDs) {
                    const team = await getTeam(teamID);
                    if (!team)
                        continue;

                    const values = template.filter(elem => elem.value != undefined).map((elem) => Math.round(15 * Math.random() * (1 - (team.rank / event.teamIDs.length))));

                    scoutingData.push({
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
                title={"Edit Palette"}
                subtitle={"Customizes the app's color palette"}
                onPress={() => { navigator.navigate("Palette"); }} />

            <StandardButton
                iconType={"lightbulb"}
                title={"Light Mode"}
                subtitle={"Resets to the default light palette"}
                onPress={() => { paletteContext.setPalette(LIGHT_PALETTE); ToastAndroid.show("Light Mode!", ToastAndroid.SHORT); }} />

            <StandardButton
                iconType={"lightbulb-outline"}
                title={"Dark Mode"}
                subtitle={"Resets to the default dark palette"}
                onPress={() => { paletteContext.setPalette(DARK_PALETTE); ToastAndroid.show("Dark Mode!", ToastAndroid.SHORT); }} />

            {/* Scouting Buttons */}
            <StandardButton
                iconType={"edit"}
                title={"Edit Match Scouting"}
                subtitle={"Adjust the match scouting template"}
                onPress={() => { navigator.navigate("EditTemplate", { templateType: TemplateType.Match }); }} />

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
                iconType={"file-download"}
                title={"Re-Download Event"}
                subtitle={"Downloads event data from TBA"}
                onPress={() => { navigator.navigate("Download", { eventID: event.id }); }} />

            <StandardButton
                iconType={"delete-outline"}
                title={"Clear Scouting Data"}
                subtitle={"Wipes all scouting data on your device"}
                onPress={() => { clearScoutingData(); }} />


            <StandardButton
                iconType={"delete-outline"}
                title={"Clear All Data"}
                subtitle={"Wipes all app data on your device"}
                onPress={() => { clearData(); }} />

        </ScrollContainer>
    );
}