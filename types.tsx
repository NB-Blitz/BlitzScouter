/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { MatchProps } from './screens/Match/MatchScreen';
import { TeamProps } from './screens/Team/TeamScreen';
import { TeamMatchesProps } from './screens/TeamMatches/TeamMatchesScreen';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    Team: TeamProps;
    Match: MatchProps;
    TeamMatches: TeamMatchesProps;
};

/*
export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>;
*/

export type RootTabParamList = {
    Teams: undefined;
    Matches: undefined;
    Sharing: undefined;
    Settings: undefined;
};

/*
export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>;
*/
