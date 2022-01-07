import { useNavigation } from '@react-navigation/core';
import * as Application from 'expo-application';
import * as React from 'react';
import HorizontalBar from '../../components/common/HorizontalBar';
import StandardButton from '../../components/common/StandardButton';
import ScrollContainer from '../../components/containers/ScrollContainer';
import NavTitle from '../../components/text/NavTitle';
import Subtitle from '../../components/text/Subtitle';
import { clearStorage } from '../../hooks/useStorage';
import DownloadingModal from './DownloadingModal';

export default function SettingsScreen() {
    const [downloadStatus, setDownloadStatus] = React.useState("");
    const navigator = useNavigation();

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
                onPress={() => { clearStorage(); }} />

            <HorizontalBar />

            {/* Scouting Buttons */}
            {/*
            <StandardButton
                iconType={"edit"}
                title={"Edit Pit Scouting"}
                subtitle={"Adjust the pit scouting template"}
                onPress={() => { navigator.navigate("EditTemplate", { templateType: TemplateType.Pit }); }} />
            */}
            <StandardButton
                iconType={"edit"}
                title={"Edit Match Scouting"}
                subtitle={"Adjust the match scouting template"}
                onPress={() => { /*navigator.navigate("EditTemplate", { templateType: TemplateType.Match });*/ }} />
            <StandardButton
                iconType={"person-outline"}
                title={"Assign Default Team"}
                subtitle={"Assign the Default Team to Scout"}
                onPress={() => { /*navigator.navigate("DefaultTeam");*/ }} />
            <HorizontalBar />
            <Subtitle>Blitz Scouter v{Application.nativeApplicationVersion}</Subtitle>

            {/* Modals */}
            <DownloadingModal status={downloadStatus} />
        </ScrollContainer>
    );
}