import { ScoutingData } from "../types/TemplateTypes";
import useStorage, { getStorage, putStorage } from "./useStorage";

/**
 * Grabs all of the scouting data as a react hook
 * @returns all scouting data
 */
export default function useScoutingData(): [ScoutingData[], (scoutingData: ScoutingData[]) => Promise<void>] {
    const [scoutingData, setScoutingData] = useStorage<ScoutingData[]>("scouting-data", []);
    return [scoutingData, setScoutingData];
}

/**
 * Grabs all of the scouting data from storage
 * @returns all scouting data
 */
export async function getScoutingData() {
    return getStorage<ScoutingData[]>("scouting-data");
}

/**
 * Grabs all of the scouting data from storage
 * @returns all scouting data
 */
export async function setScoutingData(scoutingData: ScoutingData[]) {
    return putStorage<ScoutingData[]>("scouting-data", scoutingData);
}