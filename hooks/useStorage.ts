import AsyncStorage from "@react-native-async-storage/async-storage";
import EventEmitter from "eventemitter3";
import { useEffect, useState } from "react";

const eventEmitter = new EventEmitter();

/**
 * Acts as a react hook for AsyncStorage
 * @param id - ID of the element
 * @param defaultValue - Default value of the element
 * @returns A react hook of the element
 */
export default function useStorage<Type>(id: string, defaultValue: Type): [Type, (value: Type) => Promise<void>] {
    const [version, setVersion] = useState(0);
    const [data, setData] = useState(defaultValue);

    // Grab Data
    const getData = async () => {
        const jsonData = await AsyncStorage.getItem(id);
        if (jsonData)
            setData(JSON.parse(jsonData) as Type);
    };
    useEffect(() => { getData(); }, [version]);

    // Save Data
    const saveData = async (value: Type) => {
        const jsonData = JSON.stringify(value);
        await AsyncStorage.setItem(id, jsonData);
        setData(value);
        eventEmitter.emit(id);
    }
    useEffect(() => {
        function handleDataChange() {
            setVersion(v => v + 1);
        }

        eventEmitter.addListener(id, handleDataChange);
        return () => { eventEmitter.removeListener(id, handleDataChange); }
    }, []);

    return [data, saveData];
}

/**
 * Puts a new element into AsyncStorage
 * @param id - ID of the element
 * @param value - Value of the element
 */
export async function putStorage<Type>(id: string, value: Type) {
    const jsonData = JSON.stringify(value);
    await AsyncStorage.setItem(id, jsonData);
    eventEmitter.emit(id);
}

/**
 * Gets a value from AsyncStorage
 * @param id - ID of the element
 * @returns value in AsyncStorage
 */
export async function getStorage<Type>(id: string) {
    const jsonData = await AsyncStorage.getItem(id);
    if (jsonData)
        return JSON.parse(jsonData) as Type;
}

/**
 * Removes all keys from AsyncStorage
 */
export async function clearStorage() {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.clear();
    for (let key of keys)
        eventEmitter.emit(key);
}