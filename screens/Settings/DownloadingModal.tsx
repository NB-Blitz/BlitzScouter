import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import DarkBackground from "../../components/common/DarkBackground";
import Subtitle from "../../components/text/Subtitle";
import Title from "../../components/text/Title";

interface ModalProps {
    status: string;
}

export default function DownloadingModal(props: ModalProps) {

    // Return Modal
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.status !== ""} >

            <DarkBackground isTransparent={true} />

            <View style={styles.modal}>

                <Title>Downloading</Title>
                <Subtitle>{props.status}</Subtitle>

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
    }
});
