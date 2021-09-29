import { Picker } from '@react-native-picker/picker';
import * as React from 'react';
import { Modal, ScrollView, StyleSheet } from 'react-native';
import { Switch, TextInput } from 'react-native-gesture-handler';
import { TBA } from '../components/TBA';
import { Text, Container, Title, Button } from '../components/Themed';
import RegionalModal from './RegionalModal';

export default function SettingsScreen()
{
    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <Container>
            <Title>Settings</Title>

            <Button style={styles.button}
                    onPress={() => {TBA.downloadData()}}>
                <Text style={styles.buttonText}>Update Data</Text>
            </Button>

            <Button style={styles.button}
                    onPress={() => {setModalVisible(true)}}>
                <Text style={styles.buttonText}>Change Regional</Text>
            </Button>

            <RegionalModal visible={modalVisible} setVisible={setModalVisible} />
        </Container>
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
