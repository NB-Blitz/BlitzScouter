import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, View } from "react-native";
import BlitzDB from "../../api/BlitzDB";
import StandardButton from "../../components/common/StandardButton";

interface MatchBannerProps {
    matchID: string;
}

export default function MatchBanner(props: MatchBannerProps) {
    const navigator = useNavigation();

    const match = BlitzDB.matches.get(props.matchID);
    if (!match)
        return null;

    return (
        <View>
            <StandardButton
                iconText={match.number.toString()}
                title={match.name}
                subtitle={match.description}
                onPress={() => { navigator.navigate("Match", { matchID: match.id }) }} />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    buttonTitle: {
        fontSize: 18
    },
    buttonSubtitle: {
        color: "#bbb"
    },
    matchThumbnail: {
        fontSize: 20,
        fontWeight: "bold",
        marginRight: 10,
        width: 35,
        height: 35,
        paddingTop: 5,
        textAlign: "center"
    }
});