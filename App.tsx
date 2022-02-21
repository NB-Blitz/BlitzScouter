import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import { PaletteProvider, usePalette } from './hooks/usePalette';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const [palette] = usePalette();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <PaletteProvider>
                <StatusBar
                    animated={true}
                    backgroundColor={palette.headerBackground}
                    style='light' />
                <SafeAreaProvider>
                    <RootNavigator />
                </SafeAreaProvider >
            </PaletteProvider>
        );
    }
}