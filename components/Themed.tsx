import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect, useIsFocused } from '@react-navigation/core';
import * as React from 'react';
import { ScrollView, StyleSheet, Text as DefaultText, View as DefaultView, TouchableOpacity as DefaultButton, Animated, View } from 'react-native';

export type TextProps = DefaultText['props'];
export type ViewProps = DefaultView['props'];
export type ButtonProps = DefaultButton['props'];

const styles = StyleSheet.create({
    scrollContainer: {
        marginTop: 40,
        marginBottom: 0,

        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 0,
        
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

    return (<FadeIn><View style={[style]} {...otherProps} /></FadeIn>);
}
export function ScrollContainer(props: ViewProps) {
    const { style, ...otherProps } = props;

    // BUG Gap at the end of each scroll view
    return (<FadeIn><ScrollView style={[styles.scrollContainer, style]} {...otherProps} /></FadeIn>);
}

// Fade Animation
function FadeIn(props: ViewProps) {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    useFocusEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start();

        return () => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    });

    return (<Animated.View
        style={{
            flex: 1,
            opacity: fadeAnim,
        }}>
        {props.children}
        </Animated.View>
    );
}

export function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
