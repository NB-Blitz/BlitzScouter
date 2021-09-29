import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from "react-qr-code";

import { Container } from '../components/Themed';

export default function SharingScreen() {
  return (
    <View style={styles.container}>
         <QRCode
            value={"Hello World!"}
            size={300}
            bgColor='black'
            fgColor='white' />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
