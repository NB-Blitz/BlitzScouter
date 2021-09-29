import { Picker } from '@react-native-picker/picker';
import * as React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { TBA } from '../components/TBA';
import { Text, Container, Title, Button } from '../components/Themed';

export default function SettingsScreen() {
    const [modalVisible, setModalVisible] = React.useState(false);
    return (
        <Container>
            <Title>Settings</Title>
            <Button style={styles.button}
                    onPress={() => {setModalVisible(true)}}>
                <Text style={styles.buttonText}>Download TBA Data</Text>
            </Button>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <Container style={styles.modal}>
                    <Title>Regional:</Title>
                </Container>
            </Modal>
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
    modal: {
        backgroundColor: "#111",
        margin: 20,
        marginBottom: 100
    }
});
