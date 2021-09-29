import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
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
            let image = team.thumb;
            teamDisplay.push(
                <Button style={styles.teamButton} key={key}>
                    <Image style={styles.teamImage} source={{uri:image}} />
                    <View>
                        <Text style={styles.teamName}>{team.nickname}</Text>
                        <Text style={styles.teamNumber}>{team.team_number}</Text>
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
        <Container>
            <Title>Teams</Title>
            {teamDisplay}
        </Container>
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
    },
});
