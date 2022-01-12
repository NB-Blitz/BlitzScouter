import { Match } from "../types/DBTypes";
import useStorage from "./useStorage";

const DEFAULT_MATCH = {
    id: "",
    name: "",
    description: "",
    number: 0,
    compLevel: "",
    blueTeamIDs: [],
    redTeamIDs: [],
    scoutingData: []
} as Match;

/**
 * Grabs match data as a react hook
 * @param matchID - ID of the match
 * @returns current match data and a setting function
 */
export default function useMatch(matchID: string): [Match, (match: Match) => Promise<void>] {
    const [matchData, setMatchData] = useStorage<Match>(matchID, DEFAULT_MATCH);
    return [matchData, setMatchData];
}