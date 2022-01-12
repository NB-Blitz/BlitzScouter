import { useNavigation } from '@react-navigation/core';
import * as Application from 'expo-application';
import * as React from 'react';
import { Alert } from 'react-native';
import HorizontalBar from '../../components/common/HorizontalBar';
import StandardButton from '../../components/common/StandardButton';
import ScrollContainer from '../../components/containers/ScrollContainer';
import NavTitle from '../../components/text/NavTitle';
import Subtitle from '../../components/text/Subtitle';
import { clearStorage } from '../../hooks/useStorage';
import { TemplateType } from '../../types/TemplateTypes';

export default function SettingsScreen() {
    const navigator = useNavigation();

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

    return (
        <ScrollContainer>

            <NavTitle>Settings</NavTitle>

            {/* Data Buttons */}
            <StandardButton
                iconType={"location-pin"}
                title={"Set Active Regional"}
                subtitle={"Downloads team/match data from TBA"}
                onPress={() => { navigator.navigate("Year"); }} />

            <StandardButton
                iconType={"delete-outline"}
                title={"Clear All Data"}
                subtitle={"Wipes all data on your device"}
                onPress={() => { clearData(); }} />

            <HorizontalBar />

            {/* Scouting Buttons */}
            <StandardButton
                iconType={"edit"}
                title={"Edit Pit Scouting"}
                subtitle={"Adjust the pit scouting template"}
                onPress={() => { navigator.navigate("EditTemplate", { templateType: TemplateType.Pit }); }} />
            <StandardButton
                iconType={"edit"}
                title={"Edit Match Scouting"}
                subtitle={"Adjust the match scouting template"}
                onPress={() => { navigator.navigate("EditTemplate", { templateType: TemplateType.Match }); }} />
            <StandardButton
                iconType={"person-outline"}
                title={"Assign Default Team"}
                subtitle={"Assign the Default Team to Scout"}
                onPress={() => { navigator.navigate("DefaultTeam"); }} />

            <HorizontalBar />
            <Subtitle>Blitz Scouter v{Application.nativeApplicationVersion}</Subtitle>

        </ScrollContainer>
    );
}