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
                    marginTop: 40,
                    paddingLeft: 20,
                    paddingRight: 20
                }}>
                    
                <View style={[{ marginTop: 30 }, style]} {...otherProps} />
            </ScrollView>
        </FadeIn>
    );
}