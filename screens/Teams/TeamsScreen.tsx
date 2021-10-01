import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { BlitzDB } from '../../components/Database/BlitzDB';
import { Text, Title, Button, ScrollContainer } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import TeamModal from './TeamModal';

export default function TeamsScreen({ navigation }: RootTabScreenProps<'Teams'>) {
    const [teamID, setTeamID] = React.useState("");
    
    let teamDisplay: JSX.Element[] = [];

    if (BlitzDB.currentTeams.length > 0)
    {
        for (let team of BlitzDB.currentTeams)
        {
            teamDisplay.push(
                <Button
                    style={styles.teamButton}
                    key={team.id}
                    onPress={() => setTeamID(team.id)}>
                    
                    <Image style={styles.teamImage} source={team.media.length > 0 ? {uri:team.media[0]} : {}} />

                    <View>
                        <Text style={styles.teamName}>{team.name}</Text>
                        <Text style={styles.teamNumber}>{team.number}</Text>
                    </View>
                    
                </Button>
            );
        }
    }
    else
    {
        teamDisplay.push(
            <Text key={1}>Team data has not been downloaded from TBA yet. Download is available under settings</Text>
        );
    }

    return (
        <ScrollContainer>
            <TeamModal teamID={teamID} setTeamID={setTeamID} />

            <Title>Teams</Title>
            {teamDisplay}
        </ScrollContainer>
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
