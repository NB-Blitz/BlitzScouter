import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BlitzDB } from '../../api/BlitzDB';
import TeamBanner from './TeamBanner';
import { Text, Title, ScrollContainer } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';

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
            <Title>Teams</Title>
            {teamList}
        </ScrollContainer>
    );
}

const styles = StyleSheet.create({});
