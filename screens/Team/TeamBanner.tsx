import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { View } from "react-native";
import StandardButton from "../../components/common/StandardButton";
import { PaletteContext } from "../../context/PaletteContext";
import useTeam from "../../hooks/useTeam";

export default function TeamBanner(props: { teamID: string, onClick?: (teamID: string) => void }) {
    const navigator = useNavigation();
    const [team] = useTeam(props.teamID);
    const { palette } = useContext(PaletteContext);

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
                sidetitle={"#" + team.rank}
                onPress={onClick} />
        </View>
    );
}