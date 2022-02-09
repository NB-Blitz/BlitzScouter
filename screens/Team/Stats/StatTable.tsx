import React from "react";
import { StyleSheet, View } from "react-native";
import useEvent from "../../../hooks/useEvent";
import useScoutingData from "../../../hooks/useScoutingData";
import useTeam from "../../../hooks/useTeam";
import useTemplate from "../../../hooks/useTemplate";
import { TemplateType } from "../../../types/TemplateTypes";
import StatSquare from "./StatSquare";

export default function StatTable(props: { teamID: string, cols: number }) {
    const [scoutingData] = useScoutingData();
    const [event] = useEvent();
    const [team] = useTeam(props.teamID);
    const [template] = useTemplate(TemplateType.Match);

    const teamScoutingData = scoutingData.filter((data) => data.teamID === team.id);

    // Calculate Stats
    const avgs: number[] = [];
    const maxs: number[] = [];
    teamScoutingData.forEach(scout => {
        scout.values.forEach((val, index) => {
            if (index >= avgs.length)
                avgs.push(0);
            if (typeof val === "number")
                avgs[index] += val;
            else
                avgs[index] += val ? 1 : 0;
        });
    });
    avgs.forEach((val, index) => {
        avgs[index] = val / teamScoutingData.length;
    });
    scoutingData.forEach(scout => {
        scout.values.forEach((val, index) => {
            if (index >= maxs.length)
                maxs.push(0);
            if (typeof val === "number")
                maxs[index] = Math.max(maxs[index], val);
            else
                maxs[index] = 1;
        });
    });

    // Display Stats
    const decToString = (num: number) => {
        return (Math.round(num * 10) / 10).toString()
    }
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

    if (teamScoutingData.length > 0) {
        const labels = template.filter(elem => elem.value !== undefined).map(elem => elem.label);
        labels.forEach((label, index) => {
            statList.push({
                label,
                value: decToString(avgs[index]),
                percentile: avgs[index] / maxs[index]
            })
        });
    }

    // Stat Squares
    let statIndex = 0;
    const statSquares = [] as React.ReactNodeArray;
    while (statIndex < statList.length) {
        const row = [];
        for (let col = 0; col < props.cols; col++) {
            const stat = statList[statIndex];
            statIndex++;

            if (stat)
                row.push(<StatSquare name={stat.label} value={stat.value} percentile={stat.percentile} key={statIndex} />);
            else
                row.push(<View style={styles.blank} key={statIndex} />);
        }

        statSquares.push(
            <View style={styles.tableRow} key={"r" + statIndex} >
                {row}
            </View>
        );
    }

    return (
        <View style={styles.tableContainer}>
            {statSquares}
        </View>
    );
}


const styles = StyleSheet.create({
    tableContainer: {
        flex: 1
    },
    tableRow: {
        flexDirection: "row",
    },
    blank: {
        flex: 1,
        margin: 2,
        padding: 5,
    }
});
