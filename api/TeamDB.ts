import AsyncStorage from "@react-native-async-storage/async-storage";
import BlitzDB from "./BlitzDB";
import Team from "./models/Team";
import TBA from "./TBA";

const SAVE_KEY = "teams-data";
const BASE64_PREFIX = "data:image/png;base64, ";

/**
 * Represents a database of FRC teams
 */
export default class TeamDB {
    teamCache: Team[] = [];

    /**
     * Downloads all the teams attending an event
     * @param event - Event to reference teams
     * @returns true if successful
     */
    async downloadEvent(eventID: string, teamCallback: (teamNumber: number) => void): Promise<boolean> {

        // Download
        let tbaTeams = await TBA.getTeams(eventID);
        if (!tbaTeams)
            return false;
        tbaTeams.sort((a, b) => a.team_number - b.team_number);

        // Parse
        let teamIDs: string[] = [];
        for (let team of tbaTeams) {
            teamCallback(team.team_number);
            teamIDs.push(team.key);
            let existingTeam = this.get(team.key);
            if (!existingTeam) {
                this.teamCache.push({
                    id: team.key,
                    name: team.nickname,
                    number: team.team_number,
                    media: [],
                    comments: []
                });
            }
            await this.downloadMedia(team.key);
        }
        BlitzDB.event.setTeams(teamIDs);

        return true;
    }

    /**
     * Downloads all media from an FRC team
     * @param teamID - ID of the team
     * @returns true if successful
     */
    async downloadMedia(teamID: string) {
        let mediaList = await TBA.getTeamMedia(teamID, BlitzDB.event.year);
        if (mediaList == undefined)
            return false;
        mediaList.forEach(media => {
            let imageData: string | undefined;
            if (media.details.base64Image)
                imageData = BASE64_PREFIX + media.details.base64Image;
            else if (media.details.model_image)
                imageData = media.details.model_image;
            else if (media.direct_url)
                imageData = media.direct_url;
            if (imageData)
                this.addMedia(teamID, imageData, true);
        });
    }

    /**
     * Gets a team by it's id
     * @param teamID - TBA ID of the team
     */
    get(teamID: string): Team | undefined {
        let team = this.teamCache.find(team => team.id === teamID);
        return team;
    }

    /**
     * Adds a team to the database
     * @param team - Team to add
     */
    add(team: Team) {
        this.teamCache.push(team);
    }

    /**
     * Adds media onto the team
     * @param teamID - ID of the team
     * @param media - Media in Base64 format
     */
    addMedia(teamID: string, media: string, removePrefix?: boolean) {

        // TODO: Store media outside of database
        let team = this.get(teamID);
        let b64 = removePrefix ? media : BASE64_PREFIX + media;
        if (team)
            if (team.media.indexOf(b64) === -1)
                team.media.push(b64);
    }

    /**
     * Adds comment onto the team
     * @param teamID - ID of the team
     * @param comment - Text of the comment
     */
    addComment(teamID: string, comment: string) {
        let team = this.get(teamID);
        if (team)
            team.comments.push(comment);
    }

    /**
     * Deletes all teams from the database
     */
    async deleteAll() {
        this.teamCache = [];
        await AsyncStorage.removeItem(SAVE_KEY);
    }

    /**
     * Saves data from the cache to the database
     */
    async save() {
        let jsonTeams = JSON.stringify(this.teamCache);
        await AsyncStorage.setItem(SAVE_KEY, jsonTeams);
    }

    /**
     * Loads the team cache
     */
    async load() {
        let jsonTeams = await AsyncStorage.getItem(SAVE_KEY);
        if (!jsonTeams)
            return;
        this.teamCache = JSON.parse(jsonTeams) as Team[];
    }
}