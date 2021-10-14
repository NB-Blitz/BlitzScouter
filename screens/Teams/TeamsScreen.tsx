import * as React from 'react';
import { BlitzDB } from '../../api/BlitzDB';
import TeamBanner from './TeamBanner';
import ScrollContainer from '../../components/containers/ScrollContainer';
import Text from '../../components/text/Text';

export default function TeamsScreen()
{
    let teamList: JSX.Element[] = [];
    
    if (BlitzDB.currentTeamIDs.length > 0)
        for (let teamID of BlitzDB.currentTeamIDs)
            teamList.push( <TeamBanner teamID={teamID} key={teamID} /> );
    else
        teamList.push( <Text key={1}>Team data has not been downloaded from TBA yet. Download is available under settings</Text> );

    return (
        <ScrollContainer>
            {teamList}
        </ScrollContainer>
    );
}
