import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, View } from "react-native";
import StandardButton from "../../components/common/StandardButton";
import useMatch from "../../hooks/useMatch";

export default function MatchBanner(props: { matchID: string }) {
    const navigator = useNavigation();
    const [match, setMatch] = useMatch(props.matchID);

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

});