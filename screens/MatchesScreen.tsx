import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TBA } from '../components/TBA';

import { Text, Container, Title, Button } from '../components/Themed';

export default function MatchesScreen() {
    let matchDisplay: JSX.Element[] = [];

    if (TBA.matches)
    {
        for (let match of TBA.matches)
        {
            let key = match.key;
            let matchName = match.comp_level + "-" + match.match_number;
            switch (match.comp_level)
            {
                case "qm":
                    matchName = "Qualification " + match.match_number;
                    break;
                case "qf":
                    matchName = "Quarter-Finals " + match.match_number;
                    break;
                case "sf":
                    matchName = "Semi-Finals " + match.match_number;
                    break;
                case "f":
                    matchName = "Finals " + match.match_number;
                    break;
            }

            let matchDesc = "";
            for (let team of match.alliances.blue.team_keys)
                matchDesc += team.substring(3) + " ";
            matchDesc += " -  "
            for (let team of match.alliances.red.team_keys)
                matchDesc += team.substring(3) + " ";

            matchDisplay.push(
                <Button style={styles.matchButton} key={key}>
                    <Text style={styles.matchName}>{matchName}</Text>
                    <Text style={styles.matchDesc}>{matchDesc}</Text>
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