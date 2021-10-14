import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BlitzDB } from '../../api/BlitzDB';
import ScrollContainer from '../../components/containers/ScrollContainer';
import Text from '../../components/text/Text';
import MatchBanner from './MatchBanner';

export default function MatchesScreen()
{
    let matchDisplay: JSX.Element[] = [];

    if (BlitzDB.event)
        for (let match of BlitzDB.event.matches)
            matchDisplay.push( <MatchBanner matchID={match.id} key={match.id} /> );
    else
        matchDisplay.push( <Text key={1}>Match data has not been downloaded from TBA yet. Download is available under settings</Text> );

    return (
        <ScrollContainer>
            {matchDisplay}
        </ScrollContainer>
    );
}