import { QRHistory } from "../types/OtherTypes";
import useStorage from "./useStorage";

/**
 * Grabs template data as a react hook
 * @param templateType - Type of the template
 * @returns current template data and a setting function
 */
export default function useQRHistory(): [QRHistory[], (history: QRHistory[]) => Promise<void>] {
    const [qrHistory, setQRHistory] = useStorage<QRHistory[]>("qrhistory", []);
    return [qrHistory, setQRHistory];
}