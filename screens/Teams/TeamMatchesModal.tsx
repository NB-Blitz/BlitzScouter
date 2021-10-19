import React from "react";
import { Alert } from "react-native";
import { BlitzDB } from "../../api/BlitzDB";
import HorizontalBar from "../../components/common/HorizontalBar";
import Modal from "../../components/common/Modal";
import Subtitle from "../../components/text/Subtitle";
import Text from "../../components/text/Text";
import Title from "../../components/text/Title";
import MatchBanner from "../Matches/MatchBanner";

interface ModalProps {
    teamID: string;
    isVisible: boolean;
    setVisible: (isVisible: boolean) => void;
}

export default function TeamMatchesModal(props: ModalProps) {
    // Default Behaviour
    if (!props.isVisible)
        return null;

    // Grab Team Data
    let team = BlitzDB.getTeam(props.teamID);
    if (!(team) || !(BlitzDB.event)) {
        Alert.alert("Error", "There was an error grabbing team or event data. Try re-downloading TBA data then try again.");
        props.setVisible(false);
        return null;
    }

    // Matches
    let matchList = BlitzDB.getTeamMatches(props.teamID);
    let matchDisplay: JSX.Element[] = [];
    if (matchList.length > 0)
        for (let match of matchList)
            matchDisplay.push(<MatchBanner matchID={match.id} key={match.id} />);
    else
        matchDisplay.push(<Text key={1}>Match data has not been downloaded from TBA yet. Download is available under settings</Text>);

    // Return Modal
    return (
        <Modal setVisible={props.setVisible}>
            <Title>{team.name}</Title>
            <Subtitle>Team {team.number}'s Match List</Subtitle>
            <HorizontalBar />

            {matchDisplay}

            <HorizontalBar />

        </Modal>
    );
}