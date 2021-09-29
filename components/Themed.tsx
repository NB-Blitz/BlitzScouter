import * as React from 'react';
import { ScrollView, StyleSheet, Text as DefaultText, View as DefaultView, TouchableOpacity as DefaultButton } from 'react-native';

export type TextProps = DefaultText['props'];
export type ViewProps = DefaultView['props'];
export type ButtonProps = DefaultButton['props'];

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        marginBottom: 0
    },
    title: {
      color: "#fff",
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 20
    },
    text: {
        color: "#fff"
    },
    button: {
        alignItems: "center",
        padding: 10,
        alignSelf: 'stretch',
    }
});
  
// Button
export function Button(props: ButtonProps) {
    const { style, ...otherProps } = props;
  
    return <DefaultButton style={[styles.button, style]} {...otherProps} />;
}

// Text
export function Text(props: TextProps) {
    const { style, ...otherProps } = props;

    return <DefaultText style={[styles.text, style]} {...otherProps} />;
}

// Title
export function Title(props: TextProps) {
    const { style, ...otherProps } = props;
  
    return <DefaultText style={[styles.title, style]} {...otherProps} />;
  }

// Containers
export function Container(props: ViewProps) {
    const { style, ...otherProps } = props;

    return (<ScrollView style={[styles.container, style]} {...otherProps} />);
}
