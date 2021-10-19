import { Linking } from 'react-native';
import { TBAEvent, TBAMatch, TBAMedia, TBAStatus, TBATeam } from './DBModels';

const API_KEY = "i90dAcKHXvQ9havypHJKeGY8O1tfymFpaW1Po3RGYpvoMTRVwtiUsUFaLmstCDp3";
const URL_PREFIX = "https://www.thebluealliance.com/api/v3/";
const URL_SUFFIX = "?X-TBA-Auth-Key=" + API_KEY;
const DEFAULT_YEAR = 2020;

export class TBA {
    static year = DEFAULT_YEAR;

    static getMatches(eventID: string) {
        return TBA._fetch<TBAMatch[]>("event/" + eventID + "/matches/simple");
    }

    static async getEvents() {
        return TBA._fetch<TBAEvent[]>("events/" + TBA.year);
    }

    static async getTeams(eventID: string) {
        return TBA._fetch<TBATeam[]>("event/" + eventID + "/teams/simple");
    }

    static getTeamMedia(teamID: string) {
        return TBA._fetch<TBAMedia[]>("team/" + teamID + "/media/" + TBA.year);
    }

    static getServerStatus() {
        return TBA._fetch<TBAStatus>("status");
    }

    static openTeam(teamNumber: number) {
        Linking.openURL("https://www.thebluealliance.com/team/" + teamNumber + "/" + TBA.year);
    }

    static openMatch(matchID: string) {
        Linking.openURL("https://www.thebluealliance.com/match/" + matchID);
    }

    static _fetch<Type>(path: string): Promise<Type | undefined> {
        /*
            https://github.com/whatwg/fetch/issues/180

            TL;DR; fetch doesn't include a timeout by default.
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
            }, 5000);
        })

        return Promise.race<Promise<Type | undefined>>([fetchPromise, timeoutPromise]);
    }
}