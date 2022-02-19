import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View } from "react-native";
import StandardButton from "../../components/common/StandardButton";
import useTeam from "../../hooks/useTeam";

export default function TeamBanner(props: { teamID: string, onClick?: (teamID: string) => void }) {
    const navigator = useNavigation();
    const [team] = useTeam(props.teamID);

    // On Click
    const onClick = () => {
        if (props.onClick)
            props.onClick(team.id);
        else
            navigator.navigate("Team", { teamID: team.id });
    }

    // Image
    const teamIcon = team.mediaPaths.length > 0 ? team.mediaPaths[0] : undefined;

    return (
        <View>
            <StandardButton
                iconData={teamIcon}
                iconType={teamIcon ? undefined : "do-not-disturb"}
                title={team.name}
                subtitle={team.number.toString()}
                sidetitle={team.rank === 0 ? "" : "#" + team.rank}
                onPress={onClick} />
        </View>
    );
}