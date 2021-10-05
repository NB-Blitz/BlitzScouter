import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from "react-qr-code";
import { Container } from '../../components/Themed';

export default function SharingScreen() {

    let tempString = "";
    for (let i = 0; i < 500; i++)
        tempString += Math.floor(Math.random() * 10).toString();
    return (
        <Container style={styles.container}>
            
            <QRCode
                value={tempString}
                size={350}
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
