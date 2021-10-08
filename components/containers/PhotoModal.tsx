import React from "react";
import { Dimensions, Image, Modal, StyleSheet, View } from "react-native";
import DarkBackground from "../common/DarkBackground";

interface PhotoProps
{
    imageData: string;
    setImageData: (imageData: string) => void;
}

// TODO Improve Photo Modal
export default function PhotoModal(props: PhotoProps)
{
    if (props.imageData === "")
        return null;
    else
        return (
            <Modal
                animationType="fade"
                transparent={true}
                onRequestClose={() => props.setImageData("")} >

                <View style={styles.container}>
                    <DarkBackground isTransparent={false} />
                    <Image style={styles.image} source={{uri:props.imageData}} />
                    
                </View>
            </Modal>
        );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        justifyContent: "center",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width
    }
});
