import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { BlitzDB } from "../../api/BlitzDB";
import Button from "../../components/common/Button";
import Text from "../../components/common/Text";
import TeamModal from "./TeamModal";

interface TeamBannerProps
{
    teamID: string;
}

export default function TeamBanner(props: TeamBannerProps)
{
    const [isVisible, setVisible] = React.useState(false);

    let team = BlitzDB.getTeam(props.teamID);
    if (!team)
    {
        console.log("Could not find Team ID " + props.teamID);
        return null;
    }

    return (<Button
        style={styles.teamButton}
        onPress={() => setVisible(true)}>
        
        <TeamModal teamID={team.id} isVisible={isVisible} setVisible={setVisible} />

        <Image style={styles.teamImage} fadeDuration={0} source={team.media.length > 0 ? {uri:team.media[0]} : {}} />

        <View>
            <Text style={styles.teamName}>{team.name}</Text>
            <Text style={styles.teamNumber}>{team.number}</Text>
        </View>
        
    </Button>);
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
