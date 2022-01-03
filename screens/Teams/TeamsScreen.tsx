import * as React from 'react';
import { ToastAndroid } from 'react-native';
import BlitzDB from '../../api/BlitzDB';
import ScrollContainer from '../../components/containers/ScrollContainer';
import NavTitle from '../../components/text/NavTitle';
import Text from '../../components/text/Text';
import TeamBanner from './TeamBanner';

export default function TeamsScreen() {
    const [version, setVersion] = React.useState(0);
    let teamList: JSX.Element[] = [];

    const onRefresh = async () => {
        let success = await BlitzDB.teams.downloadEvent(BlitzDB.event.id, () => { });
        if (!success)
            ToastAndroid.show("Failed to connect to TBA", 1000);
        else
            ToastAndroid.show("Updated team data", 1000);
        setVersion(version + 1);
    };

    if (BlitzDB.event.isLoaded) {
        if (BlitzDB.event.teamIDs.length > 0)
            for (let teamID of BlitzDB.event.teamIDs)
                teamList.push(<TeamBanner teamID={teamID} key={teamID} />);
        else
            teamList.push(<Text key={1}>This event has no team data posted yet! You can try refreshing by pulling down.</Text>);
    }
    else {
        teamList.push(<Text key={1}>Team data has not been downloaded from TBA yet. Download is available under settings</Text>);
    }

    return (
        <ScrollContainer onRefresh={onRefresh}>
            <NavTitle>Teams</NavTitle>
            {teamList}
        </ScrollContainer>
    );
}
