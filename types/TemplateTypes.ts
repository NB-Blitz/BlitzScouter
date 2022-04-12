export enum ElementType {
    title,
    subtitle,
    text,
    hr,
    counter,
    checkbox
}

export interface ElementData {
    id: string;
    type: ElementType;
    label: string;
    options: any;
    value?: number;
}

export interface ElementProps {
    data: ElementData;
    isEditable: boolean;
    onChange?: (elementData: ElementData) => void,
    onRemove?: (elementData: ElementData) => void,
    onUp?: (elementData: ElementData) => void,
    onDown?: (elementData: ElementData) => void,
}

export type ScoutingTemplate = ElementData[];

export interface ScoutingData {
    id: string,
    isQRCodeScanned?: boolean;
    matchID: string;
    teamID: string;
    values: number[]
}