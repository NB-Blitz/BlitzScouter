import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { ActivityIndicator, StyleSheet, ToastAndroid, View } from 'react-native';
import { DownloadTeams } from '../../api/TBAAdapter';
import Button from '../../components/common/Button';
import ScrollContainer from '../../components/containers/ScrollContainer';
import NavTitle from '../../components/text/NavTitle';
import Text from '../../components/text/Text';
import { PaletteContext } from '../../context/PaletteContext';
import useEvent from '../../hooks/useEvent';
import TeamBanner from '../Team/TeamBanner';

const TeamBannerHeight = 190;

export default function TeamsScreen() {
    const paletteContext = React.useContext(PaletteContext);
    const [event, setEvent] = useEvent();

    // Download Teams
    const onRefresh = async () => {
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

    const onFilter = () => {

    };

    return (
        <ScrollContainer onRefresh={onRefresh} key={event.id}>
            <View style={{ flexDirection: "row" }}>
                <NavTitle>Teams</NavTitle>
                <View style={styles.filterContainer}>
                    <Button style={styles.filterButton} onPress={onFilter}>
                        <MaterialIcons
                            name="filter-list"
                            size={24}
                            color={paletteContext.palette.textPrimary} />
                    </Button>
                </View>
            </View>


            {event.id === "bogus" ?
                <ActivityIndicator color={paletteContext.palette.textPrimary} size={40} /> :
                event.teamIDs.length <= 0 ?
                    <Text>This event has no teams posted yet. Pull down to refresh.</Text> :
                    event.teamIDs.map((teamID) => <TeamBanner teamID={teamID} key={teamID} />)
            }
        </ScrollContainer>
    );
}

const styles = StyleSheet.create({
    filterButton: {
        width: 42,
        height: 42,
        marginBottom: 12,
        marginRight: 5,
        alignSelf: "flex-end"
    },
    filterContainer: {
        flexDirection: "column",
        alignSelf: "flex-end",
        flex: 1
    }
})