import LZString from 'lz-string';
import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import QRCode from "react-qr-code";
import { BlitzDB } from '../../api/BlitzDB';
import { Container, HorizontalBar, Text } from '../../components/Themed';

const textData = "Pigeons in holes. Here there are n = 10 pigeons in m = 9 holes. Since 10 is greater than 9, the pigeonhole principle says that at least one hole has more than one pigeon. (The top left hole has 2 pigeons.) In mathematics, the pigeonhole principle states that if n items are put into m containers, with n > m, then at least one container must contain more than one item. For example, if one has three gloves (and none is ambidextrous/reversible), then there must be at least two right-handed gloves, or at least two left-handed gloves, because there are three objects, but only two categories of handedness to put them into.";

export default function SharingScreen() {

    const deviceWidth = Dimensions.get("window").width;

    const commentData = BlitzDB.exportComments();
    const compressedData = LZString.compress(commentData);
        
    return (
        <Container style={styles.container}>
            
            <QRCode
                value={compressedData}
                size={deviceWidth}
                bgColor='black'
                fgColor='white' />

        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 150,
        justifyContent: "center",
        flexDirection: "column"
    }
});
