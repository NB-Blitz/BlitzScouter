import * as React from "react";
import { Stat } from "../types/OtherTypes";
import { ScoutingData } from "../types/TemplateTypes";
import useEvent from "./useEvent";
import useScoutingData from "./useScoutingData";
import useTemplate from "./useTemplate";

export function useEventStats(): [Stat[], number] {
    const [scoutingData] = useScoutingData();
    const [event] = useEvent();
    const [template] = useTemplate();
    const [version, setVersion] = React.useState(0);
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


                let teamAvg = 0;
                if (teamValues.length > 0)
                    teamAvg = teamValues.reduce((prev, cur) => prev + cur) / teamValues.length;

                stat.teams.push({
                    teamID: teamID,
                    avg: teamAvg,
                    history: teamValues
                })
            }

            newStats.push(stat);
        }

        setStats(newStats);
        setVersion(v => v + 1);
    }
    React.useEffect(() => {
        if (event.id === "bogus")
            return;
        if (template.length <= 0)
            return;
        calculateStats();
    }, [scoutingData, event, template]);

    return [stats, version];
}

