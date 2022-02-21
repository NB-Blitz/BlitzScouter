import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "../../../components/text/Text";
import { useEventStats } from "../../../hooks/useStats";
import useTeam from "../../../hooks/useTeam";
import { StatChart } from "./StatChart";
import StatSquare from "./StatSquare";

interface StatData {
    label: string,
    avg: number,
    chartValues: number[],
    max: number
}

export default function StatTable(props: { teamID: string, useCharts?: boolean }) {
    const eventStats = useEventStats();
    const [team] = useTeam(props.teamID);

    const decToString = (num: number) => {
        return (Math.round(num * 10) / 10).toString()
    }

    return (
        <View style={styles.tableContainer}>
            {eventStats.map((stat, index) => {
                const teamStat = stat.teams.find((stat) => stat.teamID === props.teamID);
                const key = props.teamID + "-" + index;

                if (!(teamStat))
                    return (<Text style={styles.text} key={key}>This team has no scouting data yet</Text>)
                else if (props.useCharts)
                    return (<StatChart
                        label={stat.label}
                        values={teamStat.history}
                        max={stat.eventMax}
                        key={key} />)
                else
                    return (<StatSquare
                        name={stat.label}
                        value={decToString(teamStat.avg)}
                        percentile={teamStat.avg / stat.eventMax}
                        key={key} />)
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
