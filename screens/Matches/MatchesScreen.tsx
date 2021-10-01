import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BlitzDB } from '../../components/Database/BlitzDB';

import { Text, Container, Title, Button, ScrollContainer } from '../../components/Themed';
import MatchModal from './MatchModal';

export default function MatchesScreen() {
    const [matchID, setMatchID] = React.useState("");
    
    let matchDisplay: JSX.Element[] = [];

    if (BlitzDB.event)
    {
        for (let match of BlitzDB.event.matches)
        {
            matchDisplay.push(
                <Button
                    style={styles.matchButton}
                    key={match.id}
                    onPress={() => {setMatchID(match.id);}}>
                        
                    <Text style={styles.matchName}>{match.name}</Text>
                    <Text style={styles.matchDesc}>{match.description}</Text>
                </Button>
            );
        }
    }
    else
    {
        matchDisplay.push(
            <Text key={1}>Match data has not been downloaded from TBA yet. Download is available under settings</Text>
        );
    }

    return (
        <ScrollContainer>
            <Title>Matches</Title>
            {matchDisplay}

            <MatchModal matchID={matchID} setMatchID={setMatchID} />
        </ScrollContainer>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    matchButton: {
        alignItems: "flex-start"
    },
    matchName: {
        fontSize: 18,
        textAlign: "left"
    },
    matchDesc: {
        color: "#bbb"
    },
});