import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Alert, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import BlitzDB from "../../api/BlitzDB";
import { TBAEvent } from "../../api/models/TBAModels";
import TBA from "../../api/TBA";
import Button from "../../components/common/Button";
import ScrollContainer from "../../components/containers/ScrollContainer";
import Text from "../../components/text/Text";
import DownloadingModal from "./DownloadingModal";

export default function RegionalScreen({ route }: any) {
    const [searchTerm, updateSearch] = React.useState("");
    const [regionalList, updateRegionals] = React.useState([] as TBAEvent[]);
    const [downloadStatus, setDownloadStatus] = React.useState("");
    const navigator = useNavigation();
    const year = route.params.year;

    // Generate List
    let regionalsDisplay: JSX.Element[] = [];
    if (regionalList.length <= 0) {
        TBA.getEvents(year).then((events) => {
            if (events)
                updateRegionals(events);
        }).catch(() => {
            Alert.alert("Error", "Could not connect to The Blue Alliance");
        });

        regionalsDisplay.push(
            <Text style={styles.loadingText} key={1}>
                Loading All Regionals...
            </Text>
        );
    }
    else {
        for (let regional of regionalList) {
            let key = regional.key;
            if (regional.name.toLowerCase().includes(searchTerm)) {
                regionalsDisplay.push(
                    <Button
                        key={key}
                        onPress={() => { BlitzDB.event.setYear(year); BlitzDB.downloadEvent(key, setDownloadStatus).then(() => { navigator.goBack(); navigator.goBack(); }); }}
                        style={styles.regionalButton}>

                        <Text style={styles.regionalText}>
                            {regional.name}
                        </Text>

                    </Button>
                );
            }
        }
    }

    // Display Data
    return (
        <ScrollContainer>
            <TextInput
                placeholder="Search..."
                placeholderTextColor="#fff"
                style={styles.textInput}
                onChangeText={(text) => { updateSearch(text.toLowerCase()) }}
            />
            {regionalsDisplay}

            <DownloadingModal status={downloadStatus} />
        </ScrollContainer>
    );
}

const styles = StyleSheet.create({
    regionalButton: {
        padding: 8,
        marginLeft: 4,
        flexDirection: "row"
    },
    regionalText: {
        fontSize: 16
    },
    textInput: {
        color: "#fff",
        backgroundColor: "#222222",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        marginTop: 10
    },
    loadingText: {
        textAlign: "center",
        fontStyle: "italic"
    }
});
