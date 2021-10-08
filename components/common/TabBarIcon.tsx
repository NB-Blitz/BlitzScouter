import * as React from 'react';
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";

export type ViewProps = View['props'];
export interface TabBarIconProps
{
    name: React.ComponentProps<typeof FontAwesome>['name'],
    color: string
}

export function TabBarIcon(props: TabBarIconProps)
{
    return (<FontAwesome
                size={25}
                style={{ marginBottom: -3 }}
                {...props} 
            />);
}