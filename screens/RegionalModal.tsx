import React from "react";
import { Alert, Modal, ModalProps, ScrollView, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TBA } from "../components/TBA";
import { Button, Container, Text, Title } from "../components/Themed";

export default function RegionalModal(props: ModalProps)
{
    const [searchTerm, updateSearch] = React.useState("");
    const [regionalList, updateRegionals] = React.useState([] as any[]);

    // Generate List
    let regionalsDisplay: JSX.Element[] = [];
    if (regionalList.length <= 0)
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
                    <Button key={key} onPress={() => {TBA.downloadData(key);}}>
                        <Text style={styles.regionalButton}>{regional.name}</Text>
                    </Button>
                )
        }
    }

    // Display Data

    return (
        <Modal
            animationType="slide"
            transparent={true}
            {...props}>

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

            <Button style={styles.button} onPress={() => {React.useState()}}>
                <Text style={styles.buttonText}>Cancel</Text>
            </Button>
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
        textAlign: "center"
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
