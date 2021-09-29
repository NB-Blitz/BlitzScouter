import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TBA } from '../components/TBA';

import { Text, Title, Container, Button } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TeamsScreen({ navigation }: RootTabScreenProps<'Teams'>) {
    let teamDisplay: JSX.Element[] = [];

    if (TBA.teams)
    {
        for (let team of TBA.teams)
        {
            let key = team.key;
            teamDisplay.push(
                <Button style={styles.teamButton} key={key}>
                    <Text style={styles.teamName}>{team.nickname}</Text>
                    <Text style={styles.teamNumber}>{team.team_number}</Text>
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
        <Container>
            <Title>Teams</Title>
            {teamDisplay}
        </Container>
    );
}

const styles = StyleSheet.create({
    teamButton: {
        alignItems: "flex-start",
    },
    teamName: {
        fontSize: 18,
        textAlign: "left"
    },
    teamNumber: {
        color: "#bbb"
    },
});
