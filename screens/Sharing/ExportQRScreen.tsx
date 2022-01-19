import LZString from 'lz-string';
import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import QRCode from 'react-qr-code';

export default function ExportQRScreen({ route }: any) {
    const jsonData = route.params.data;
    const compressedData = LZString.compressToEncodedURIComponent(jsonData);

    const windowSize = Dimensions.get("window");
    const qrSize = Math.min(windowSize.width, windowSize.height);

    return (

        <View style={styles.container}>
            <QRCode
                size={qrSize}
                value={compressedData}
                bgColor="black"
                fgColor="white"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
    }
});
