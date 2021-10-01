import { Alert } from 'react-native';
import { TBAEvent, TBAMatch, TBAMedia, TBATeam } from './DBModels';

const API_KEY = "i90dAcKHXvQ9havypHJKeGY8O1tfymFpaW1Po3RGYpvoMTRVwtiUsUFaLmstCDp3";
const URL_PREFIX = "https://www.thebluealliance.com/api/v3/";
const URL_SUFFIX = "?X-TBA-Auth-Key=" + API_KEY;
const YEAR = 2019;

export class TBA
{
    static getMatches(eventID: string)
    {
        return TBA._fetch<TBAMatch[]>("event/" + eventID + "/matches/simple");
    }

    static async getEvents()
    {
        return TBA._fetch<TBAEvent[]>("events/" + YEAR);
    }

    static async getTeams(eventID: string)
    {
        return TBA._fetch<TBATeam[]>("event/" + eventID + "/teams/simple");
    }

    static getTeamMedia(teamID: string)
    {
        return TBA._fetch<TBAMedia[]>("team/" + teamID + "/media/" + YEAR);
    }

    static async _fetch<Type>(path: string): Promise<Type | undefined>
    {
        try
        {
            let result = await fetch(URL_PREFIX + path + URL_SUFFIX);
            if (result.ok)
                return (await result.json()) as Type;
        }
        catch
        {
            Alert.alert("Error","Could not connect to The Blue Alliance");
        }
    }
}