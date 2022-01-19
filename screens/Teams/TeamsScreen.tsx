import * as React from 'react';
import { ActivityIndicator, Platform, ToastAndroid, View } from 'react-native';
import { DownloadTeams } from '../../api/TBAAdapter';
import ScrollContainer from '../../components/containers/ScrollContainer';
import NavTitle from '../../components/text/NavTitle';
import Text from '../../components/text/Text';
import { PaletteContext } from '../../context/PaletteContext';
import useEvent from '../../hooks/useEvent';
import TeamBanner from './TeamBanner';

export default function TeamsScreen() {
    const paletteContext = React.useContext(PaletteContext);
    const [event, setEvent] = useEvent();

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

    if (event.id === "bogus")
        return (
            <View style={{ alignSelf: "center", marginTop: 80 }}>
                <ActivityIndicator color={paletteContext.palette.textPrimary} size={40} />
            </View>
        );
    else
        return (
            <ScrollContainer onRefresh={onRefresh} key={event.id}>
                <NavTitle>Teams</NavTitle>
                {event.teamIDs.length <= 0 ?
                    <Text>This event has no teams posted yet. Pull down to refresh.</Text>
                    :
                    event.teamIDs.map((teamID) => <TeamBanner teamID={teamID} key={teamID} />)
                }
            </ScrollContainer>
        );
}
