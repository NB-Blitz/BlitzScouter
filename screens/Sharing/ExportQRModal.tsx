import LZString from 'lz-string';
import * as React from 'react';
import { Dimensions, Modal, StyleSheet, View } from 'react-native';
import QRCode from 'react-qr-code';
import DarkBackground from '../../components/common/DarkBackground';

export interface ModalProps {
    isVisible: boolean;
    setVisible: (isVisible: boolean) => void;
}

export default function ExportQRModal(props: ModalProps) {
    // Default Behaviour
    if (!props.isVisible)
        return null;

    const windowSize = Dimensions.get("window");
    const qrSize = Math.min(windowSize.width, windowSize.height);
    const commentData = ""; // BlitzDB.exportComments();
    const compressedData = LZString.compress(commentData);

    return (
        <Modal
            animationType="fade"
            onRequestClose={() => props.setVisible(false)} >

            <View style={styles.container}>
                <DarkBackground isTransparent={false} />

                <QRCode
                    value={compressedData}
                    size={qrSize}
                    bgColor="black"
                    fgColor="white"
                />
            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        justifyContent: "center",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});
