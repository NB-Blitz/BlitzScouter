import LZString from 'lz-string';
import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import QRCode from 'react-qr-code';
import useEvent from '../../hooks/useEvent';
import { getTeam } from '../../hooks/useTeam';

export default function ExportQRScreen() {
    const [event, setEvent] = useEvent();
    const [data, setData] = React.useState("");

    console.log(data);

    const getData = async () => {
        let newData = "";
        for (const teamID of event.teamIDs) {
            const team = await getTeam(teamID);
            if (team) {
                const scoutingData = team.scoutingData;
                for (const scout of scoutingData) {
                    newData += scout.values.join(" ") + " ";
                }
                newData += "+";
            }
        }
        setData(newData);
    };
    React.useEffect(() => {
        getData();
    }, [event]);

    const windowSize = Dimensions.get("window");
    const qrSize = Math.min(windowSize.width, windowSize.height);
    const compressedData = LZString.compress(data);

    return (

        <View style={styles.container}>

            <QRCode
                value={compressedData}
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
