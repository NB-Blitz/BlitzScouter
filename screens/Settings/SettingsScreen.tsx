import * as React from 'react';
import { StyleSheet } from 'react-native';
import DownloadingModal from './DownloadingModal';
import RegionalModal from './RegionalModal';
import { BlitzDB } from '../../api/BlitzDB';
import ScrollContainer from '../../components/containers/ScrollContainer';
import HorizontalBar from '../../components/common/HorizontalBar';
import TemplateModal from './Template/TemplateModal';
import { TemplateType } from '../../api/DBModels';
import StandardButton from '../../components/common/StandardButton';

export default function SettingsScreen()
{
    const [regionalModalVisible, setRegionalModalVisible] = React.useState(false);
    const [pitTemplateModalVisible, setPitTemplateModalVisible] = React.useState(false);
    const [matchTemplateModalVisible, setMatchTemplateModalVisible] = React.useState(false);
    const [downloadStatus, setDownloadStatus] = React.useState("");

    return (
        <ScrollContainer>

            {/* Data Buttons */}
            {BlitzDB.event ? 
                <StandardButton
                    iconType={"cloud-download"}
                    title={"Update Data"}
                    subtitle={"Re-download data from TBA"}
                    onPress={() => { BlitzDB.download(BlitzDB.event ? BlitzDB.event.id : "", setDownloadStatus); }}
                />
            : null}

            <StandardButton
                iconType={"map-marker"}
                title={(BlitzDB.event ? "Change" : "Set") + " Regional"}
                subtitle={"Download regional data from TBA"} 
                onPress={() => { setRegionalModalVisible(true); }} />
            <StandardButton
                iconType={"trash"}
                title={"Clear All Data"}
                subtitle={"Wipes all data on your device"} 
                onPress={() => { BlitzDB.deleteAll(true); }} />

            <HorizontalBar />

            {/* Scouting Buttons */}
            <StandardButton
                iconType={"pencil-square-o"}
                title={"Edit Pit Scouting"}
                subtitle={"Adjust the pit scouting template"} 
                onPress={() => { setPitTemplateModalVisible(true); }} />
            <StandardButton
                iconType={"pencil-square-o"}
                title={"Edit Match Scouting"}
                subtitle={"Adjust the match scouting template"} 
                onPress={() => { setMatchTemplateModalVisible(true); }} />
            <StandardButton
                iconType={"user"}
                title={"Assign Default Team"}
                subtitle={"Assign the Default Team to Scout"} 
                onPress={() => {}} />
            <HorizontalBar />

            {/* Modals */}
            <RegionalModal isVisible={regionalModalVisible} setVisible={setRegionalModalVisible} />
            <TemplateModal type={TemplateType.Pit} setVisible={setPitTemplateModalVisible} isVisible={pitTemplateModalVisible} />
            <TemplateModal type={TemplateType.Match} setVisible={setMatchTemplateModalVisible} isVisible={matchTemplateModalVisible} />
            <DownloadingModal status={downloadStatus} />
        </ScrollContainer>
    );
}