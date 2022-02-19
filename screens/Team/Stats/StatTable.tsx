import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import HorizontalBar from "../../../components/common/HorizontalBar";
import Text from "../../../components/text/Text";
import useEvent from "../../../hooks/useEvent";
import useScoutingData from "../../../hooks/useScoutingData";
import useTeam from "../../../hooks/useTeam";
import useTemplate from "../../../hooks/useTemplate";
import { ScoutingData, TemplateType } from "../../../types/TemplateTypes";
import { StatChart } from "./StatChart";
import StatSquare from "./StatSquare";

interface StatData {
    label: string,
    avg: number,
    chartValues: number[],
    max: number
}

export default function StatTable(props: { teamID: string, cols: number, useCharts?: boolean }) {
    const [scoutingData] = useScoutingData();
    const [event] = useEvent();
    const [team] = useTeam(props.teamID);
    const [template] = useTemplate(TemplateType.Match);
    const [statList, setStatList] = useState([] as StatData[]);

    const decToString = (num: number) => {
        return (Math.round(num * 10) / 10).toString()
    }
    const getValues = (data: ScoutingData[], index: number) => {
        return data.map((scout) => index < scout.values.length ? scout.values[index] : 0);
    }
    const calculateStats = () => {
        const newStatList: StatData[] = [];
        const teamScoutingData = scoutingData.filter((data) => data.teamID === team.id);
        const labels = template.filter((elem) => elem.value !== undefined).map((elem) => elem.label);

        labels.forEach((label, index) => {
            const teamValues = getValues(teamScoutingData, index);
            const allValues = getValues(scoutingData, index);

            if (teamValues.length <= 0)
                return;

            const max = Math.max(...allValues);
            const avg = teamValues.reduce((prev, cur) => prev + cur) / teamValues.length;

            newStatList.push({
                label,
                avg: avg,
                chartValues: teamValues,
                max
            })
        });

        setStatList(newStatList);
    }
    React.useEffect(() => {
        calculateStats();
    }, [event, team, template, setStatList])

    // Stat Squares
    let statIndex = 0;
    const statSquares = [] as React.ReactNodeArray;
    while (statIndex < statList.length) {
        const row = [];
        for (let col = 0; col < props.cols; col++) {
            const stat = statList[statIndex];
            statIndex++;

            if (stat) {
                if (props.useCharts) {
                    row.push(<StatChart label={stat.label} values={stat.chartValues} max={stat.max} key={"c" + statIndex} />);
                    if (statIndex !== 1)
                        statSquares.push(<HorizontalBar style={{ marginBottom: 5 }} key={"hb" + statIndex} />)
                } else {
                    row.push(<StatSquare name={stat.label} value={decToString(stat.avg)} percentile={stat.avg / stat.max} key={statIndex} />);
                }

            } else {
                row.push(<View style={styles.blank} key={statIndex} />);
            }
        }

        statSquares.push(
            <View style={styles.tableRow} key={"r" + statIndex} >
                {row}
            </View>
        );
    }

    return (
        <View style={styles.tableContainer}>
            {statSquares.length > 0 ? statSquares : <Text style={styles.text}>This team has no scouting data yet</Text>}
        </View>
    );
}


const styles = StyleSheet.create({
    tableContainer: {
        flex: 1
    },
    tableRow: {
        flexDirection: "row"
    },
    blank: {
        flex: 1,
        margin: 2,
        padding: 5,
    },
    text: {
        fontStyle: "italic",
        textAlign: "center",
        marginBottom: 10
    }
});
