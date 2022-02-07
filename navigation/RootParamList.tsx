import { TemplateType } from "../types/TemplateTypes";

// Params
export type RootNavParamList = {
    Drawer: undefined,
    Onboarding: undefined,
    Match: { matchID: string },
    Team: { teamID: string },
    Media: { mediaPath: string, onDelete: (mediaPath: string) => void },
    Year: undefined,
    Regional: { year: number },
    Download: { eventID: string },
    EditTemplate: { templateType: TemplateType },
    ElementChooser: { templateType: TemplateType },
    TeamSelect: { matchID: string },
    Scout: { teamID: string, matchID: string, templateType: TemplateType },
    DefaultTeam: undefined,
    ExportQR: { data: string },
    ImportQR: undefined,
    PrintSummaryScreen: undefined,
    About: undefined,
    Palette: undefined,
    ColorPicker: { defaultColor: string, onPick: (color: string) => void }
};

// Default
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootNavParamList { }
    }
}