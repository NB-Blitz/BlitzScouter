import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as React from 'react';
import StandardButton from '../../components/common/StandardButton';
import ScrollContainer from '../../components/containers/ScrollContainer';
import NavTitle from '../../components/text/NavTitle';
import { useDataExporter, useDataImporter } from '../../hooks/useCompressedData';
import useEvent from '../../hooks/useEvent';
import useScoutingData from '../../hooks/useScoutingData';
import useTemplate from '../../hooks/useTemplate';

export default function SharingScreen() {
    const navigator = useNavigation();
    const [scoutingData] = useScoutingData();
    const [template] = useTemplate();
    const [event] = useEvent();
    const importJsonData = useDataImporter();
    const exportJsonData = useDataExporter();

    const exportJson = async () => {
        const path = FileSystem.documentDirectory + "data.json";
        const data = exportJsonData();
        await FileSystem.writeAsStringAsync(path, data, { encoding: FileSystem.EncodingType.UTF8 });
        Sharing.shareAsync(path);
    }

    /*
        https://github.com/expo/expo/issues/14335

        TL;DR: result.uri is not the correct file path.
        The following code is a workaround for this issue.
    */
    const importJson = async () => {
        const result = await DocumentPicker.getDocumentAsync({ type: 'application/json', copyToCacheDirectory: true });
        if (result.type === "success") {
            const fileName = result.uri.split("/").pop();
            const path = FileSystem.cacheDirectory + 'DocumentPicker/' + fileName;
            const jsonData = await FileSystem.readAsStringAsync(path, { encoding: FileSystem.EncodingType.UTF8 });
            importJsonData(jsonData);
        }
    }

    const exportCSV = async () => {
        const labels = template.filter((elem) => elem.value !== undefined).map((elem) => elem.label);
        let data = "Team ID,Match ID," + labels + "\n";
        data += scoutingData.map((scout) => scout.teamID + "," + scout.matchID + "," + scout.values).join("\n");

        const path = FileSystem.documentDirectory + "data.csv";
        await FileSystem.writeAsStringAsync(path, data, { encoding: FileSystem.EncodingType.UTF8 });
        Sharing.shareAsync(path);
    }

    return (
        <ScrollContainer>
            <NavTitle>Sharing</NavTitle>

            {/* QR Codes */}
            <StandardButton
                iconType={"qr-code"}
                title={"Show QRCode"}
                subtitle={"Export Scouting Data"}
                onPress={() => { navigator.navigate("ExportQR"); }} />

            <StandardButton
                iconType={"camera-alt"}
                title={"Scan QRCode"}
                subtitle={"Import Scouting Data"}
                onPress={() => { navigator.navigate("ImportQR"); }} />

            {/* File Formats */}
            <StandardButton
                iconType={"code"}
                title={"Save to JSON"}
                subtitle={"Export Scouting Data"}
                onPress={() => { exportJson(); }} />

            <StandardButton
                iconType={"code"}
                title={"Import JSON"}
                subtitle={"Import Scouting Data"}
                onPress={() => { importJson(); }} />

            <StandardButton
                iconType={"table-chart"}
                title={"Save to CSV"}
                subtitle={"Export Scouting Data"}
                onPress={() => { exportCSV(); }} />

            {/* Printing */}

            <StandardButton
                iconType={"print"}
                title={"Print Summary"}
                subtitle={"Export Scouting Data"}
                onPress={() => { navigator.navigate("PrintSummaryScreen"); }} />

            {/*<StandardButton
                iconType={"inventory"}
                title={"Save to ZIP"}
                subtitle={"Export Images"}
                onPress={() => { }} />

            <HorizontalBar />

            <StandardButton
                iconType={"nfc"}
                title={"Export to NFC"}
                subtitle={"Export Scouting Data"}
                onPress={() => { }} />
            <StandardButton
                iconType={"nfc"}
                title={"Import from NFC"}
                subtitle={"Import Scouting Data"}
                onPress={() => { }} />
            <HorizontalBar />

            <StandardButton
                iconType={"bluetooth"}
                title={"Export to Bluetooth"}
                subtitle={"Export Scouting Data"}
                onPress={() => { }} />
            <StandardButton
                iconType={"bluetooth"}
                title={"Import from Bluetooth"}
                subtitle={"Import Scouting Data"}
                onPress={() => { }} />*/}

        </ScrollContainer>
    );
}
