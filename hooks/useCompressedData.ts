import React from "react";
import { ToastAndroid } from "react-native";
import { ScoutingData } from "../types/TemplateTypes";
import useEvent from "./useEvent";
import useScoutingData from "./useScoutingData";

export interface ExportData {
    eventID: string,
    exportID: string,
    scoutingData: ScoutingData[]
}
export function getChecksum(data: ScoutingData[]) {
    const jsonData = JSON.stringify(data);
    return jsonData.split("").reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0).toString();
}

export function useDataImporter() {
    const [event] = useEvent();
    const [scoutingData, setScoutingData] = useScoutingData();
    const [importedIDs, setImportedIDs] = React.useState([] as string[]);

    const importJsonData = async (data: string) => {
        try {
            // Decompress
            const decompressedData = JSON.parse(data) as ExportData;
            if (!decompressedData) {
                ToastAndroid.show("Invalid QR code", ToastAndroid.SHORT);
                return;
            }

            // Check Duplicates
            if (importedIDs.includes(decompressedData.exportID)) {
                return;
            }
            importedIDs.push(decompressedData.exportID);
            setImportedIDs(importedIDs);

            // Check Event
            if (decompressedData.eventID !== event.id) {
                ToastAndroid.show("Invalid Event", ToastAndroid.SHORT);
                return;
            }

            // Append Data
            scoutingData.push(...decompressedData.scoutingData);
            setScoutingData(scoutingData);
            ToastAndroid.show("Imported " + scoutingData.length + " matches.", ToastAndroid.SHORT);
        }
        catch (e) {
            ToastAndroid.show("Invalid Data Import", ToastAndroid.SHORT);
        }
    };

    return importJsonData;
}