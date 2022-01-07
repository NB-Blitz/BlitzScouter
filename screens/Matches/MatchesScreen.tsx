import * as React from 'react';
import { Platform, ToastAndroid } from 'react-native';
import { DownloadMatches } from '../../api/TBAAdapter';
import ScrollContainer from '../../components/containers/ScrollContainer';
import NavTitle from '../../components/text/NavTitle';
import Text from '../../components/text/Text';
import useEvent from '../../hooks/useEvent';
import MatchBanner from './MatchBanner';

export default function MatchesScreen() {
    const [event, setEvent] = useEvent();

    const onRefresh = async () => {
        const matchIDs = await DownloadMatches(event.id, () => { });
        if (matchIDs) {
            setEvent({
                id: event.id,
                matchIDs,
                teamIDs: event.teamIDs,
                year: event.year
            });
        }
        else if (Platform.OS === "android") {
            ToastAndroid.show("Failed to connect to TBA", 1000);
        }
    };

    return (
        <ScrollContainer onRefresh={onRefresh}>
            <NavTitle>Matches</NavTitle>
            {event.matchIDs.length > 0 ?
                event.matchIDs.map((teamID) => <MatchBanner matchID={teamID} key={teamID} />) :
                <Text>Match data has not been downloaded from TBA yet. Download is available under the settings tab.</Text>
            }
        </ScrollContainer>
    );
}