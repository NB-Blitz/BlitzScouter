import * as React from 'react';
import { ReactNode } from "react";
import { StyleSheet, Modal as DefaultModal, View, ScrollView } from "react-native";
import Text from '../text/Text';
import Button from './Button';
import DarkBackground from "./DarkBackground";

export interface ModalProps
{
    setVisible: (isVisible: boolean) => void;
    children: ReactNode;
}

export default function Modal(props: ModalProps)
{
    return (
        <DefaultModal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => props.setVisible(false)} >

            <DarkBackground isTransparent={true} />

            <View style={styles.outerView}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.innerView}>
                        {props.children}
                    </View>
                </ScrollView>
            </View>

            <Button
                style={styles.button}
                onPress={() => {props.setVisible(false);}}>

                <Text style={styles.buttonText}>
                    Return
                </Text>
                
            </Button>
        </DefaultModal>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        marginBottom: 60
    },
    outerView: {
        backgroundColor: "#0c0c0c",
        flex: 1,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5
    },
    innerView: {
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20
    },
    button: {
        backgroundColor: "#c89f00",
        position: "absolute",
        bottom: 35,
        right: 20,
        left: 20,
        borderRadius: 10
    },
    buttonText: {
        color: "#000"
    },
});