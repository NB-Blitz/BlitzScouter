import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { GestureResponderEvent, Image, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import tbalamp from "../../assets/images/tba_lamp.png";
import { usePalette } from '../../hooks/usePalette';
import Text from '../text/Text';


export interface ButtonProps {
    iconType?: React.ComponentProps<typeof MaterialIcons>['name'];
    iconText?: string;
    iconData?: string;
    iconColor?: string;
    iconTba?: boolean;

    title: string;
    subtitle: string;
    sidetitle?: string;
    onPress: (event: GestureResponderEvent) => void;
}

export default function StandardButton(props: ButtonProps) {
    const [palette] = usePalette();

    return (
        <TouchableNativeFeedback
            useForeground={false}
            background={TouchableNativeFeedback.Ripple('#696969', false)}
            onPress={props.onPress}>

            <View style={[styles.button, { backgroundColor: palette.button }]}>
                {/*  Text Icon  */}
                {props.iconText ?
                    <Text style={[styles.buttonIconTXT, { color: palette.textPrimary }]}>{props.iconText}</Text>
                    : null}

                {/*  FA Icon  */}
                {props.iconType ?
                    <View style={styles.buttonIconFA} >
                        <MaterialIcons name={props.iconType} size={28} style={{ color: palette.textPrimary }} />
                    </View>
                    : null}

                {/*  SVG Icon  */}
                {props.iconData ?
                    <Image style={styles.buttonIconSVG} fadeDuration={0} source={{ uri: props.iconData }} />
                    : null}

                {/*  Color Icon  */}
                {props.iconColor ?
                    <View style={[styles.buttonIconColor, { backgroundColor: props.iconColor }]} />
                    : null}

                {/*  TBA Icon  */}
                {props.iconTba ?
                    <Image style={styles.buttonIconTBA} fadeDuration={0} source={tbalamp} height={50} width={50} />
                    : null}


                {/*  Titles  */}
                <View>
                    <Text style={[styles.buttonTitle, { color: palette.textPrimary }]} numberOfLines={1}>{props.title}</Text>
                    <Text style={{ color: palette.textSecondary }}>{props.subtitle}</Text>
                </View>
                <Text style={[styles.sidetitle, { color: palette.textSecondary }]}>{props.sidetitle}</Text>
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
        paddingRight: 100,
        marginBottom: 8,
        borderRadius: 5
    },
    buttonTitle: {
        fontSize: 18
    },
    buttonIconFA: {
        marginRight: 14,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonIconSVG: {
        width: 60,
        height: 60,
        margin: -10,
        marginRight: 14,
        borderRadius: 6
    },
    buttonIconTXT: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 5,
        marginRight: 14,
        width: 50,
    },
    buttonIconTBA: {
        paddingTop: 5,
        marginRight: 14 + 15,
        marginLeft: 15,
        width: 20,
        height: 32
    },
    buttonIconColor: {
        width: 45,
        height: 45,
        marginRight: 14,
        borderTopLeftRadius: 1,
        borderBottomLeftRadius: 1,
    },
    sidetitle: {
        position: "absolute",
        top: 10,
        right: 10,
        fontSize: 12
    }
});