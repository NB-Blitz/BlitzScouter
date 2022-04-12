import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as React from 'react';
import { ActivityIndicator, Animated, StyleSheet, ToastAndroid, View } from 'react-native';
import { DownloadTeams } from '../../api/TBAAdapter';
import Button from '../../components/common/Button';
import ScrollContainer from '../../components/containers/ScrollContainer';
import NavTitle from '../../components/text/NavTitle';
import Text from '../../components/text/Text';
import useEvent from '../../hooks/useEvent';
import { usePalette } from '../../hooks/usePalette';
import { useEventStats } from '../../hooks/useStats';
import useTemplate from '../../hooks/useTemplate';
import TeamBanner from '../Team/TeamBanner';

interface StatData {
    index: number,
    teamID: string,
    avg: number
}

export default function TeamsScreen() {
    const [palette] = usePalette();
    const [event, setEvent] = useEvent();
    const [template] = useTemplate();
    const [stats, statVersion] = useEventStats();
    const [sortType, setSortType] = React.useState("-1");
    const [sortedTeamIDs, setSortedTeamIDs] = React.useState([] as string[]);
    const pickerRef = React.useRef() as React.MutableRefObject<Picker<string>>;
    const fadeAnim = React.useRef(new Animated.Value(1)).current;

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

    // Sort
    React.useEffect(() => {
        const sortIndex = parseInt(sortType);
        if (sortIndex === -1)
            setSortedTeamIDs(event.teamIDs);
        else
            setSortedTeamIDs(stats[sortIndex].teams
                .sort((a, b) => b.avg - a.avg)
                .map((stat) => stat.teamID));

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true
        }).start();

    }, [sortType, event, statVersion, setSortedTeamIDs]);
    const onSort = (type: string) => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true
        }).start(() => {
            setSortType(type);
        });
    }

    return (
        <ScrollContainer onRefresh={onRefresh} key={event.id}>
            <View style={{ flexDirection: "row" }}>
                <NavTitle style={{ marginBottom: 0 }}>Teams</NavTitle>
                <View style={styles.filterContainer}>
                    <Button style={styles.searchButton} onPress={() => { pickerRef.current.focus() }}>
                        <MaterialIcons
                            name="swap-vert"
                            size={24}
                            color={palette.textPrimary} />
                    </Button>
                </View>
            </View>

            <Picker
                ref={pickerRef}
                mode={"dropdown"}
                selectedValue={sortType}
                onValueChange={(type) => { onSort(type) }}
                dropdownIconColor={palette.background}

                style={{ alignSelf: "flex-end", minWidth: 200, color: palette.background }}>

                <Picker.Item
                    label="Team Number"
                    value={"-1"} />

                {template.filter((elem) => elem.value !== undefined).map((elem, index) =>
                    <Picker.Item
                        label={elem.label}
                        value={index}
                        key={index} />
                )}
            </Picker>

            <Animated.View style={{ opacity: fadeAnim }}>
                {event.id === "bogus" ?
                    <ActivityIndicator color={palette.textPrimary} size={40} /> :
                    event.teamIDs.length <= 0 ?
                        <Text>This event has no teams posted yet. Pull down to refresh.</Text> :
                        sortedTeamIDs.map((teamID) => <TeamBanner teamID={teamID} key={teamID} />)
                }
            </Animated.View>
        </ScrollContainer>
    );
}

const styles = StyleSheet.create({
    searchButton: {
        width: 46,
        height: 46,
        marginRight: 5,
        alignSelf: "flex-end"
    },
    filterContainer: {
        flexDirection: "column",
        alignSelf: "flex-end",
        flex: 1
    }
})