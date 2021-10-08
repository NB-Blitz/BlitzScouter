import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BlitzDB } from '../../api/BlitzDB';

import { Text, Container, Title, Button, ScrollContainer } from '../../components/Themed';
import MatchBanner from './MatchBanner';
import MatchModal from './MatchModal';

export default function MatchesScreen() {
    const [matchID, setMatchID] = React.useState("");
    const [version, setVersion] = React.useState(0);

    BlitzDB.eventEmitter.addListener("dataUpdate", () => {
        BlitzDB.eventEmitter.removeCurrentListener();
        setVersion(version + 1);
    });

    
    let matchDisplay: JSX.Element[] = [];

    if (BlitzDB.event)
    {
        for (let match of BlitzDB.event.matches)
        {
            matchDisplay.push(
                <MatchBanner matchID={match.id} key={match.id} />
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