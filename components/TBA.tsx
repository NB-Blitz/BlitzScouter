import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import Match, { Team } from './TBAModels';
const APIKey = "";
const prefix = "https://www.thebluealliance.com/api/v3/";
const suffix = "?X-TBA-Auth-Key=" + APIKey;

const MATCH_TYPES = ["qm", "qf", "sf", "f"];
const YEAR = 2019;
const BASE64_PREFIX = "data:image/png;base64, ";

export class TBA
{
    static eventID?: string;
    static teams?: Team[];
    static matches?: Match[];

    static async downloadData(id?: string, setDownloadStatus?: Function)
    {
        // Check ID
        if (id)
        {
            TBA.eventID = id;
            await AsyncStorage.setItem('event_id', TBA.eventID);
        }

        // Teams
        if (setDownloadStatus)
            setDownloadStatus("Downloading Team Roster...");
        let teams = await this.getTeams();
        if (!(teams))
        {
            if (setDownloadStatus)
                setDownloadStatus("");
            return;
        }

        TBA.teams = teams;

        // Sort Teams
        if (setDownloadStatus)
            setDownloadStatus("Sorting Team Roster...");
        TBA._sortTeams();

        // Team Media
        let teamCount = 0;
        for (let team of teams)
        {
            teamCount++;
            if (setDownloadStatus)
                setDownloadStatus("Downloading Team Media... (" + teamCount + "/" + teams.length + ")");
            team.media = [];
            let media = await TBA.getTeamMedia(team.key);

            if (!(media))
            {
                if (setDownloadStatus)
                    setDownloadStatus("");
                return;
            }

            if (media.length > 0)
            {
                if ("base64Image" in media[0].details)
                    team.media.push(BASE64_PREFIX + media[0].details.base64Image);
            }
        }

        // Matches
        if (setDownloadStatus)
                setDownloadStatus("Downloading Match List");
        let matches = await this.getMatches();
        if (!(matches))
        {
            if (setDownloadStatus)
                setDownloadStatus("");
            return;
        }
        TBA.matches = matches;

        // Sort Matches
        if (setDownloadStatus)
            setDownloadStatus("Sorting Match List");
        this._sortMatches();

        // Match Data
        for (let match of matches)
        {
            // Name
            let matchName = match.comp_level + "-" + match.match_number;
            switch (match.comp_level)
            {
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
            match.name = matchName;

            // Description
            let matchDesc = "";
            for (let team of match.alliances.blue.team_keys)
                matchDesc += team.substring(3) + " ";
            matchDesc += " -  "
            for (let team of match.alliances.red.team_keys)
                matchDesc += team.substring(3) + " ";

            match.description = matchDesc;
        }

        // Save Data
        await AsyncStorage.setItem('match_data', JSON.stringify(matches));
        await AsyncStorage.setItem('team_data', JSON.stringify(teams));

        if (setDownloadStatus)
            setDownloadStatus("");
        Alert.alert("Success", "Successfully downloaded data from The Blue Alliance.");
    }

    static getEvents()
    {
        return TBA._fetch("events/" + YEAR);
    }

    static getTeams()
    {
        return TBA._fetch("event/" + TBA.eventID + "/teams/simple");
    }

    static getTeamMedia(teamKey: string)
    {
        return TBA._fetch("team/" + teamKey + "/media/" + YEAR);
    }
    
    static getTeam(teamKey: string)
    {
        if (!(TBA.teams))
            return undefined;
        return TBA.teams.find((value) => value.key === teamKey);
    }

    static addTeamMedia(teamKey: string, media: string)
    {
        let team = this.getTeam(teamKey);
        if (team)
            team.media.push(BASE64_PREFIX + media);
    }

    static getMatch(matchKey: string)
    {
        if (!(TBA.matches))
            return undefined;
        return TBA.matches.find((value) => value.key === matchKey);
    }

    static getMatches()
    {
        return TBA._fetch("event/" + TBA.eventID + "/matches/simple");
    }

    static async loadSave()
    {
        if (TBA.eventID)
            return;
        
        let id = await AsyncStorage.getItem('event_id');
        if (id)
            TBA.eventID = id;

        let matches = await AsyncStorage.getItem('match_data');
        if (matches)
            TBA.matches = JSON.parse(matches);

        let teams = await AsyncStorage.getItem('team_data');
        if (teams)
            TBA.teams = JSON.parse(teams);
    }

    static _sortMatches()
    {
        if (TBA.matches)
        {
            TBA.matches.sort((a, b) => 
                (a.match_number + MATCH_TYPES.indexOf(a.comp_level) * 500) - (b.match_number + MATCH_TYPES.indexOf(b.comp_level) * 500)
            )
        }
    }

    static _sortTeams()
    {
        if (TBA.teams)
        {
            TBA.teams.sort((a, b) => 
                (a.team_number - b.team_number)
            )
        }
    }

    static _fetch(path: string): Promise<any>
    {
        return fetch(prefix + path + suffix).then(response => {
            if (response.ok)
                return response.json();
        }).catch((error) => {
            Alert.alert("Error","Could not connect to The Blue Alliance");
            console.error(error);
        });
    }
}