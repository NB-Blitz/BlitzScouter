import { Team } from "../types/DBTypes";
import useStorage, { getStorage, putStorage } from "./useStorage";

const DEFAULT_TEAM = {
    id: "",
    name: "",
    number: 0,
    rank: -1,
    wins: -1,
    losses: -1,
    ties: -1,
    mediaPaths: [],
    scoutingData: []
} as Team;

/**
 * Grabs team data as a react hook
 * @param teamID - ID of the team
 * @returns current team data and a setting function
 */
export default function useTeam(teamID: string): [Team, (team: Team) => Promise<void>] {
    const [teamData, setTeamData] = useStorage<Team>(teamID, DEFAULT_TEAM);
    return [teamData, setTeamData];
}

export async function getTeam(teamID: string) {
    return await getStorage<Team>(teamID);
}

export async function setTeam(team: Team) {
    return await putStorage<Team>(team.id, team);
}