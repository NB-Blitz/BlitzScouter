import React from "react";
import { Alert, Modal, ScrollView, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DownloadingModal from "../components/DownloadingModal";
import { TBA } from "../components/TBA";
import { Button, Container, Text, Title } from "../components/Themed";

interface ModalProps
{
    visible: boolean;
    setVisible: Function;
}

export default function RegionalModal(props: ModalProps)
{
    const [searchTerm, updateSearch] = React.useState("");
    const [regionalList, updateRegionals] = React.useState([] as any[]);
    const [downloadStatus, setDownloadStatus] = React.useState("");

    // Generate List
    let regionalsDisplay: JSX.Element[] = [];
    if (regionalList.length <= 0 && props.visible)
    {
        TBA.getEvents().then((events: any[]) => {
            updateRegionals(events);
        }).catch(() => {
            Alert.alert("Error","Could not connect to The Blue Alliance");
        });

        regionalsDisplay.push(
            <Text style={styles.loadingText} key={1}>
                Loading All Regionals...
            </Text>
        );
    }
    else
    {
        for (let regional of regionalList)
        {
            let key = regional.key;
            if (regional.name.toLowerCase().includes(searchTerm))
                regionalsDisplay.push(
                    <Button
                        key={key}
                        onPress={() => { TBA.downloadData(key, setDownloadStatus).then(() => { props.setVisible(false); }); }}
                        style={styles.regionalButton}>

                        <Text style={styles.regionalText}>
                            {regional.name}
                        </Text>

                    </Button>
                )
        }
    }

    // Display Data

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => props.setVisible(false)} >

            <View style={styles.modal}>
                <Title>Regional:</Title>
                <TextInput 
                    placeholder="Search..."
                    placeholderTextColor="#fff"
                    style={styles.textInput}
                    onChangeText={(text) => {updateSearch(text.toLowerCase())}}
                />
                <ScrollView>
                    {regionalsDisplay}
                </ScrollView>
            </View>

            <Button style={styles.button} onPress={() => {props.setVisible(false);}}>
                <Text style={styles.buttonText}>Cancel</Text>
            </Button>

            <DownloadingModal status={downloadStatus} />
        </Modal>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#deda04",
        position: "absolute",
        bottom: 80,
        right: 20,
        left: 20,
        borderRadius: 10
    },
    buttonText: {
        color: "#000"
    },
    regionalButton: {
        padding: 6,
        flexDirection: "row"
    },
    regionalText:{
        fontSize: 16
    },
    textInput: {
        color: "#fff",
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        marginBottom: 10
    },
    modal: {
        backgroundColor: "#0b0b0b",
        flex: 1,
        borderRadius: 10,
        marginTop: 30,
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 70,
        marginBottom: 60,
    },
    loadingText: {
        textAlign: "center",
        fontStyle: "italic"
    }
});
