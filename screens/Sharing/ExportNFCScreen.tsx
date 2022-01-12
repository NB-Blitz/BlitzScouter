import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../../components/text/Text';

export default function ExportNFCScreen() {

    return (

        <View style={styles.container}>
            <Text>Waiting for another device...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    }
});
