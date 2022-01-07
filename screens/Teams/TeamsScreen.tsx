import * as React from 'react';
import { Platform, ToastAndroid } from 'react-native';
import { DownloadTeams } from '../../api/TBAAdapter';
import ScrollContainer from '../../components/containers/ScrollContainer';
import NavTitle from '../../components/text/NavTitle';
import Text from '../../components/text/Text';
import useEvent from '../../hooks/useEvent';
import TeamBanner from './TeamBanner';

export default function TeamsScreen() {
    const [event, setEvent] = useEvent();

    const onRefresh = async () => {
        const teamIDs = await DownloadTeams(event.id, () => { });
        if (teamIDs) {
            setEvent({
                id: event.id,
                matchIDs: event.matchIDs,
                teamIDs,
                year: event.year
            });
        }
        else if (Platform.OS === "android") {
            ToastAndroid.show("Failed to connect to TBA", 1000);
        }
    };

    return (
        <ScrollContainer onRefresh={onRefresh}>
            <NavTitle>Teams</NavTitle>
            {event.teamIDs.length > 0 ?
                event.teamIDs.map((teamID) => <TeamBanner teamID={teamID} key={teamID} />) :
                <Text>Team data has not been downloaded from TBA yet. Download is available under the settings tab.</Text>
            }
        </ScrollContainer>
    );
}
