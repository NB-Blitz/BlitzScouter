import { TemplateType } from "../types/TemplateTypes";

// Params
export type RootNavParamList = {
    Drawer: undefined,
    Match: { matchID: string },
    Team: { teamID: string },
    Media: { mediaPath: string, onDelete: (mediaPath: string) => void },
    Year: undefined,
    Regional: { year: number },
    EditTemplate: { templateType: TemplateType },
    ElementChooser: { templateType: TemplateType },
    TeamSelect: { matchID: string },
    Scout: { targetID: string, templateType: TemplateType },
    DefaultTeam: undefined,
    ExportQR: undefined,
    ImportQR: undefined
};

// Default
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootNavParamList { }
    }
}