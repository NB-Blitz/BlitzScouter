import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { GestureResponderEvent, Image, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import Text from '../text/Text';

export interface ButtonProps {
    iconType?: React.ComponentProps<typeof MaterialIcons>['name'];
    iconText?: string;
    iconData?: string;

    title: string;
    subtitle: string;
    onPress: (event: GestureResponderEvent) => void;
}

export default function StandardButton(props: ButtonProps) {

    return (
        <TouchableNativeFeedback
            useForeground={false}
            background={TouchableNativeFeedback.Ripple('#696969', false)}
            onPress={props.onPress}>

            <View style={styles.button}>
                {/*  Text Icon  */}
                {props.iconText ?
                    <Text style={styles.buttonIconTXT}>{props.iconText}</Text>
                    : null}

                {/*  FA Icon  */}
                {props.iconType ?
                    <View style={styles.buttonIconFA} >
                        <MaterialIcons name={props.iconType} size={30} style={{ color: "#fff" }} />
                    </View>
                    : null}

                {/*  SVG Icon  */}
                {props.iconData ?
                    <Image style={styles.buttonIconSVG} fadeDuration={0} source={{ uri: props.iconData }} />
                    : null}


                {/*  Titles  */}
                <View>
                    <Text style={styles.buttonTitle} numberOfLines={1}>{props.title}</Text>
                    <Text style={styles.buttonSubtitle}>{props.subtitle}</Text>
                </View>
            </View>



        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: 'stretch',
        padding: 10,
        paddingRight: 65,
        marginBottom: 5,
        backgroundColor: "#1b1b1b",
        borderRadius: 5
    },
    buttonTitle: {
        fontSize: 18
    },
    buttonSubtitle: {
        color: "#bbb"
    },
    buttonIconFA: {
        marginRight: 12,
        width: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonIconSVG: {
        width: 45,
        height: 45,
        marginRight: 12,
        resizeMode: 'stretch',
        borderRadius: 1
    },
    buttonIconTXT: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 5,
        marginRight: 12,
        width: 45,
    }
});