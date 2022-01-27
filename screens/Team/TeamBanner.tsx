import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View } from "react-native";
import StandardButton from "../../components/common/StandardButton";
import useStats from "../../hooks/useStats";
import useTeam from "../../hooks/useTeam";

export default function TeamBanner(props: { teamID: string, onClick?: (teamID: string) => void }) {
    const navigator = useNavigation();
    const [team] = useTeam(props.teamID);
    const stats = useStats(props.teamID);

    const onClick = () => {
        if (props.onClick)
            props.onClick(team.id);
        else
            navigator.navigate("Team", { teamID: team.id });
    }

    return (
        <View>
            <StandardButton
                iconData={team.mediaPaths.length > 0 ? team.mediaPaths[0] : undefined}
                iconType={team.mediaPaths.length > 0 ? undefined : "do-not-disturb"}
                title={team.name}
                subtitle={team.number.toString()}
                onPress={onClick} />
        </View>
    );
}