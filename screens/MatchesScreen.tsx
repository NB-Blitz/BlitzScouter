import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TBA } from '../components/TBA';

import { Text, Container, Title, Button } from '../components/Themed';
import MatchModal from './MatchModal';

export default function MatchesScreen() {
    const [matchID, setMatchID] = React.useState("");
    
    let matchDisplay: JSX.Element[] = [];

    if (TBA.matches)
    {
        for (let match of TBA.matches)
        {
            let key = match.key;
            
            matchDisplay.push(
                <Button
                    style={styles.matchButton}
                    key={key}
                    onPress={() => {setMatchID(key);}}>
                        
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
        <Container>
            <Title>Matches</Title>
            {matchDisplay}

            <MatchModal matchID={matchID} setMatch={setMatchID} />
        </Container>
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