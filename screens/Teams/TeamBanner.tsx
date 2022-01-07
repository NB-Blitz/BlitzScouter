import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View } from "react-native";
import StandardButton from "../../components/common/StandardButton";
import useTeam from "../../hooks/useTeam";

export default function TeamBanner(props: { teamID: string }) {
    const navigator = useNavigation();
    const [team, setTeam] = useTeam(props.teamID);

    return (
        <View>
            <StandardButton
                iconData={team.mediaPaths.length > 0 ? team.mediaPaths[0] : undefined}
                iconType={team.mediaPaths.length > 0 ? undefined : "do-not-disturb"}
                title={team.name}
                subtitle={team.number.toString()}
                onPress={() => { navigator.navigate("Team", { teamID: team.id }) }} />
        </View>
    );
}