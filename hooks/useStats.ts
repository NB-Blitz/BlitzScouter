import { useEffect, useState } from "react";
import { TemplateType } from "../types/TemplateTypes";
import useTeam from "./useTeam";
import useTemplate from "./useTemplate";

export type TeamStats = {
    id: string,
    metrics: TeamMetric[]
};
export interface TeamMetric {
    label: string,
    average: number,
    max: number,
    min: number
}

export default function useStats(teamID: string) {
    const [team] = useTeam(teamID);
    const [template] = useTemplate(TemplateType.Match);
    const [teamStats, setTeamStats] = useState<TeamStats>({} as TeamStats);

    useEffect(() => {
        if (team.scoutingData.length === 0 || template.length === 0) {
            return;
        }

        let newStats: TeamStats = {
            id: team.id,
            metrics: []
        };

        template.forEach(element => {
            if (typeof element.value === "number") {
                const metric: TeamMetric = {
                    label: element.label,
                    average: 0,
                    max: Number.MIN_SAFE_INTEGER,
                    min: Number.MAX_SAFE_INTEGER
                };

                newStats.metrics.push(metric);
            }
        });

        team.scoutingData.forEach(scout => {
            scout.values.forEach((value, index) => {
                if (typeof value === "number") {
                    newStats.metrics[index].average += value;
                    newStats.metrics[index].max = Math.max(newStats.metrics[index].max, value);
                    newStats.metrics[index].min = Math.min(newStats.metrics[index].min, value);
                }
            });
        });

        newStats.metrics.forEach((stat, index) => {
            newStats.metrics[index].average /= team.scoutingData.length;
        });

        setTeamStats(newStats);
    }, [team, template, setTeamStats]);

    return teamStats;
}