import AsyncStorage from "@react-native-async-storage/async-storage";
import TBA from "./TBA";

const SAVE_KEY = "event-data";

/**
 * Handles the currently loaded event
 */
export default class EventDB {
    isLoaded: boolean = false;
    id: string = "";
    year: number = 0;
    matchIDs: string[] = [];
    teamIDs: string[] = [];

    /**
     * Updates the list of matches at an event
     * @param matchIDs - ID of each match in an event
     */
    setMatches(matchIDs: string[]) {
        this.matchIDs = matchIDs;
    }

    /**
     * Updates the list of teams at an event
     * @param teamIDs - ID of each team at an event
     */
    setTeams(teamIDs: string[]) {
        this.teamIDs = teamIDs;
    }

    /**
     * Sets the current event year
     * @param year - Year to set to
     */
    setYear(year: number) {
        this.year = year;
        TBA.setYear(year);
    }

    /**
     * Sets whether or not the event is loaded
     * @param isLoaded - True if the event is loaded
     * @param eventID - ID of the event
     */
    setLoaded(isLoaded: boolean, eventID?: string) {
        this.isLoaded = isLoaded;
        if (eventID)
            this.id = eventID;
    }

    /**
     * Deletes all event data
     */
    async deleteAll() {
        this.isLoaded = false;
        this.id = "";
        this.year = 0;
        this.matchIDs = [];
        this.teamIDs = [];
        AsyncStorage.removeItem(SAVE_KEY);
    }

    /**
     * Saves all event data
     */
    async save() {
        let eventData = {
            matchIDs: this.matchIDs,
            teamIDs: this.teamIDs,
            year: this.year,
            id: this.id
        };
        let jsonEvent = JSON.stringify(eventData);
        await AsyncStorage.setItem(SAVE_KEY, jsonEvent);
    }

    /**
     * Loads all event data
     */
    async load() {
        let jsonEvent = await AsyncStorage.getItem(SAVE_KEY);
        if (!jsonEvent)
            return;
        let event = JSON.parse(jsonEvent);
        this.matchIDs = event.matchIDs as string[];
        this.teamIDs = event.teamIDs as string[];
        this.year = event.year as number;
        this.id = event.id as string;
        this.isLoaded = true;

        TBA.setYear(this.year);
    }
}