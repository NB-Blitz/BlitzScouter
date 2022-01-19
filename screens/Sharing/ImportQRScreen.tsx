import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import LZString from 'lz-string';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDataImporter } from '../../hooks/useCompressedData';

export default function ImportQRScreen() {
    const importJsonData = useDataImporter();

    const onScan = async (e: BarCodeEvent) => {
        const compressedData = e.data;
        const jsonData = LZString.decompressFromEncodedURIComponent(compressedData);
        if (jsonData)
            importJsonData(jsonData);
    };

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <BarCodeScanner
                onBarCodeScanned={onScan}
                style={StyleSheet.absoluteFillObject} />
        </View>
    );
}
