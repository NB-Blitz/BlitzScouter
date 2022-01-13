import LZString from "lz-string";
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

export function useCompressedData() {
    const [event] = useEvent();
    const [data, setData] = useState("");

    const compressData = async () => {
        const teams = await Promise.all(event.teamIDs.map(getTeam));
        let scoutingData: Record<string, ScoutingData[]> = {};
        for (const team of teams) {
            if (team)
                if (team.scoutingData.length > 0)
                    scoutingData[team.id] = team.scoutingData;
        }
        const outputData: ExportData = {
            exportID: Math.random().toString(36).slice(2),
            eventID: event.id,
            scoutingData
        };
        const jsonData = JSON.stringify(outputData);
        const compressedData = LZString.compressToEncodedURIComponent(jsonData);
        setData(compressedData);
    }

    useEffect(() => {
        compressData();
    }, [event]);

    return data;
}

export function decompressData(data: string): ExportData | undefined {
    const decompressedData = LZString.decompressFromEncodedURIComponent(data);
    if (decompressedData) {
        const data = JSON.parse(decompressedData) as ExportData;
        return data;
    }
    return undefined;
}

export function useDecompressedData() {
    const [event] = useEvent();
    const [importedIDs, setImportedIDs] = React.useState([] as string[]);

    const importCompressedData = async (data: string) => {
        const decompressedData = decompressData(data);
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
    };

    return [importCompressedData];
}