import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import TBA from "../../api/TBA";
import { DownloadEvent } from "../../api/TBAAdapter";
import Button from "../../components/common/Button";
import ScrollContainer from "../../components/containers/ScrollContainer";
import Text from "../../components/text/Text";
import { PaletteContext } from "../../context/PaletteContext";
import { TBAEvent } from "../../types/TBAModels";
import DownloadingModal from "./DownloadingModal";

export default function RegionalScreen({ route }: any) {
    const paletteContext = React.useContext(PaletteContext);
    const navigator = useNavigation();
    const [searchTerm, updateSearch] = React.useState("");
    const [regionalList, updateRegionals] = React.useState([] as TBAEvent[]);
    const [downloadStatus, setDownloadStatus] = React.useState("");
    const year = route.params.year;

    const downloadEvent = (eventID: string) => {
        DownloadEvent(eventID, setDownloadStatus).then(() => {
            navigator.goBack();
            navigator.goBack();
        });
    }

    useEffect(() => {
        TBA.getEvents(year).then((events) => {
            if (events)
                updateRegionals(events);
        }).catch(() => {
            Alert.alert("Error", "Could not connect to The Blue Alliance");
        });
    }, [])

    // Generate List
    let regionalsDisplay: JSX.Element[] = [];
    if (regionalList.length <= 0) {
        regionalsDisplay.push(
            <Text style={styles.loadingText} key={1}>
                Loading All Regionals...
            </Text>
        );
    }
    else {
        regionalList.forEach(regional => {
            let key = regional.key;
            if (regional.name.toLowerCase().includes(searchTerm)) {
                regionalsDisplay.push(
                    <Button
                        key={key}
                        onPress={() => { downloadEvent(key); }}
                        style={[styles.regionalButton]} >

                        <Text style={[styles.regionalText, { color: paletteContext.palette.textPrimary }]} numberOfLines={1}>
                            {regional.name}
                        </Text>

                    </Button >
                );
            }
        });
    }

    // Display Data
    return (
        <View style={styles.container}>

            <TextInput
                placeholder="Search..."
                placeholderTextColor={paletteContext.palette.textSecondary}
                style={[styles.textInput, { color: paletteContext.palette.textPrimary, backgroundColor: paletteContext.palette.button }]}
                onChangeText={(text) => { updateSearch(text.toLowerCase()) }}
            />

            <ScrollContainer>
                {regionalsDisplay}
                <DownloadingModal status={downloadStatus} />
            </ScrollContainer>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    regionalButton: {
        padding: 8,
        marginLeft: 4,
        flexDirection: "row"
    },
    regionalText: {
        fontSize: 16
    },
    textInput: {
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    },
    loadingText: {
        textAlign: "center",
        fontStyle: "italic"
    }
});
