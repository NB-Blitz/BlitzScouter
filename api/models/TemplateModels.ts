export enum TemplateType {
    Pit,
    Match
}

export enum ElementType {
    title,
    subtitle,
    text,
    hr,
    counter,
    checkbox,
    textbox
}

export interface ElementData {
    id: string;
    type: ElementType;
    label: string;
    options: any;
}

export interface ElementProps {
    data: ElementData;
    isEditable: boolean;
    onChange?: (value: any) => void
}

export type ScoutingTemplate = ElementData[];