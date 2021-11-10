/**
 * Represents a game match
 */
export default interface Match {
    id: string;
    name: string;
    description: string;
    number: number;
    compLevel: string;
    blueTeamIDs: string[];
    redTeamIDs: string[];
    comment: string;
}