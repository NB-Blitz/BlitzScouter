import React from "react";
import { StyleSheet, View } from "react-native";
import { BlitzDB } from "../../api/BlitzDB";
import StandardButton from "../../components/common/StandardButton";
import TeamModal from "./TeamModal";

interface TeamBannerProps {
    teamID: string;
}

export default function TeamBanner(props: TeamBannerProps) {
    const [isVisible, setVisible] = React.useState(false);

    let team = BlitzDB.getTeam(props.teamID);
    if (!team) {
        console.log("Could not find Team ID " + props.teamID);
        return null;
    }

    return (
        <View>

            <TeamModal
                teamID={team.id}
                isVisible={isVisible}
                setVisible={setVisible} />

            <StandardButton
                iconData={team.media.length > 0 ? team.media[0] : undefined}
                iconType={team.media.length > 0 ? undefined : "ban"}
                title={team.name}
                subtitle={team.number.toString()}
                onPress={() => { setVisible(true); }} />

        </View>
    );
}

const styles = StyleSheet.create({
    teamButton: {
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    teamImage: {
        width: 40,
        height: 40,
        marginRight: 10,
        resizeMode: 'stretch'
    },
    teamName: {
        fontSize: 18,
        textAlign: "left"
    },
    teamNumber: {
        color: "#bbb"
    }
});
