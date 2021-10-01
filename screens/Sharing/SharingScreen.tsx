import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from "react-qr-code";
import { Container } from '../../components/Themed';

export default function SharingScreen() {
  return (
    <Container style={styles.container}>
        
        <QRCode
            value={"Hello World!"}
            size={300}
            bgColor='black'
            fgColor='white' />

    </Container>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 150,
        justifyContent: "center",
        flexDirection: "row"
    }
});
