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
    mediaPaths: string[];
}

export interface Match {
    id: string;
    name: string;
    description: string;
    number: number;
    compLevel: string;
    blueTeamIDs: string[];
    redTeamIDs: string[];
    comment: string;
}

export interface Media {
    id: string;
    path: string;
}