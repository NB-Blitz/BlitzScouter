export interface TBATeam {
    key: string;
    nickname: string;
    team_number: number;
}
export interface TBAMatch {
    alliances: {
        blue: {
            score: number;
            team_keys: string[];
        },
        red: {
            score: number;
            team_keys: string[];
        }
    };
    comp_level: string;
    event_key: string;
    key: string;
    match_number: number;
    videos: any[];
    winning_alliance: string;
}
export interface TBAEvent {
    key: string;
    name: string;
}
export interface TBAMedia {
    details: {
        base64Image?: string;
        model_image?: string;
    },
    direct_url?: string;
}

export interface TBAStatus {
    is_datafeed_down: boolean;
    max_season: number;
    current_season: number;
}