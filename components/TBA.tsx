import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
const APIKey = "";
const prefix = "https://www.thebluealliance.com/api/v3/";
const suffix = "?X-TBA-Auth-Key=" + APIKey;

const MATCH_TYPES = ["qm", "qf", "sf", "f"];

export class TBA
{
    static eventID?: string;
    static teams?: any[];
    static matches?: any[];

    static async downloadData(id: string)
    {
        TBA.eventID = id;
        AsyncStorage.setItem('event_id', TBA.eventID);

        let teams = await this.getTeams();
        if (!(teams))
            return Alert.alert("Error","Could not connect to The Blue Alliance");
        TBA.teams = teams;
        TBA._sortTeams();
        AsyncStorage.setItem('team_data', JSON.stringify(teams));

        let matches = await this.getMatches();
        if (!(matches))
            return Alert.alert("Error","Could not connect to The Blue Alliance");
        TBA.matches = matches;
        this._sortMatches();
        AsyncStorage.setItem('match_data', JSON.stringify(matches));

        Alert.alert("Success", "Successfully downloaded data from The Blue Alliance");
    }

    static getEvents()
    {
        return TBA._fetch("events/2019");
    }

    static getTeams()
    {
        return TBA._fetch("event/" + TBA.eventID + "/teams/simple");
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
        return fetch(prefix + path + suffix).then(response => response.json());
    }
}