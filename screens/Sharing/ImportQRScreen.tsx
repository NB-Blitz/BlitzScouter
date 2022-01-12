import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ImportQRScreen() {

    const onScan = (e: BarCodeEvent) => {
        console.log(e);
    };

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <BarCodeScanner
                onBarCodeScanned={onScan}
                style={StyleSheet.absoluteFillObject} />
        </View>
    );
}
