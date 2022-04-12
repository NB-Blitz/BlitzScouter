import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import StandardButton from '../../components/common/StandardButton';
import Subtitle from '../../components/text/Subtitle';
import Text from '../../components/text/Text';
import Title from '../../components/text/Title';
import useQRHistory from '../../hooks/useQRHistory';


export default function ExportQRHistory({ route }: any) {
    const navigator = useNavigation<StackNavigationProp<any>>();
    const [qrHistory, setQRHistory] = useQRHistory();
    const [version, setVersion] = React.useState(0);

    // Sort By Date
    React.useEffect(() => {
        qrHistory.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
    }, [qrHistory])

    React.useEffect(() => {
        const interval = setInterval(() => {
            setVersion(v => v + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                <Title>QR History</Title>
                <Subtitle>Share Previous QR Codes</Subtitle>
                {qrHistory.length > 0 ?
                    qrHistory.map((scan, index) => {
                        const date = new Date(scan.timestamp);
                        const ms = Date.now() - Date.parse(scan.timestamp);
                        const s = Math.floor((ms / 1000) % 60);
                        const m = Math.floor(((ms / 1000) / 60) % 60);
                        const h = Math.floor(((ms / 1000) / 60) / 60);
                        const title = h + "h " + m + "m " + s + "s ago";
                        return (
                            <StandardButton
                                key={index}
                                iconType={"qr-code"}
                                title={title}
                                subtitle={scan.scoutIDs.length + " matches"}
                                onPress={() => { navigator.push("ExportQR", { scoutIDs: scan.scoutIDs }) }} />
                        );
                    }) :
                    <Text style={styles.text}>No history to display</Text>}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    text: {
        fontStyle: "italic",
        flex: 1,
        textAlign: "center",
        margin: 10
    }
});
