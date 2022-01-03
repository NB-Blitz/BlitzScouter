import { useNavigation } from '@react-navigation/core';
import * as Application from 'expo-application';
import * as React from 'react';
import BlitzDB from '../../api/BlitzDB';
import { TemplateType } from '../../api/models/TemplateModels';
import HorizontalBar from '../../components/common/HorizontalBar';
import StandardButton from '../../components/common/StandardButton';
import ScrollContainer from '../../components/containers/ScrollContainer';
import NavTitle from '../../components/text/NavTitle';
import Subtitle from '../../components/text/Subtitle';
import DownloadingModal from './DownloadingModal';

export default function SettingsScreen() {
    const [downloadStatus, setDownloadStatus] = React.useState("");
    const navigator = useNavigation();

    return (
        <ScrollContainer>

            <NavTitle>Settings</NavTitle>

            {/* Data Buttons */}
            {BlitzDB.event.isLoaded ?
                <StandardButton
                    iconType={"cloud-download"}
                    title={"Re-Download Data"}
                    subtitle={"Re-downloads all the data from TBA"}
                    onPress={() => { BlitzDB.downloadEvent(BlitzDB.event.id, setDownloadStatus); }}
                />
                : null}

            <StandardButton
                iconType={"location-pin"}
                title={(BlitzDB.event.isLoaded ? "Change" : "Set") + " Regional"}
                subtitle={"Downloads team/match data from TBA"}
                onPress={() => { navigator.navigate("Year"); }} />

            <StandardButton
                iconType={"delete-outline"}
                title={"Clear All Data"}
                subtitle={"Wipes all data on your device"}
                onPress={() => { BlitzDB.deleteAll(true); }} />

            <HorizontalBar />

            {/* Scouting Buttons */}
            <StandardButton
                iconType={"edit"}
                title={"Edit Pit Scouting"}
                subtitle={"Adjust the pit scouting template"}
                onPress={() => { navigator.navigate("EditTemplate", { type: TemplateType.Pit }); }} />
            <StandardButton
                iconType={"edit"}
                title={"Edit Match Scouting"}
                subtitle={"Adjust the match scouting template"}
                onPress={() => { navigator.navigate("EditTemplate", { type: TemplateType.Match }); }} />
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