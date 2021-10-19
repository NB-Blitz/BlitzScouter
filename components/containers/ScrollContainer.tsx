import * as React from 'react';
import { RefreshControl, ScrollView, StyleProp, ToastAndroid, View, ViewStyle } from "react-native";
import FadeIn from '../common/FadeIn';

export type ViewProps = View['props'];
interface ScrollContainerProps
{
    children: React.ReactNode
    onRefresh?: () => Promise<void>;
}

export default function ScrollContainer(props: ScrollContainerProps)
{
    const [isRefreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        if (props.onRefresh !== undefined)
            props.onRefresh().then(() => setRefreshing(false));
        else
            setRefreshing(false);
    }, []);

    return (
        <FadeIn>
            <ScrollView
                style={{
                    marginTop: 0,
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: "#0a0a0a"
                }}
                refreshControl={
                    props.onRefresh ? <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} /> : undefined
                }
            >
                <View style={{ marginTop: 10 }}>
                    {props.children}
                </View>
            </ScrollView>
        </FadeIn>
    );
}