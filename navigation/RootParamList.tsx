import { TemplateType } from "../api/models/TemplateModels";

// Params
export type RootNavParamList = {
    Drawer: undefined,
    Match: { matchID: string },
    Team: { teamID: string },
    Media: { teamID: string, imageIndex: number },
    Scout: { templateType: TemplateType }
    Year: undefined,
    Regional: { year: number },
    EditTemplate: { templateType: TemplateType },
    ElementChooser: { templateType: TemplateType }
};

// Default
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootNavParamList { }
    }
}