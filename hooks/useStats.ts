import * as React from "react";
import { ScoutingData, TemplateType } from "../types/TemplateTypes";
import useEvent from "./useEvent";
import useScoutingData from "./useScoutingData";
import useTemplate from "./useTemplate";


export interface Stat {
    label: string,
    eventMax: number,
    teams: TeamStats[]
}
export interface TeamStats {
    teamID: string,
    avg: number,
    history: number[]
}

export function useEventStats() {
    const [scoutingData] = useScoutingData();
    const [event] = useEvent();
    const [template] = useTemplate(TemplateType.Match);
    const [stats, setStats] = React.useState([] as Stat[]);

    const getScoutingValues = (data: ScoutingData[], index: number) => {
        return data.map((scout) => index < scout.values.length ? scout.values[index] : 0);
    }
    const calculateStats = async () => {
        const newStats: Stat[] = [];

        const labels = template.filter((elem) => elem.value !== undefined).map((elem) => elem.label);

        for (let i = 0; i < labels.length; i++) {
            const label = labels[i];
            const eventValues = getScoutingValues(scoutingData, i);
            const eventMax = Math.max(...eventValues);

            const stat: Stat = {
                label,
                eventMax,
                teams: [],
            }

            for (const teamID of event.teamIDs) {
                const teamScoutingData = scoutingData.filter((data) => data.teamID === teamID);
                const teamValues = getScoutingValues(teamScoutingData, i);

                if (teamValues.length <= 0)
                    return;

                const teamAvg = teamValues.reduce((prev, cur) => prev + cur) / teamValues.length;

                stat.teams.push({
                    teamID: teamID,
                    avg: teamAvg,
                    history: teamValues
                })
            }

            newStats.push(stat);
        }

        setStats(newStats);
    }
    React.useEffect(() => {
        calculateStats();
    }, [event, template, setStats]);

    return stats;
}

