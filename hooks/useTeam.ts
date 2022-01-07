import { Team } from "../types/DBTypes";
import useStorage from "./useStorage";

const DEFAULT_TEAM = {
    id: "",
    name: "",
    number: 0,
    mediaPaths: []
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