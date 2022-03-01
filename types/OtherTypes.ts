import { ScoutingData } from "./TemplateTypes";

export interface Palette {
    background: string,
    button: string,
    navigation: string,
    navigationText: string,
    navigationSelected: string,
    navigationTextSelected: string,
    textPrimary: string,
    textSecondary: string,
    innerBox: string
}

export interface Stat {
    label: string,
    eventMax: number,
    teams: TeamStats[]
}

export interface TeamStats {
    teamID: string,
    avg: number,
    history: number[]
}

export interface ExportData {
    eventID: string,
    exportID: string,
    scoutingData: ScoutingData[]
}

export interface QRHistory {
    timestamp: string,
    scoutIDs: string[],
}