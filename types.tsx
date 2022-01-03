/*
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
*/

/*
export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    Team: TeamProps;
    Match: MatchProps;
    TeamMatches: TeamMatchesProps;
    DefaultTeam: undefined;
};*/

/*
export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>;
*/

/*
export type RootTabParamList = {
    Teams: undefined;
    Matches: undefined;
    Sharing: undefined;
    Settings: undefined;
};*/

/*
export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>;
*/
