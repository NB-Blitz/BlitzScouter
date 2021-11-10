import AsyncStorage from "@react-native-async-storage/async-storage";
import BlitzDB from "./BlitzDB";
import Match from "./models/Match";
import { TBAMatch } from "./models/TBAModels";
import TBA from "./TBA";

const SAVE_KEY = "match-data";
const MATCH_TYPES = ["qm", "qf", "sf", "f"];

/**
 * Represents a database of event matches
 */
export default class MatchDB {
    matchCache: Match[] = [];

    /**
     * Downloads all matches at an event
     * @param eventID - ID of the event
     */
    async downloadEvent(eventID: string, matchCallback: (matchNumber: number) => void): Promise<boolean> {

        // Download
        let tbaMatches = await TBA.getMatches(eventID);
        if (!tbaMatches)
            return false;

        // Sort
        tbaMatches.sort((a, b) =>
            (a.match_number + MATCH_TYPES.indexOf(a.comp_level) * 1000) -
            (b.match_number + MATCH_TYPES.indexOf(b.comp_level) * 1000)
        );

        // Add
        let matchIDs: string[] = [];
        for (let match of tbaMatches) {
            matchCallback(match.match_number);
            matchIDs.push(match.key);
            let existingMatch = this.get(match.key);
            if (!existingMatch) {
                this.matchCache.push({
                    id: match.key,
                    name: this._generateName(match),
                    description: this._generateDesc(match),
                    number: match.match_number,
                    compLevel: match.comp_level,
                    blueTeamIDs: match.alliances.blue.team_keys,
                    redTeamIDs: match.alliances.red.team_keys,
                    comment: ""
                });
            }
        }
        BlitzDB.event.setMatches(matchIDs);

        return true;
    }

    /**
     * Gets the a match by its id
     * @param matchID - The ID of the match
     */
    get(matchID: string): Match | undefined {
        let match = this.matchCache.find(match => match.id === matchID);
        return match;
    }

    /**
     * Generates a name for a match
     * (Ex: "Qualifications 12")
     * @param match - Match to generate name
     */
    _generateName(match: TBAMatch): string {
        let matchName = match.comp_level + "-" + match.match_number;
        switch (match.comp_level) {
            case "qm":
                matchName = "Qualification " + match.match_number;
                break;
            case "qf":
                matchName = "Quarter-Finals " + match.match_number;
                break;
            case "sf":
                matchName = "Semi-Finals " + match.match_number;
                break;
            case "f":
                matchName = "Finals " + match.match_number;
                break;
        }
        return matchName;
    }

    /**
     * Generates a description for a match
     * (Ex: "5141 5142 5143 - 1231 1232 1233")
     * @param match - Match to generate name
     */
    _generateDesc(match: TBAMatch): string {
        let matchDesc = "";
        match.alliances.blue.team_keys.forEach(teamKey => {
            let teamNumber = parseInt(teamKey.substring(3));
            matchDesc += teamNumber + " ";
        });
        matchDesc += " -  "
        match.alliances.red.team_keys.forEach(teamKey => {
            let teamNumber = parseInt(teamKey.substring(3));
            matchDesc += teamNumber + " ";
        });
        return matchDesc;
    }

    /**
     * Deletes all matches from the database
     */
    async deleteAll() {
        this.matchCache = [];
        await AsyncStorage.removeItem(SAVE_KEY);
    }

    /**
     * Saves data from the cache to the database
     */
    async save() {
        let jsonMatches = JSON.stringify(this.matchCache);
        await AsyncStorage.setItem(SAVE_KEY, jsonMatches);
    }

    /**
     * Loads the match cache
     */
    async load() {
        let jsonMatches = await AsyncStorage.getItem(SAVE_KEY);
        if (!jsonMatches)
            return;
        let matches = JSON.parse(jsonMatches);
        this.matchCache = matches;
    }
}