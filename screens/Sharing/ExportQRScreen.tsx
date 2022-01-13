import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import QRCode from 'react-qr-code';
import { useCompressedData } from '../../hooks/useCompressedData';

export default function ExportQRScreen() {
    const data = useCompressedData();

    const windowSize = Dimensions.get("window");
    const qrSize = Math.min(windowSize.width, windowSize.height);

    return (

        <View style={styles.container}>

            <QRCode
                value={data}
                size={qrSize}
                bgColor="black"
                fgColor="white"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        justifyContent: "center",
        backgroundColor: "black",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});
