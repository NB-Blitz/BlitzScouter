import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { ReactNode } from "react";
import { StyleSheet, Modal as DefaultModal, View, ScrollView, TouchableOpacity, GestureResponderEvent, Image } from "react-native";
import Text from '../text/Text';
import DarkBackground from "./DarkBackground";

export interface ButtonProps
{
    iconType?: React.ComponentProps<typeof FontAwesome>['name'];
    iconText?: string;
    iconData?: string;

    title: string;
    subtitle: string;
    onPress: (event: GestureResponderEvent) => void;
}

export default function StandardButton(props: ButtonProps)
{

    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.button}>
            
            {/*  Text Icon  */}
            {props.iconText ? 
                <Text style={styles.buttonIconTXT}>{props.iconText}</Text>
            : null}

            {/*  FA Icon  */}
            {props.iconType ?
                <View style={styles.buttonIconFA} >
                    <FontAwesome name={props.iconType} size={30} style={{color:"#fff"}} />
                </View>
            : null}

            {/*  SVG Icon  */}
            {props.iconData ?
                <Image style={styles.buttonIconSVG} fadeDuration={0} source={{uri:props.iconData}} />
            : null}

            {/*  Titles  */}
            <View>
                <Text style={styles.buttonTitle}>{props.title}</Text>
                <Text style={styles.buttonSubtitle}>{props.subtitle}</Text>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: 'stretch',
        padding: 10,
    },
    buttonTitle: {
        fontSize: 18
    },
    buttonSubtitle: {
        color: "#bbb"
    },
    buttonIconFA: {
        marginRight: 10,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonIconSVG: {
        width: 40,
        height: 40,
        marginRight: 10,
        resizeMode: 'stretch'
    },
    buttonIconTXT: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 5,
        marginRight: 10,
        marginLeft: -10,
        width: 35,
        height: 35,
    }
});