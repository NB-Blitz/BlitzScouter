import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { Alert } from "react-native";
import { putStorage } from "../hooks/useStorage";
import { Event, Match, Team } from "../types/DBTypes";
import { TBAMatch } from "../types/TBAModels";
import TBA from "./TBA";

const MATCH_TYPES = ["qm", "qf", "sf", "f"];

export async function DownloadEvent(eventID: string, includeMedia: boolean, callback: (status: string) => void) {

    // Matches
    const matchIDs = await DownloadMatches(eventID, matchNumber => {
        callback("Downloading Match " + matchNumber + "...");
    });
    if (matchIDs === undefined)
        return callback("");

    // Teams
    const teamIDs = await DownloadTeams(eventID, includeMedia, teamNumber => {
        callback("Downloading Team " + teamNumber + "...");
    });
    if (teamIDs === undefined)
        return callback("");

    // Event
    await putStorage<Event>("current-event", {
        id: eventID,
        year: parseInt(eventID.substring(0, 4)),
        matchIDs,
        teamIDs,
    });
    await putStorage("onboard", true);
    Alert.alert("Success", "Successfully downloaded data from The Blue Alliance.");
}

export async function DownloadMatches(eventID: string, callback: (matchNumber: number) => void) {
    const tbaMatches = await TBA.getMatches(eventID);
    if (!tbaMatches)
        return undefined;

    // Match Name
    const generateMatchName = (match: TBAMatch) => {
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

    // Match Description
    const generateMatchDescription = (match: TBAMatch) => {
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

    // Sort
    tbaMatches.sort((a, b) =>
        (a.match_number + MATCH_TYPES.indexOf(a.comp_level) * 1000) -
        (b.match_number + MATCH_TYPES.indexOf(b.comp_level) * 1000)
    );

    // Iterate
    let matchIDs: string[] = [];
    tbaMatches.forEach(match => {
        callback(match.match_number);
        matchIDs.push(match.key);
        putStorage<Match>(match.key, {
            id: match.key,
            name: generateMatchName(match),
            description: generateMatchDescription(match),
            number: match.match_number,
            compLevel: match.comp_level,
            blueTeamIDs: match.alliances.blue.team_keys,
            redTeamIDs: match.alliances.red.team_keys
        })
    });

    return matchIDs;
}

export async function DownloadTeams(eventID: string, downloadMedia: boolean, callback: (teamNumber: number) => void) {
    const tbaTeams = await TBA.getTeams(eventID);
    const tbaRanks = await TBA.getRankings(eventID);
    if (!tbaTeams)
        return undefined;
    const year = parseInt(eventID.substring(0, 4));

    // Sort
    tbaTeams.sort((a, b) => a.team_number - b.team_number);

    // Iterate
    let teamIDs: string[] = [];
    for (let team of tbaTeams) {
        callback(team.team_number);
        teamIDs.push(team.key);

        const currentTeamJSON = await AsyncStorage.getItem(team.key);
        const currentTeam = currentTeamJSON !== null ? (JSON.parse(currentTeamJSON) as Team) : undefined;

        // Media
        let mediaPaths: string[] = [];
        if (downloadMedia)
            mediaPaths = await DownloadMedia(team.key, year);
        else
            mediaPaths = currentTeam ? currentTeam.mediaPaths : [];

        // Ranks
        const rankingInfo = tbaRanks ? tbaRanks.rankings.find(rank => rank.team_key === team.key) : undefined;
        const rank = rankingInfo ? rankingInfo.rank : 0;
        const wins = rankingInfo ? rankingInfo.record.wins : 0;
        const losses = rankingInfo ? rankingInfo.record.losses : 0;
        const ties = rankingInfo ? rankingInfo.record.ties : 0;

        await putStorage<Team>(team.key, {
            id: team.key,
            name: team.nickname,
            number: team.team_number,
            rank,
            wins,
            losses,
            ties,
            mediaPaths
        });
    }

    return teamIDs;
}

export async function DownloadMedia(teamID: string, year: number) {
    const tbaMedia = await TBA.getTeamMedia(teamID, year);
    if (!tbaMedia)
        return [];

    let mediaPaths = [] as string[];
    for (let i = 0; i < tbaMedia.length; i++) {
        const media = tbaMedia[i];
        const mediaID = teamID + "_" + Math.random().toString(36).slice(2);

        if (media.details.base64Image) {
            const path = FileSystem.documentDirectory + mediaID + ".png";
            await FileSystem.writeAsStringAsync(path, media.details.base64Image, {
                encoding: FileSystem.EncodingType.Base64,
            });
            mediaPaths.push(path);
        }
        else if (media.direct_url) {
            const path = FileSystem.documentDirectory + mediaID + ".jpg";
            const download = await FileSystem.downloadAsync(media.direct_url, path);
            console.log("DOWNLOAD: " + media.direct_url + " (" + download.status + ")");
            if (download.status === 200)
                mediaPaths.push(path);
        }
    }

    return mediaPaths;
}