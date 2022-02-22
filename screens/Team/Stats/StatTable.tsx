import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../../../components/text/Text";
import { useEventStats } from "../../../hooks/useStats";
import { StatChart } from "./StatChart";
import StatSquare from "./StatSquare";

export default function StatTable(props: { teamID: string, useCharts?: boolean }) {
    const [eventStats, statVersion] = useEventStats();

    const decToString = (num: number) => {
        return (Math.round(num * 10) / 10).toString()
    }

    return (
        <View style={styles.tableContainer}>
            {eventStats.map((stat, index) => {
                const teamStat = stat.teams.find((stat) => stat.teamID === props.teamID);
                const key = props.teamID + "-" + index + "-" + statVersion;
                if (!(teamStat)) {
                    return (<Text key={key} />);
                } else if (teamStat.history.length <= 0) {
                    if (index === 0)
                        return (<Text
                            style={styles.text}
                            key={key}>This team has no scouting data yet</Text>)
                } else if (props.useCharts) {
                    return (<StatChart
                        label={stat.label}
                        values={teamStat.history}
                        max={stat.eventMax}
                        key={key} />)
                } else {
                    return (<StatSquare
                        name={stat.label}
                        value={decToString(teamStat.avg)}
                        percentile={stat.eventMax === 0 ? 0 : teamStat.avg / stat.eventMax}
                        key={key} />)
                }
            })}
        </View>
    );
}


const styles = StyleSheet.create({
    tableContainer: {
        flex: 1
    },
    text: {
        fontStyle: "italic",
        textAlign: "center",
        marginBottom: 10
    }
});
