import AsyncStorage from "@react-native-async-storage/async-storage";
import { ElementData, ScoutingTemplate, TemplateType } from "./models/TemplateModels";

const SAVE_KEY = "template-data";
const StringTypes = [
    "Pit",
    "Match"
];

/**
 * Handles scouting / pit scouting templates
 */
export default class TemplateDB {
    pitTemplate: ScoutingTemplate = [];
    matchTemplate: ScoutingTemplate = [];

    /**
     * Adds an element to a scouting template
     * @param templateType - Template to append to
     * @param element - Element to append
     */
    addElement(templateType: TemplateType, element: ElementData) {
        if (templateType === TemplateType.Match)
            this.matchTemplate.push(element);
        else
            this.pitTemplate.push(element);
    }

    /**
     * Gets the cooresponding template to the type
     * @param templateType - Type of template
     * @returns Template of that type
     */
    getTemplate(templateType: TemplateType) {
        if (templateType === TemplateType.Match)
            return this.matchTemplate;
        else
            return this.pitTemplate;
    }

    /**
     * Gets a string representation of the template type
     * @param templateType - Type of template
     * @returns String representation of the type (Ex: "Pit" or "Match")
     */
    getTemplateString(templateType: TemplateType) {
        return StringTypes[templateType];
    }

    /**
     * Saves all template data
     */
    async save() {
        let templateData = {
            match: this.matchTemplate,
            pit: this.pitTemplate
        };
        let jsonTemplates = JSON.stringify(templateData);
        await AsyncStorage.setItem(SAVE_KEY, jsonTemplates);
    }

    /**
     * Loads all template data
     */
    async load() {
        let jsonTemplates = await AsyncStorage.getItem(SAVE_KEY);
        if (!jsonTemplates)
            return;
        let templates = JSON.parse(jsonTemplates);
        this.pitTemplate = templates.pit;
        this.matchTemplate = templates.match;
    }
}