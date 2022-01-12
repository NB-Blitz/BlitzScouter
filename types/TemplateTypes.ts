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
    value: number | boolean | string | undefined;
}

export interface ElementProps {
    data: ElementData;
    isEditable: boolean;
    onChange?: (elementData: ElementData) => void,
    onRemove?: (elementData: ElementData) => void
}

export type ScoutingTemplate = ElementData[];

export interface ScoutingData {
    values: (number | boolean | string)[]
}