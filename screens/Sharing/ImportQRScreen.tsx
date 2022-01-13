import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDecompressedData } from '../../hooks/useCompressedData';

export default function ImportQRScreen() {
    const [importCompressedData] = useDecompressedData();

    const onScan = async (e: BarCodeEvent) => {
        const compressedData = e.data;
        importCompressedData(compressedData);
    };

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <BarCodeScanner
                onBarCodeScanned={onScan}
                style={StyleSheet.absoluteFillObject} />
        </View>
    );
}
