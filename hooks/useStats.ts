import { useEffect, useState } from "react";
import { TemplateType } from "../types/TemplateTypes";
import useTeam from "./useTeam";
import useTemplate from "./useTemplate";

export type TeamStats = TeamMetric[];
export interface TeamMetric {
    label: string,
    average: number,
    max: number,
    min: number
}

export default function useStats(teamID: string) {
    const [team, setTeam] = useTeam(teamID);
    const [template, setTemplate] = useTemplate(TemplateType.Match);
    const [teamStats, setTeamStats] = useState<TeamStats>([] as TeamStats);

    useEffect(() => {
        if (team.scoutingData.length === 0 || template.length === 0) {
            return;
        }

        let newStats: TeamStats = [];

        template.forEach(element => {
            if (typeof element.value === "number") {
                const metric: TeamMetric = {
                    label: element.label,
                    average: 0,
                    max: Number.MIN_SAFE_INTEGER,
                    min: Number.MAX_SAFE_INTEGER
                };

                newStats.push(metric);
            }
        });

        team.scoutingData.forEach(scout => {
            scout.values.forEach((value, index) => {
                if (typeof value === "number") {
                    newStats[index].average += value;
                    newStats[index].max = Math.max(newStats[index].max, value);
                    newStats[index].min = Math.min(newStats[index].min, value);
                }
            });
        });

        newStats.forEach((stat, index) => {
            newStats[index].average /= team.scoutingData.length;
        });

        setTeamStats(newStats);
    }, [team, template, setTeamStats]);

    return teamStats;
}