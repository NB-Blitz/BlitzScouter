import React from "react";
import { StyleSheet, View } from "react-native";
import useEvent from "../../../hooks/useEvent";
import useStats from "../../../hooks/useStats";
import useTeam from "../../../hooks/useTeam";
import StatSquare from "./StatSquare";

export default function StatTable(props: { teamID: string, cols: number }) {
    const [team] = useTeam(props.teamID);
    const [event] = useEvent();
    const stats = useStats(props.teamID);

    const decToString = (num: number) => {
        return (Math.round(num * 10) / 10).toString()
    }

    // Stat List
    const statList: { label: string, value: string, percentile: number }[] = [];
    statList.push({
        label: "Rank",
        value: team.rank.toString(),
        percentile: 1 - (team.rank / event.teamIDs.length)
    });
    statList.push({
        label: "W-T-L",
        value: team.wins + "-" + team.ties + "-" + team.losses,
        percentile: team.wins / (team.wins + team.ties + team.losses)
    });
    statList.push(
        ...stats.map((stat) => {
            return {
                label: stat.label,
                value: decToString(stat.average),
                percentile: stat.percentile
            }
        })
    );

    // Stat Squares
    let statIndex = 0;
    const statSquares = [] as React.ReactNodeArray;
    while (statIndex < statList.length) {
        for (let col = 0; col < props.cols; col++) {
            const stat = statList[statIndex];
            statIndex++;

            if (stat)
                statSquares.push(<StatSquare name={stat.label} value={stat.value} percentile={stat.percentile} key={statIndex} />);
            else
                statSquares.push(<View style={styles.blank} key={statIndex} />);
        }

        statSquares.push(<View style={styles.break} key={"c" + statIndex} />);
    }

    return (
        <View style={styles.tableContainer}>
            {statSquares}
        </View>
    );
}


const styles = StyleSheet.create({
    tableContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    break: {
        flexBasis: "100%",
        height: 0,
        margin: 0
    },
    blank: {
        flex: 1,
        margin: 2,
        padding: 5,
    }
});
