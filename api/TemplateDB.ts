import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import BlitzDB from "./BlitzDB";
import { ElementData, ScoutingTemplate } from "./models/TemplateModels";

/**
 * Handles scouting / pit scouting templates
 */
export default class TemplateDB {
    template: ScoutingTemplate = [];
    saveKey: string;

    constructor(saveKey: string) {
        this.saveKey = saveKey;
    }

    /**
     * Adds an element to a scouting template
     * @param element - Element to append
     */
    addElement(element: ElementData) {
        this.template.push(element);
        this.save();
    }

    /**
     * Sets all data of an element
     * @param element - Element to set
     */
    setElement(element: ElementData) {
        let index = this.template.findIndex(e => e.id === element.id);
        if (index >= 0)
            this.template[index] = element;
        else
            console.error("Could not find element of id:" + element.id)
    }

    /**
     * Replaces the current template
     * @param template - Replacement template
     */
    setTemplate(template: ScoutingTemplate) {
        this.template = template;
    }

    /**
     * Subscribes to a template as a react hook
     * @returns React Hook of the template
     */
    useTemplate() {
        const [version, setVersion] = React.useState(0);

        useEffect(() => {
            function onTemplateChange() {
                setVersion(v => v + 1);
            }

            BlitzDB.eventEmitter.addListener("template", onTemplateChange);
            return () => { BlitzDB.eventEmitter.removeListener("template", onTemplateChange); }
        }, []);

        return this.template;
    }

    /**
     * Saves all template data
     */
    async save() {
        let jsonTemplates = JSON.stringify(this.template);
        await AsyncStorage.setItem(this.saveKey, jsonTemplates);
        BlitzDB.eventEmitter.emit("template");
    }

    /**
     * Loads all template data
     */
    async load() {
        let jsonTemplates = await AsyncStorage.getItem(this.saveKey);
        if (!jsonTemplates)
            return;
        this.template = JSON.parse(jsonTemplates);
    }
}