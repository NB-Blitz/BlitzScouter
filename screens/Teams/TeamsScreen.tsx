import * as React from 'react';
import { ActivityIndicator, Platform, ToastAndroid } from 'react-native';
import { DownloadTeams } from '../../api/TBAAdapter';
import ScrollContainer from '../../components/containers/ScrollContainer';
import NavTitle from '../../components/text/NavTitle';
import Text from '../../components/text/Text';
import useEvent from '../../hooks/useEvent';
import TeamBanner from './TeamBanner';

export default function TeamsScreen() {
    const [event, setEvent] = useEvent();
    const isLoaded = true; // TODO: Update this to check if the event is loaded

    const onRefresh = async () => {
        if (Platform.OS !== "android")
            return;
        const teamIDs = await DownloadTeams(event.id, false, () => { });
        if (teamIDs) {
            await setEvent({
                id: event.id,
                matchIDs: event.matchIDs,
                teamIDs,
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
            <NavTitle>Teams</NavTitle>
            {event.teamIDs.length > 0 ?
                event.teamIDs.map((teamID) => <TeamBanner teamID={teamID} key={teamID} />) :
                isLoaded ?
                    <Text>There is no team data yet. Download it under the settings tab.</Text> :
                    <ActivityIndicator size="large" color="#ffffff" />
            }


        </ScrollContainer>
    );
}
