import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Event, Match, Team } from "./DBModels";
import { TBA } from "./TBA";

const BASE64_PREFIX = "data:image/png;base64, ";
const MATCH_TYPES = ["qm", "qf", "sf", "f"];

export class BlitzDB
{
    static event?: Event;
    static currentTeams: Team[] = [];
    static teams: Team[] = [];

    static async download(eventID: string, setDownloadStatus: Function)
    {
        BlitzDB.event = {
            id: eventID,
            matches: [],
            teams: []
        };

        // Teams
        setDownloadStatus("Downloading Team Roster...");
        let tbaTeams = await TBA.getTeams(eventID);
        if (tbaTeams)
        {
            setDownloadStatus("Sorting Team Roster...");
            tbaTeams.sort((a, b) => a.team_number - b.team_number);
            for (let tbaTeam of tbaTeams)
            {
                let existingTeam = BlitzDB.getTeam(tbaTeam.key);
                if (!(existingTeam))
                {
                    BlitzDB.teams.push({
                        id: tbaTeam.key,
                        name: tbaTeam.nickname,
                        number: tbaTeam.team_number,
                        media: [],
                        comments: []
                    });
                }

                BlitzDB.event.teams.push(tbaTeam.key);
            }
        }
        else
        {
            setDownloadStatus("");
            return;
        }
        
        // Team Media
        let teamCount = 0;
        BlitzDB._loadCurrentTeams();
        for (let team of BlitzDB.currentTeams)
        {
            teamCount++;
            setDownloadStatus("Downloading Team Media... (" + teamCount + "/" + tbaTeams.length + ")");

            let mediaList = await TBA.getTeamMedia(team.id);
            if (mediaList)
            {
                for (let media of mediaList)
                {
                    // Get Image Data
                    let imageData: string | undefined;
                    if (media.details.base64Image)
                        imageData = BASE64_PREFIX + media.details.base64Image;
                    else if (media.details.model_image)
                        imageData = media.details.model_image;
                    else if (media.direct_url)
                        imageData = media.direct_url;

                    // Prevent Duplicate Images
                    if (imageData)
                        if (!team.media.find(media => media === imageData))
                            team.media.push(imageData);
                }
            }
        }

        // Matches
        setDownloadStatus("Downloading Match List...");
        let tbaMatches = await TBA.getMatches(eventID);
        if (tbaMatches)
        {
            setDownloadStatus("Sorting Match List");
            for (let tbaMatch of tbaMatches)
            {
                // Match Name
                let matchName = tbaMatch.comp_level + "-" + tbaMatch.match_number;
                switch (tbaMatch.comp_level)
                {
                    case "qm":
                        matchName = "Qualification " + tbaMatch.match_number;
                        break;
                    case "qf":
                        matchName = "Quarter-Finals " + tbaMatch.match_number;
                        break;
                    case "sf":
                        matchName = "Semi-Finals " + tbaMatch.match_number;
                        break;
                    case "f":
                        matchName = "Finals " + tbaMatch.match_number;
                        break;
                }

                // Match Description / Teams
                let matchDesc = "";
                let blueTeams = [];
                for (let teamKey of tbaMatch.alliances.blue.team_keys)
                {
                    let teamNumber = parseInt(teamKey.substring(3));
                    matchDesc += teamNumber + " ";
                    blueTeams.push(teamNumber);
                }
                matchDesc += " -  "
                let redTeams = [];
                for (let teamKey of tbaMatch.alliances.red.team_keys)
                {
                    let teamNumber = parseInt(teamKey.substring(3));
                    matchDesc += teamNumber + " ";
                    redTeams.push(teamNumber);
                }


                BlitzDB.event.matches.push({
                    id: tbaMatch.key,
                    name: matchName,
                    description: matchDesc,
                    number: tbaMatch.match_number,
                    compLevel: tbaMatch.comp_level,
                    blueTeams: blueTeams,
                    redTeams: redTeams,
                    comment: ""
                });
            }

            // Sort
            BlitzDB.event.matches.sort((a, b) => 
                (a.number + MATCH_TYPES.indexOf(a.compLevel) * 500) - (b.number + MATCH_TYPES.indexOf(b.compLevel) * 500)
            );
        }
        else
        {
            setDownloadStatus("");
            return;
        }

        // Save
        setDownloadStatus("Saving...");
        await BlitzDB.save();

        // Exit
        setDownloadStatus("");
        Alert.alert("Success", "Successfully downloaded data from The Blue Alliance.");
    }

    static addTeamMedia(teamID: string, imageData: string)
    {
        let team = BlitzDB.getTeam(teamID);
        if (team)
        {
            team.media.push(BASE64_PREFIX + imageData);
            BlitzDB.save();
        }
    }

    static getTeam(teamID: string): Team | undefined
    {
        return BlitzDB.teams.find(team => team.id === teamID);
    }

    static getMatch(matchID: string): Match | undefined
    {
        if (BlitzDB.event)
            return BlitzDB.event.matches.find(match => match.id === matchID);
    }

    static async loadSave()
    {
        let eventData = await AsyncStorage.getItem('event_data');
        if (eventData)
            BlitzDB.event = JSON.parse(eventData);

        let teamData = await AsyncStorage.getItem('team_data');
        if (teamData)
            BlitzDB.teams = JSON.parse(teamData);

        BlitzDB._loadCurrentTeams();
    }

    static async save()
    {
        if (BlitzDB.event)
            await AsyncStorage.setItem('event_data', JSON.stringify(BlitzDB.event));
        await AsyncStorage.setItem('team_data', JSON.stringify(BlitzDB.teams));
    }

    static async deleteAll(alert: boolean)
    {

        if (alert)
        {
            Alert.alert(
                "Are you sure?",
                "This will delete all scouting data from your device. Are you sure you want to continue?",
                [
                    {
                        text: "Confirm",
                        onPress: () => {
                            BlitzDB._deleteAll().then(() => {
                                Alert.alert("Done", "All data has been cleared");
                            });
                        }
                    },
                    {
                        text: "Cancel",
                        style: "cancel"
                    }
                ],
                {
                    cancelable: true
                }
            );
        }
        else
        {
            await this._deleteAll();
        }
    }

    static async _deleteAll()
    {
        BlitzDB.event = undefined;
        BlitzDB.currentTeams = [];
        BlitzDB.teams = [];
        await BlitzDB.save();
    }

    static _loadCurrentTeams()
    {
        BlitzDB.currentTeams = [];

        if (BlitzDB.event)
        {
            for (let teamID of BlitzDB.event.teams)
            {
                let team = BlitzDB.getTeam(teamID);
                if (team)
                    BlitzDB.currentTeams.push(team);
            }
        }
    }
}