import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { GestureResponderEvent, Image, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { PaletteContext } from '../../context/PaletteContext';
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
    const paletteContext = React.useContext(PaletteContext);
    return (
        <TouchableNativeFeedback
            useForeground={false}
            background={TouchableNativeFeedback.Ripple('#696969', false)}
            onPress={props.onPress}>

            <View style={[styles.button, { backgroundColor: paletteContext.palette.button }]}>
                {/*  Text Icon  */}
                {props.iconText ?
                    <Text style={[styles.buttonIconTXT, { color: paletteContext.palette.textPrimary }]}>{props.iconText}</Text>
                    : null}

                {/*  FA Icon  */}
                {props.iconType ?
                    <View style={styles.buttonIconFA} >
                        <MaterialIcons name={props.iconType} size={30} style={{ color: paletteContext.palette.textPrimary }} />
                    </View>
                    : null}

                {/*  SVG Icon  */}
                {props.iconData ?
                    <Image style={styles.buttonIconSVG} fadeDuration={0} source={{ uri: props.iconData }} />
                    : null}


                {/*  Titles  */}
                <View>
                    <Text style={[styles.buttonTitle, { color: paletteContext.palette.textPrimary }]} numberOfLines={1}>{props.title}</Text>
                    <Text style={{ color: paletteContext.palette.textSecondary }}>{props.subtitle}</Text>
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
        borderRadius: 5
    },
    buttonTitle: {
        fontSize: 18
    },
    buttonIconFA: {
        marginRight: 12,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonIconSVG: {
        width: 60,
        height: 60,
        margin: -10,
        marginRight: 12,
        borderTopLeftRadius: 1,
        borderBottomLeftRadius: 1,
    },
    buttonIconTXT: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 5,
        marginRight: 12,
        width: 50,
    }
});