
// Params
export type RootNavParamList = {
    Drawer: undefined,
    Match: { matchID: string },
    Team: { teamID: string },
    Media: { mediaPath: string },
    Year: undefined,
    Regional: { year: number },
    /*
    EditTemplate: { templateType: TemplateType },
    ElementChooser: { templateType: TemplateType },
    Scout: { templateType: TemplateType }
    */
};

// Default
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootNavParamList { }
    }
}