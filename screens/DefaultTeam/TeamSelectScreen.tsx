import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import HorizontalBar from "../../components/common/HorizontalBar";
import Subtitle from "../../components/text/Subtitle";
import Title from "../../components/text/Title";
import useMatch from '../../hooks/useMatch';
import { TemplateType } from '../../types/TemplateTypes';
import TeamBanner from '../Teams/TeamBanner';

export default function TeamSelectScreen({ route }: any) {
    const navigator = useNavigation();
    const [match, setMatch] = useMatch(route.params.matchID);

    const onClick = (teamID: string) => {
        navigator.navigate("Scout", { targetID: teamID, templateType: TemplateType.Match });
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Title>{match.name}</Title>
                <Subtitle>Select the team to scout</Subtitle>

                <HorizontalBar />

                {match.redTeamIDs.map((teamID) => <TeamBanner teamID={teamID} onClick={onClick} key={teamID} />)}

                <HorizontalBar />

                {match.blueTeamIDs.map((teamID) => <TeamBanner teamID={teamID} onClick={onClick} key={teamID} />)}

                <HorizontalBar />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20
    }
});
