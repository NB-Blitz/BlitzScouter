import * as React from 'react';
import { NativeEventEmitter, StyleSheet } from 'react-native';
import DownloadingModal from './DownloadingModal';
import { Text, Container, Title, Button, ScrollContainer } from '../../components/Themed';
import RegionalModal from './RegionalModal';
import { BlitzDB } from '../../api/BlitzDB';

// BUG "Update Data" is available after a data wipe
// TODO More settings
export default function SettingsScreen()
{
    const [modalVisible, setModalVisible] = React.useState(false);
    const [downloadStatus, setDownloadStatus] = React.useState("");
    const [version, setVersion] = React.useState(0);

    BlitzDB.eventEmitter.addListener("dataUpdate", () => {
        BlitzDB.eventEmitter.removeCurrentListener();
        setVersion(version + 1);
    });



    let updateButton;
    if (BlitzDB.event)
        updateButton = (
        <Button
            style={styles.button}
            onPress={() => {BlitzDB.download(BlitzDB.event ? BlitzDB.event.id : "", setDownloadStatus)}}>
            <Text style={styles.buttonText}>Update Data</Text>
        </Button>);

    return (
        <ScrollContainer>
            <Title>Settings</Title>

            {updateButton}

            <Button style={styles.button}
                    onPress={() => {setModalVisible(true)}}>
                <Text style={styles.buttonText}>{BlitzDB.event ? "Change" : "Set"} Regional</Text>
            </Button>

            <Button style={styles.button}
                    onPress={() => {BlitzDB.deleteAll(true);}}>
                <Text style={styles.buttonText}>Clear All Data</Text>
            </Button>

            <RegionalModal visible={modalVisible} setVisible={setModalVisible} />
            <DownloadingModal status={downloadStatus} />
        </ScrollContainer>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#deda04",
        marginBottom: 10,
        borderRadius: 5
    },
    buttonText: {
        color: "#000",
        fontSize: 16
    },
    textInput: {
        color: "#fff",
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        marginBottom: 10
    },
    modal: {
        backgroundColor: "#111",
        margin: 20,
        marginBottom: 100
    },
    loadingText: {
        textAlign: "center",
        fontStyle: "italic"
    }
});
