import * as React from 'react';
import { ActivityIndicator, Platform, ToastAndroid } from 'react-native';
import { DownloadMatches } from '../../api/TBAAdapter';
import ScrollContainer from '../../components/containers/ScrollContainer';
import NavTitle from '../../components/text/NavTitle';
import Text from '../../components/text/Text';
import useEvent from '../../hooks/useEvent';
import MatchBanner from './MatchBanner';

export default function MatchesScreen() {
    const [event, setEvent] = useEvent();
    const isLoaded = true; // TODO: Update this to check if the event is loaded

    const onRefresh = async () => {
        if (Platform.OS !== "android")
            return;
        const matchIDs = await DownloadMatches(event.id, () => { });
        if (matchIDs) {
            await setEvent({
                id: event.id,
                matchIDs,
                teamIDs: event.teamIDs,
                year: event.year
            });
            ToastAndroid.show("Successfully updated from TBA", 1000);
        }
        else {
            ToastAndroid.show("Failed to connect to TBA", 1000);
        }
    };

    return (
        <ScrollContainer onRefresh={onRefresh} key={event.id}>
            <NavTitle>Matches</NavTitle>
            {event.matchIDs.length > 0 ?
                event.matchIDs.map((teamID) => <MatchBanner matchID={teamID} key={teamID} />) :
                isLoaded ?
                    <Text>There is no match data yet. Download it under the settings tab.</Text> :
                    <ActivityIndicator size="large" color="#ffffff" />
            }
        </ScrollContainer>
    );
}