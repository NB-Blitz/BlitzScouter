import * as React from 'react';
import { StyleSheet, ToastAndroid } from 'react-native';
import { BlitzDB } from '../../api/BlitzDB';
import ScrollContainer from '../../components/containers/ScrollContainer';
import Text from '../../components/text/Text';
import MatchBanner from './MatchBanner';

export default function MatchesScreen()
{
    const [version, setVersion] = React.useState(0);
    let matchDisplay: JSX.Element[] = [];

    const onRefresh = async () => {
        let success = await BlitzDB.downloadMatches();
        if (!success)
            ToastAndroid.show("Failed to connect to TBA", 1000);
        else
            ToastAndroid.show("Updated match data!", 1000);
        setVersion(version + 1);
    };

    if (BlitzDB.event)
        for (let match of BlitzDB.event.matches)
            matchDisplay.push( <MatchBanner matchID={match.id} key={match.id} /> );
    else
        matchDisplay.push( <Text key={1}>Match data has not been downloaded from TBA yet. Download is available under settings</Text> );

    return (
        <ScrollContainer onRefresh={onRefresh}>
            {matchDisplay}
        </ScrollContainer>
    );
}