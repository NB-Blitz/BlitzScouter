import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LZString from 'lz-string';
import * as React from 'react';
import { Dimensions, StyleSheet, Vibration, View } from 'react-native';
import QRCode from 'react-qr-code';
import Button from '../../components/common/Button';
import Text from '../../components/text/Text';
import { getChecksum } from '../../hooks/useCompressedData';
import { usePalette } from '../../hooks/usePalette';
import useQRHistory from '../../hooks/useQRHistory';
import useScoutingData, { setScoutingData } from '../../hooks/useScoutingData';
import { QRHistory } from '../../types/OtherTypes';
import { ScoutingData } from '../../types/TemplateTypes';

const MAX_SIZE = 15;

export default function ExportQRScreen({ route }: any) {
    const navigator = useNavigation();
    const [palette] = usePalette();
    const [scoutingData] = useScoutingData();
    const [scoutingChunk, setScoutingChunk] = React.useState([] as ScoutingData[]);
    const [qrData, setQRData] = React.useState("");
    const [qrHistory, setQRHistory] = useQRHistory();

    const scoutIDs: (string[] | undefined) = route.params?.scoutIDs;

    const windowSize = Dimensions.get("window");
    const qrSize = Math.min(windowSize.width, windowSize.height);

    // Chunk Data
    React.useEffect(() => {
        if (scoutIDs !== undefined)
            setScoutingChunk(scoutingData.filter((scout) => scoutIDs.includes(scout.id)));
        else
            setScoutingChunk(scoutingData.filter((scout) => !(scout.isQRCodeScanned)).slice(0, MAX_SIZE)
            );
    }, [scoutingData]);

    // Compress Data
    React.useEffect(() => {
        const exportData = getChecksum(scoutingChunk) + "|" + scoutingChunk.map((scout) => scout.teamID + "," + scout.matchID + "," + scout.values.join(",")).join("|");
        const compressedData = LZString.compressToEncodedURIComponent(exportData);
        setQRData(compressedData);
    }, [scoutingChunk]);

    // QR Cycles
    const onCheck = () => {
        const history: QRHistory = {
            timestamp: (new Date()).toISOString(),
            scoutIDs: []
        }
        scoutingChunk.forEach((scout) => {
            scout.isQRCodeScanned = true;
            history.scoutIDs.push(scout.id);
        });
        setScoutingData(scoutingData);

        if (scoutIDs !== undefined) {
            if (navigator.canGoBack())
                navigator.goBack();
        } else {
            qrHistory.push(history);
            setQRHistory(qrHistory);
        }



        Vibration.vibrate(100);
    }
    const onHistory = () => {
        navigator.navigate("ExportQRHistory");
    }
    React.useLayoutEffect(() => {
        navigator.setOptions({
            headerRight: () => (
                <Button onPress={onHistory} style={styles.headerButton}>
                    <MaterialIcons name="history" size={25} color={palette.textPrimary} />
                </Button>
            )
        })
    })

    return (
        <View style={styles.container}>
            {scoutingChunk.length > 0 ?
                <View>
                    <QRCode
                        size={qrSize}
                        value={qrData}
                        bgColor="black"
                        fgColor="white"
                    />
                    <Text style={styles.text}>{scoutingChunk.length} / {scoutIDs !== undefined ? scoutingChunk.length : scoutingData.filter((scout) => !(scout.isQRCodeScanned)).length} Matches</Text>
                    <Button onPress={onCheck} style={[styles.checkButton, { backgroundColor: palette.navigationSelected }]}>
                        <MaterialIcons name={scoutingChunk.length === MAX_SIZE && scoutIDs === undefined ? "navigate-next" : "done"} size={40} color={palette.navigationTextSelected} />
                    </Button>
                </View>
                :
                <Text style={styles.text}>No Matches to Scan!</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
        marginTop: 5,
        color: "#fff"
    },
    headerButton: {
        alignSelf: "flex-end",
        margin: 11
    },
    checkButton: {
        width: 150,
        height: 60,
        marginTop: 20,
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 5
    }
});
