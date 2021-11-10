export enum TemplateType {
    Pit,
    Match
}

export enum ElementType {
    title,
    subtitle,
    text,
    hr
}

export interface ElementData {
    type: ElementType;
    label: string;
    options: any;
}

export type ScoutingTemplate = ElementData[];