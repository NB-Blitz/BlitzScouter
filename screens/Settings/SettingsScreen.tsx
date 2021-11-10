import * as Application from 'expo-application';
import * as React from 'react';
import BlitzDB from '../../api/BlitzDB';
import { TemplateType } from '../../api/models/TemplateModels';
import HorizontalBar from '../../components/common/HorizontalBar';
import StandardButton from '../../components/common/StandardButton';
import ScrollContainer from '../../components/containers/ScrollContainer';
import Subtitle from '../../components/text/Subtitle';
import DownloadingModal from './DownloadingModal';
import RegionalModal from './RegionalModal';
import TemplateModal from './Template/TemplateModal';
import YearModal from './YearModal';

export default function SettingsScreen() {
    const [yearModalVisible, setYearModalVisible] = React.useState(false);
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
                    title={"Re-Download Data"}
                    subtitle={"Re-downloads all the data from TBA"}
                    onPress={() => { BlitzDB.downloadEvent(BlitzDB.event.id, setDownloadStatus); }}
                />
                : null}

            <StandardButton
                iconType={"calendar"}
                title={"Change Year"}
                subtitle={"Changes the year for practice & testing"}
                onPress={() => { setYearModalVisible(true); }} />

            <StandardButton
                iconType={"map-marker"}
                title={(BlitzDB.event ? "Change" : "Set") + " Regional"}
                subtitle={"Downloads regional data from TBA"}
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
                onPress={() => { }} />
            <HorizontalBar />
            <Subtitle>Blitz Scouter v{Application.nativeApplicationVersion}</Subtitle>

            {/* Modals */}
            <YearModal isVisible={yearModalVisible} setVisible={setYearModalVisible} />
            <RegionalModal isVisible={regionalModalVisible} setVisible={setRegionalModalVisible} />
            <TemplateModal type={TemplateType.Pit} setVisible={setPitTemplateModalVisible} isVisible={pitTemplateModalVisible} />
            <TemplateModal type={TemplateType.Match} setVisible={setMatchTemplateModalVisible} isVisible={matchTemplateModalVisible} />
            <DownloadingModal status={downloadStatus} />
        </ScrollContainer>
    );
}