import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import LZString from 'lz-string';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useQRImporter } from '../../hooks/useCompressedData';

export default function ImportQRScreen() {
    const importQRData = useQRImporter();

    const onScan = async (e: BarCodeEvent) => {
        const compressedData = e.data;
        const rawData = LZString.decompressFromEncodedURIComponent(compressedData);
        if (rawData)
            importQRData(rawData);
    };

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <BarCodeScanner
                onBarCodeScanned={onScan}
                style={StyleSheet.absoluteFillObject} />
        </View>
    );
}
