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
                    onPress={() => {setModalVisible(true)}}>
                <Text style={styles.buttonText}>Download TBA Data</Text>
            </Button>

            <RegionalModal 
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }} />
        </Container>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#deda04",
    },
    buttonText: {
        color: "#000"
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
