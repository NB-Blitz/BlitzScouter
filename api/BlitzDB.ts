import { Alert } from "react-native";
import EventDB from "./EventDB";
import MatchDB from "./MatchDB";
import Match from "./models/Match";
import TeamDB from "./TeamDB";
export default class BlitzDB {
    static teams: TeamDB = new TeamDB();
    static matches: MatchDB = new MatchDB();
    static event: EventDB = new EventDB();

    /**
     * Downloads all event data from the Blue Alliance
     * @param eventID - ID of event to download
     * @param setDownloadStatus - Sets the download status of the event
     * @returns 
     */
    static async downloadEvent(eventID: string, setDownloadStatus: (status: string) => void) {
        // Teams
        setDownloadStatus("Downloading Teams...");
        let teamSuccess = await this.teams.downloadEvent(eventID, (teamNumber) => {
            setDownloadStatus("Downloading Team " + teamNumber + "...");
        });
        if (!teamSuccess)
            return setDownloadStatus("");

        // Matches
        let matchSuccess = await this.matches.downloadEvent(eventID, (matchNumber) => {
            setDownloadStatus("Downloading Match " + matchNumber + "...");
        });
        if (!matchSuccess)
            return setDownloadStatus("");

        // Event
        this.event.setLoaded(true, eventID);

        // Save
        setDownloadStatus("Saving...");
        await this.saveAll();

        // Exit
        setDownloadStatus("");
        Alert.alert("Success", "Successfully downloaded data from The Blue Alliance.");
    }

    /**
     * Saves all DB data to storage
     */
    static async saveAll() {
        await this.teams.save();
        await this.matches.save();
        await this.event.save();
    }

    /**
     * Gets all of the matches from a team
     * @param teamID - ID of team to get matches from
     * @returns an array of matches
     */
    static getTeamMatches(teamID: string): Match[] {
        let matchList: Match[] = [];
        for (let match of this.matches.matchCache)
            if (match.blueTeamIDs.includes(teamID) || match.redTeamIDs.includes(teamID))
                matchList.push(match);
        return matchList;
    }

    /**
     * Exports all comments in a compressed format
     * @returns compressed string of comments
     */
    static exportComments(): string {
        let data = "";
        for (let team of this.teams.teamCache) {
            if (team.comments.length > 0)
                data += ";;" + team.id;
            for (let comment of team.comments) {
                data += "::" + comment;
            }
        }

        return data;
    }

    /**
     * Loads all DB data from storage
     */
    static async loadAll() {
        await this.teams.load();
        await this.matches.load();
        await this.event.load();
    }

    /**
     * Deletes all data from the database
     * @param alert - Whether or not to alert the user
     */
    static async deleteAll(alert: boolean) {

        if (alert) {
            Alert.alert("Are you sure?", "This will delete all scouting data from your device. Are you sure you want to continue?", [{
                text: "Confirm",
                onPress: () => {
                    BlitzDB.deleteAll(false).then(() => {
                        Alert.alert("Done", "All data has been cleared");
                    });
                }
            },
            { text: "Cancel", style: "cancel" }], { cancelable: true });
        }
        else {
            this.teams.deleteAll();
            this.matches.deleteAll();
            this.event.deleteAll();
        }
    }
}