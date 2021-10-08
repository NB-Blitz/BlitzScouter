/*   The Blue Alliance   */
export interface TBATeam
{
    key: string;
    nickname: string;
    team_number: number;
}
export interface TBAMatch
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
}
export interface TBAEvent
{
    key: string;
    name: string;
}
export interface TBAMedia
{
    details: {
        base64Image?: string;
        model_image?: string;
    },
    direct_url?: string;
}

/*   Database   */
export interface Team
{
    id: string;
    name: string;
    number: number;
    media: string[];
    comments: string[];
}
export interface Match
{
    id: string;
    name: string;
    description: string;
    number: number;
    compLevel: string;
    blueTeamIDs: string[];
    redTeamIDs: string[];
    comment: string;
}
export interface Event
{
    id: string;
    matches: Match[];
    teams: string[];
}
export interface Comment
{
    isScanned: boolean;
    timestamp: number;
    text: string;
}