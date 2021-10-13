import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BlitzDB } from '../../api/BlitzDB';
import Text from '../../components/common/Text';
import Title from '../../components/common/Title';
import ScrollContainer from '../../components/containers/ScrollContainer';
import MatchBanner from './MatchBanner';

export default function MatchesScreen() {
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