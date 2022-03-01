import { Linking } from 'react-native';
import { TBAEvent, TBAMatch, TBAMedia, TBARankings, TBAStatus, TBATeam, TBAZebra } from '../types/TBAModels';

const API_KEY = "i90dAcKHXvQ9havypHJKeGY8O1tfymFpaW1Po3RGYpvoMTRVwtiUsUFaLmstCDp3";
const URL_PREFIX = "https://www.thebluealliance.com/api/v3/";
const URL_SUFFIX = "?X-TBA-Auth-Key=" + API_KEY;
const TIMEOUT = 8000; // ms
export default class TBA {

    /**
     * Fetches all matches at a given event
     * @param eventID - ID of the event
     * @returns An array of TBAMatch
     */
    static getMatches(eventID: string) {
        return TBA._fetch<TBAMatch[]>("event/" + eventID + "/matches/simple");
    }

    /**
     * Fetches team stats and rankings at a given event
     * @param eventID - ID of the event
     * @returns Ranking data
     */
    static getRankings(eventID: string) {
        return TBA._fetch<TBARankings>("event/" + eventID + "/rankings");
    }

    /**
     * Fetches all events in a current year
     * @returns An array of TBAEvent
     */
    static async getEvents(year: number) {
        return TBA._fetch<TBAEvent[]>("events/" + year);
    }

    /**
     * Fetches Zebra Motionworks data for a match
     * @param matchID - ID of the match
     * @returns 
     */
    static async getZebra(matchID: string) {
        return TBA._fetch<TBAZebra>("match/" + matchID + "/zebra_motionworks");
    }

    /**
     * Fetches all teams at a given event
     * @param eventID - ID of the event
     * @returns An array of TBATeam
     */
    static async getTeams(eventID: string) {
        return TBA._fetch<TBATeam[]>("event/" + eventID + "/teams/simple");
    }


    /**
     * Fetches all media of a given team
     * @param teamID - ID of the team
     * @returns An array of TBAMedia
     */
    static getTeamMedia(teamID: string, year: number) {
        return TBA._fetch<TBAMedia[]>("team/" + teamID + "/media/" + year);
    }

    /**
     * Fetches the server status of The Blue Alliance
     * @returns Status in the form of TBAStatus
     */
    static getServerStatus() {
        return TBA._fetch<TBAStatus>("status");
    }

    /**
     * Opens a team in a new browser window
     * @param teamNumber - Number of the team
     */
    static openTeam(teamNumber: number, year?: number) {
        Linking.openURL("https://www.thebluealliance.com/team/" + teamNumber + "/" + (year ? year : ""));
    }

    /**
     * Opens a match in a new browser window
     * @param matchID - ID of the match
     */
    static openMatch(matchID: string) {
        Linking.openURL("https://www.thebluealliance.com/match/" + matchID);
    }

    /**
     * Fetches a url from the TBA API
     * @param path - API route
     * @returns The parsed response from the API
     */
    static _fetch<Type>(path: string): Promise<Type | undefined> {
        /*
            https://github.com/whatwg/fetch/issues/180

            TL;DR: fetch doesn't include a request timeout by default.
            While this solution does introduce memory leaks, there
            is no other option until a better solution is implemented.
        */

        // Fetch Promise
        const URL = URL_PREFIX + path + URL_SUFFIX;
        let fetchPromise = new Promise<Type | undefined>((resolve, reject) => {
            let headers = new Headers();
            headers.append("pragma", "no-cache");
            headers.append("cache-control", "no-cache");

            const REQUEST_DATA = {
                method: "GET",
                headers: headers
            };

            console.log("GET: " + URL);
            fetch(URL, REQUEST_DATA).then((result) => {
                result.json().then((json) => {
                    resolve(json);
                }).catch(() => {
                    resolve(undefined);
                });
            }).catch(() => {
                resolve(undefined);
            });
        });

        // Timeout Promise
        let timeoutPromise = new Promise<Type | undefined>((resolve, reject) => {
            setTimeout(() => {
                resolve(undefined);
            }, TIMEOUT);
        })

        return Promise.race<Type | undefined>([fetchPromise, timeoutPromise]);
    }
}