import * as React from 'react';
import { ToastAndroid } from 'react-native';
import BlitzDB from '../../api/BlitzDB';
import ScrollContainer from '../../components/containers/ScrollContainer';
import NavTitle from '../../components/text/NavTitle';
import Text from '../../components/text/Text';
import MatchBanner from './MatchBanner';

export default function MatchesScreen() {
    const [version, setVersion] = React.useState(0);

    // Updates matches on refresh
    const onRefresh = async () => {
        let success = await BlitzDB.matches.downloadEvent(BlitzDB.event.id, () => { });
        if (!success)
            ToastAndroid.show("Failed to connect to TBA", 1000);
        else
            ToastAndroid.show("Updated match data", 1000);
        setVersion(version + 1);
    };

    // Adds MatchBanner to display if the event is downloaded
    let matchDisplay: JSX.Element[] = [];
    if (BlitzDB.event.isLoaded)
        if (BlitzDB.event.matchIDs.length > 0)
            for (let matchID of BlitzDB.event.matchIDs)
                matchDisplay.push(<MatchBanner matchID={matchID} key={matchID} />);
        else
            matchDisplay.push(<Text key={1}>This event has no matches posted yet!{"\n"}Pull down to refresh data.</Text>);
    else
        matchDisplay.push(<Text key={1}>Download match data from the Blue Alliance under the settings tab.</Text>);

    // Return
    return (
        <ScrollContainer onRefresh={onRefresh}>
            <NavTitle>Matches</NavTitle>
            {matchDisplay}
        </ScrollContainer>
    );
}