import { ScoutingTemplate, TemplateType } from "../types/TemplateTypes";
import useStorage, { getStorage, putStorage } from "./useStorage";

/**
 * Grabs template data as a react hook
 * @param templateType - Type of the template
 * @returns current template data and a setting function
 */
export default function useTemplate(templateType: TemplateType): [ScoutingTemplate, (template: ScoutingTemplate) => Promise<void>] {
    const [templateData, setTemplateData] = useStorage<ScoutingTemplate>("template-" + templateType, []);
    return [templateData, setTemplateData];
}

export async function getTemplate(templateType: TemplateType) {
    return await getStorage<ScoutingTemplate>("template-" + templateType);
}

export async function setTemplate(type: TemplateType, template: ScoutingTemplate) {
    return await putStorage<ScoutingTemplate>("template-" + type, template);
}