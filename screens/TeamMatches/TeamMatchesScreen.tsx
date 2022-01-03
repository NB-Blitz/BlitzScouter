import React from "react";
import { StyleSheet } from "react-native";
import Text from "../../components/text/Text";

export interface TeamMatchesProps {
    teamID: string;
}

export default function TeamMatchesScreen({ route }: any) {
    /*
    const teamID = route.params.teamID;

    // Matches
    let matchList = BlitzDB.getTeamMatches(teamID);
    let matchDisplay: JSX.Element[] = [];
    if (matchList.length > 0)
        for (let match of matchList)
            matchDisplay.push(<MatchBanner matchID={match.id} key={match.id} />);
    else
        matchDisplay.push(<Text key={1}>Match data has not been downloaded from TBA yet. Download is available under settings</Text>);

    // Return Modal
    return (
        <ScrollView>
            <View style={styles.container}>
                {matchDisplay}
            </View>
        </ScrollView>
    );
    */

    return (<Text>Depricated</Text>);
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    }
});
