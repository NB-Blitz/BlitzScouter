import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <StatusBar
                    animated={true}
                    backgroundColor="#141416"
                    style='light' />
                <RootNavigator />
            </SafeAreaProvider >
        );
    }
}