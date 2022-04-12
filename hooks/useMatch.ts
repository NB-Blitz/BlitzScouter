import { Match } from "../types/DBTypes";
import useStorage, { getStorage, putStorage } from "./useStorage";

const DEFAULT_MATCH: Match = {
    id: "",
    name: "",
    description: "",
    number: 0,
    compLevel: "",
    blueTeamIDs: [],
    redTeamIDs: []
};

/**
 * Grabs match data as a react hook
 * @param matchID - ID of the match
 * @returns current match data and a setting function
 */
export default function useMatch(matchID: string): [Match, (match: Match) => Promise<void>] {
    const [matchData, setMatchData] = useStorage<Match>(matchID, DEFAULT_MATCH);
    return [matchData, setMatchData];
}

export async function getMatch(matchID: string) {
    return await getStorage<Match>(matchID);
}

export async function setMatch(match: Match) {
    return await putStorage<Match>(match.id, match);
}