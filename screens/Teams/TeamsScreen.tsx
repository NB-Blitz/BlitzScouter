import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { BlitzDB } from '../../api/BlitzDB';
import TeamBanner from './TeamBanner';
import { RootTabScreenProps } from '../../types';
import Title from '../../components/common/Title';
import ScrollContainer from '../../components/containers/ScrollContainer';

export default function TeamsScreen({ navigation }: RootTabScreenProps<'Teams'>) {
    const [version, setVersion] = React.useState(0);

    BlitzDB.eventEmitter.addListener("dataUpdate", () => {
        BlitzDB.eventEmitter.removeCurrentListener();
        setVersion(version + 1);
    });

    
    let teamList: JSX.Element[] = [];

    if (BlitzDB.currentTeamIDs.length > 0)
    {
        for (let teamID of BlitzDB.currentTeamIDs)
        {
            teamList.push(
                <TeamBanner teamID={teamID} key={teamID} />
            );
        }
    }
    else
    {
        teamList.push(
            <Text key={1}>Team data has not been downloaded from TBA yet. Download is available under settings</Text>
        );
    }

    return (
        <ScrollContainer>
            {teamList}
        </ScrollContainer>
    );
}
