import React from "react";
import { ToastAndroid } from "react-native";
import { ExportData } from "../types/OtherTypes";
import { ScoutingData } from "../types/TemplateTypes";
import useEvent from "./useEvent";
import useScoutingData from "./useScoutingData";

export function getChecksum(data: ScoutingData[]) {
    const jsonData = JSON.stringify(data);
    return jsonData.split("").reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0).toString();
}

export function useQRImporter() {
    const [event] = useEvent();
    const [scoutingData, setScoutingData] = useScoutingData();
    const [importedIDs, setImportedIDs] = React.useState([] as string[]);

    const importData = async (data: string) => {
        try {
            // Decompress
            const splitData = data.split("|");
            if (splitData.length <= 0) {
                ToastAndroid.show("Invalid QR code", ToastAndroid.SHORT);
                return;
            }
            const exportID = splitData.shift() as string;
            const scouts = splitData.map((data) => {
                const split = data.split(",");
                if (split.length < 2)
                    return undefined;
                return {
                    teamID: split[0],
                    matchID: split[1],
                    values: split.slice(2).map((val) => parseInt(val))
                } as ScoutingData;
            }).filter((scout) => scout !== undefined) as ScoutingData[];


            // Check Duplicates
            if (importedIDs.includes(exportID)) {
                return;
            }
            importedIDs.push(exportID);
            setImportedIDs(importedIDs);

            // Append Data
            scoutingData.push(...scouts);
            setScoutingData(scoutingData);
            ToastAndroid.show("Imported " + scouts.length + " matches.", ToastAndroid.SHORT);
        }
        catch (e) {
            ToastAndroid.show("Invalid Data Import", ToastAndroid.SHORT);
        }
    };

    return importData;
}

export function useJSONImporter() {
    const [event] = useEvent();
    const [scoutingData, setScoutingData] = useScoutingData();
    const [importedIDs, setImportedIDs] = React.useState([] as string[]);

    const importData = async (data: string) => {
        try {
            // Decompress
            const decompressedData = JSON.parse(data) as ExportData;
            if (!decompressedData) {
                ToastAndroid.show("Invalid JSON Data", ToastAndroid.SHORT);
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

    return importData;
}

export function useJSONExporter() {
    const [scoutingData] = useScoutingData();
    const [event] = useEvent();

    const exportJsonData = () => {
        const data: ExportData = {
            scoutingData: scoutingData,
            eventID: event.id,
            exportID: getChecksum(scoutingData)
        };
        const jsonData = JSON.stringify(data);
        return jsonData;
    };

    return exportJsonData;
}