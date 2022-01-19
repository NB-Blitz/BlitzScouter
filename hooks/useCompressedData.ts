import React, { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { ScoutingData } from "../types/TemplateTypes";
import useEvent from "./useEvent";
import { getTeam, setTeam } from "./useTeam";

export interface ExportData {
    eventID: string,
    exportID: string,
    scoutingData: Record<string, ScoutingData[]>
}
export function getChecksum(data: Record<string, ScoutingData[]>) {
    const jsonData = JSON.stringify(data);
    return jsonData.split("").reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
}

export function useJsonData() {
    const [event] = useEvent();
    const [data, setData] = useState("");

    const compressJsonData = async () => {
        const teams = await Promise.all(event.teamIDs.map(getTeam));
        let scoutingData: Record<string, ScoutingData[]> = {};
        for (const team of teams) {
            if (team)
                if (team.scoutingData.length > 0)
                    scoutingData[team.id] = team.scoutingData;
        }
        const outputData: ExportData = {
            exportID: getChecksum(scoutingData).toString(),
            eventID: event.id,
            scoutingData
        };
        const jsonData = JSON.stringify(outputData);
        setData(jsonData);
    }

    useEffect(() => {
        compressJsonData();
    }, [event]);

    return event.id === "bogus" ? "" : data;
}

export function useDataImporter() {
    const [event] = useEvent();
    const [importedIDs, setImportedIDs] = React.useState([] as string[]);

    const importJsonData = async (data: string) => {
        try {
            const decompressedData = JSON.parse(data) as ExportData;
            if (!decompressedData) {
                ToastAndroid.show("Invalid QR code", ToastAndroid.SHORT);
                return;
            }
            if (importedIDs.includes(decompressedData.exportID)) {
                return;
            }
            importedIDs.push(decompressedData.exportID);
            setImportedIDs(importedIDs);
            if (decompressedData.eventID !== event.id) {
                ToastAndroid.show("Invalid Event", ToastAndroid.SHORT);
                return;
            }

            const teamIDs = Object.keys(decompressedData.scoutingData);
            for (const teamID of teamIDs) {
                const team = await getTeam(teamID);
                if (team) {
                    const scoutingData = decompressedData.scoutingData[teamID];
                    for (let scout of scoutingData) {
                        if (team.scoutingData.findIndex(s => s.matchID === scout.matchID) === -1) {
                            team.scoutingData.push(scout);
                        }
                    }
                    await setTeam(team);
                }
            }
            ToastAndroid.show("Imported " + teamIDs.length + " team(s).", ToastAndroid.SHORT);
        }
        catch (e) {
            ToastAndroid.show("Invalid Data Import", ToastAndroid.SHORT);
        }
    };

    return importJsonData;
}