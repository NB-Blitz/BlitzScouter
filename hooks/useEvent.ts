import { Event } from "../types/DBTypes";
import useStorage, { getStorage } from "./useStorage";

const DEFAULT_EVENT: Event = {
    id: "bogus",
    matchIDs: [],
    teamIDs: [],
    year: 0
};

/**
 * Grabs the current event data as a react hook
 * @returns current event data and a setting function
 */
export default function useEvent(): [Event, (event: Event) => Promise<void>] {
    const [eventData, setEventData] = useStorage<Event>("current-event", DEFAULT_EVENT);
    return [eventData, setEventData];
}

/**
 * Grabs the current event data from storage
 * @returns current event data
 */
export async function getEvent() {
    return getStorage<Event>("current-event");
}