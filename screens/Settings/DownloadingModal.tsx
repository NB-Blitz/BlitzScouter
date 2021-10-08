import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import DarkBackground from "../../components/common/DarkBackground";
import { Title } from "../../components/Themed";

interface ModalProps
{
    status: string;
}

export default function DownloadingModal(props: ModalProps)
{

    // Return Modal
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.status !== ""} >
            
            <DarkBackground isTransparent={true} />
            
            <View style={styles.modal}>
                
                <Title style={styles.title}>Downloading, Please Wait</Title>
                <Title style={styles.subtitle}>{props.status}</Title>

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "#0e0e0e",
        position: "absolute",
        top: "40%",
        width: "100%",
        height: 100,
        borderRadius: 10,
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 80,
    },
    title: {
        fontSize: 24,
        marginBottom: 0
    },
    subtitle: {
        color: "#bbb",
        fontSize: 18
    }
});
