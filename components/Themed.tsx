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
    const opacity = useFadeIn();

    return (<Animated.View style={{ opacity }}><View style={[style]} {...otherProps} /></Animated.View>);
}
export function ScrollContainer(props: ViewProps) {
    const { style, ...otherProps } = props;
    const opacity = useFadeIn();

    // BUG Gap at the end of each scroll view
    return (<Animated.View style={{ opacity }}><ScrollView style={[styles.scrollContainer, style]} {...otherProps} /></Animated.View>);
}

// Fade Animation
function useFadeIn() {
    const opacityRef = React.useRef<Animated.Value | undefined>(undefined);
    if (opacityRef.current === undefined)
        opacityRef.current = new Animated.Value(0);
  
    React.useEffect(() => {
        Animated.timing(opacityRef.current as Animated.Value, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);
  
    return opacityRef.current;
  }
