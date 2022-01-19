import * as React from 'react';
import { ActivityIndicator, Platform, ToastAndroid, View } from 'react-native';
import { DownloadMatches } from '../../api/TBAAdapter';
import ScrollContainer from '../../components/containers/ScrollContainer';
import NavTitle from '../../components/text/NavTitle';
import Text from '../../components/text/Text';
import { PaletteContext } from '../../context/PaletteContext';
import useEvent from '../../hooks/useEvent';
import MatchBanner from './MatchBanner';

export default function MatchesScreen() {
    const paletteContext = React.useContext(PaletteContext);
    const [event, setEvent] = useEvent();

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

    if (event.id === "bogus")
        return (
            <View style={{ alignSelf: "center", marginTop: 80 }}>
                <ActivityIndicator color={paletteContext.palette.textPrimary} size={40} />
            </View>
        );
    else
        return (
            <ScrollContainer onRefresh={onRefresh} key={event.id}>
                <NavTitle>Matches</NavTitle>
                {event.matchIDs.length <= 0 ?
                    <Text>This event has no matches posted yet. Pull down to refresh.</Text>
                    :
                    event.matchIDs.map((teamID) => <MatchBanner matchID={teamID} key={teamID} />)
                }
            </ScrollContainer>
        );
}