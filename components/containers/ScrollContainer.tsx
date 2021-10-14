import * as React from 'react';
import { ScrollView, View } from "react-native";
import FadeIn from '../common/FadeIn';

export type ViewProps = View['props'];

export default function ScrollContainer(props: ViewProps) {
    const { style, ...otherProps } = props;

    return (
        <FadeIn>
            <ScrollView
                style={{
                    marginTop: 0,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: "#0a0a0a"
                }}>
                    
                <View style={[{ marginTop: 10 }, style]} {...otherProps} />
            </ScrollView>
        </FadeIn>
    );
}