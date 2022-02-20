import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LZString from 'lz-string';
import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import QRCode from 'react-qr-code';
import Button from '../../components/common/Button';
import Text from '../../components/text/Text';
import { getChecksum } from '../../hooks/useCompressedData';
import useEvent from '../../hooks/useEvent';
import { usePalette } from '../../hooks/usePalette';
import useScoutingData from '../../hooks/useScoutingData';

const CHUNK_SIZE = 10;

export default function ExportQRScreen({ route }: any) {
    const [palette] = usePalette();
    const navigator = useNavigation();
    const [scoutingData] = useScoutingData();
    const [event] = useEvent();
    const [outputData, setOutputData] = React.useState([] as string[]);
    const [qrIndex, setQRIndex] = React.useState(0);

    React.useEffect(() => {
        const splitScoutingData = [];
        for (let i = 0; i < scoutingData.length; i += CHUNK_SIZE)
            splitScoutingData.push(scoutingData.slice(i, i + CHUNK_SIZE));

        setOutputData(splitScoutingData.map(data => {
            const exportData = JSON.stringify({
                eventID: event.id,
                exportID: getChecksum(data),
                scoutingData: data
            });

            return LZString.compressToEncodedURIComponent(exportData);
        }));
    }, [scoutingData, event]);

    const cycleForward = () => {
        setQRIndex((qrIndex + 1) % outputData.length);
    }
    const cycleBackward = () => {
        setQRIndex((qrIndex - 1 + outputData.length) % outputData.length);
    }
    React.useLayoutEffect(() => {
        navigator.setOptions({
            headerRight: () => (
                <View style={styles.headerButtons}>
                    <Button onPress={cycleBackward}>
                        <MaterialIcons name="fast-rewind" size={25} color={palette.textPrimary} />
                    </Button>
                    <Button onPress={cycleForward} style={{ marginRight: 11 }}>
                        <MaterialIcons name="fast-forward" size={25} color={palette.textPrimary} />
                    </Button>
                </View>
            )
        })
    })

    const windowSize = Dimensions.get("window");
    const qrSize = Math.min(windowSize.width, windowSize.height);

    return (
        <View style={styles.container}>
            {outputData.length > 0 ?
                <View>
                    <QRCode
                        size={qrSize}
                        value={outputData[qrIndex]}
                        bgColor="black"
                        fgColor="white"
                    />
                    <Text style={styles.text}>QRCode {qrIndex + 1} / {outputData.length}</Text>
                    <Text style={styles.text}>Lines {qrIndex * CHUNK_SIZE} - {(qrIndex + 1) * CHUNK_SIZE}</Text>
                </View>
                :
                <Text style={styles.text}>Loading...</Text>
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
    headerButtons: {
        alignSelf: "flex-end",
        flexDirection: "row"
    }
});
