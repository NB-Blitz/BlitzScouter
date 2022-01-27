import { ScoutingData } from "./TemplateTypes";

export interface Event {
    id: string;
    teamIDs: string[];
    matchIDs: string[];
    year: number;
}

export interface Team {
    id: string;
    name: string;
    number: number;
    rank: number;
    wins: number;
    losses: number;
    ties: number;
    mediaPaths: string[];
    scoutingData: ScoutingData[];
}

export interface Match {
    id: string;
    name: string;
    description: string;
    number: number;
    compLevel: string;
    blueTeamIDs: string[];
    redTeamIDs: string[];
}

export interface Media {
    id: string;
    path: string;
}