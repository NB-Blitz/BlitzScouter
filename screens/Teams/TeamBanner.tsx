import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View } from "react-native";
import BlitzDB from "../../api/BlitzDB";
import StandardButton from "../../components/common/StandardButton";

interface TeamBannerProps {
    teamID: string;
}

export default function TeamBanner(props: TeamBannerProps) {
    const navigator = useNavigation();

    const team = BlitzDB.teams.get(props.teamID);
    if (!team) {
        console.log("Could not find Team ID " + props.teamID);
        return null;
    }

    return (
        <View>

            <StandardButton
                iconData={team.media.length > 0 ? team.media[0] : undefined}
                iconType={team.media.length > 0 ? undefined : "ban"}
                title={team.name}
                subtitle={team.number.toString()}
                onPress={() => { navigator.navigate("Team", { teamID: team.id }) }} />

        </View>
    );
}