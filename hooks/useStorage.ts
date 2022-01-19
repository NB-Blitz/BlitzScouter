import AsyncStorage from "@react-native-async-storage/async-storage";
import EventEmitter from "eventemitter3";
import * as FileSystem from 'expo-file-system';
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
        else
            setData(defaultValue);
    };
    useEffect(() => {
        getData();
    }, [id, version, setData]);

    // Save Data
    const saveData = async (value: Type) => {
        const jsonData = JSON.stringify(value);
        await AsyncStorage.setItem(id, jsonData);
        setData(value);
        eventEmitter.emit(id);
    }
    useEffect(() => {
        const handleDataChange = () => {
            setVersion(v => v + 1);
        }

        eventEmitter.addListener(id, handleDataChange);
        return () => {
            eventEmitter.removeListener(id, handleDataChange);
        };
    }, [id, setVersion]);

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
    // AsyncStorage
    const keys = await AsyncStorage.getAllKeys();
    for (let key of keys) {
        await AsyncStorage.removeItem(key);
        eventEmitter.emit(key);
    }

    // FileSystem
    const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory ? FileSystem.documentDirectory : "");
    for (let file of files) {
        console.log(file);
        await FileSystem.deleteAsync(FileSystem.documentDirectory + file);
    }
}