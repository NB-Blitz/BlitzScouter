export interface Team
{
    key: string;
    nickname: string;
    team_number: number;
    media: string[];
}

export default interface Match
{
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
    name: string;
    description: string;
}