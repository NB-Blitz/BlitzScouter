import { ScoutingTemplate } from "../types/TemplateTypes";
import useStorage, { getStorage, putStorage } from "./useStorage";

/**
 * Grabs template data as a react hook
 * @param templateType - Type of the template
 * @returns current template data and a setting function
 */
export default function useTemplate(): [ScoutingTemplate, (template: ScoutingTemplate) => Promise<void>] {
    const [templateData, setTemplateData] = useStorage<ScoutingTemplate>("template", []);
    return [templateData, setTemplateData];
}

export async function getTemplate() {
    return await getStorage<ScoutingTemplate>("template");
}

export async function setTemplate(template: ScoutingTemplate) {
    return await putStorage<ScoutingTemplate>("template", template);
}