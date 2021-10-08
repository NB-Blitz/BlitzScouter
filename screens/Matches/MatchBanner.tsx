import React from "react";
import { StyleSheet } from "react-native";
import { BlitzDB } from "../../api/BlitzDB";
import { Button, Text } from "../../components/Themed";
import MatchModal from "./MatchModal";

interface MatchBannerProps
{
    matchID: string;
}

export default function MatchBanner(props: MatchBannerProps)
{
    const [isVisible, setVisible] = React.useState(false);

    let match = BlitzDB.getMatch(props.matchID);
    if (!match)
        return null;

    return (<Button
        style={styles.matchButton}
        onPress={() => { setVisible(true) }}>

        <MatchModal matchID={match.id} isVisible={isVisible} setVisible={setVisible} />
            
        <Text style={styles.matchName}>{match.name}</Text>
        <Text style={styles.matchDesc}>{match.description}</Text>
    </Button>);
}

const styles = StyleSheet.create({
    matchButton: {
        alignItems: "flex-start"
    },
    matchName: {
        fontSize: 18,
        textAlign: "left"
    },
    matchDesc: {
        color: "#bbb"
    },
});