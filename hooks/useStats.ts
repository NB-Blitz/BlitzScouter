import { useEffect, useState } from "react";
import { TemplateType } from "../types/TemplateTypes";
import { getEvent } from "./useEvent";
import useTeam, { getTeam } from "./useTeam";
import useTemplate, { getTemplate } from "./useTemplate";

export type TeamStats = TeamMetric[];
export interface TeamMetric {
    label: string,
    average: number,
    max: number,
    min: number,
    percentile: number
}

export default function useStats(teamID: string) {
    const [team] = useTeam(teamID);
    const [template] = useTemplate(TemplateType.Match);
    const [teamStats, setTeamStats] = useState<TeamStats>([] as TeamStats);

    const getNewStats = async () => {
        const newStats = await getStats(teamID);
        setTeamStats(newStats);
    }

    useEffect(() => {
        getNewStats();
    }, [team, template, setTeamStats]);

    return teamStats;
}

export async function getStats(teamID: string) {
    const team = await getTeam(teamID);
    const event = await getEvent();
    const template = await getTemplate(TemplateType.Match);

    if (team === undefined || event === undefined || template === undefined) {
        return [] as TeamStats;
    }
    if (team.scoutingData.length === 0 || template.length === 0) {
        return [] as TeamStats;
    }

    // Calculate Max Values
    const maxs: number[] = [];
    for (const teamID of event.teamIDs) {
        const team = await getTeam(teamID);
        if (team) {
            for (const data of team.scoutingData) {
                let index = 0;
                for (const value of data.values) {
                    if (typeof value == "number") {
                        if (index >= maxs.length)
                            maxs.push(Number.MIN_SAFE_INTEGER);
                        maxs[index] = Math.max(value, maxs[index]);
                        index++;
                    }
                    else if (typeof value == "boolean") {
                        if (index >= maxs.length)
                            maxs.push(Number.MIN_SAFE_INTEGER);
                        maxs[index] = Math.max(value ? 1 : 0, maxs[index]);
                        index++;
                    }
                }
            }
        }
    }

    let newStats: TeamStats = [];
    template.forEach(element => {
        if (typeof element.value === "number" || typeof element.value === "boolean") {
            const metric: TeamMetric = {
                label: element.label,
                average: 0,
                max: Number.MIN_SAFE_INTEGER,
                min: Number.MAX_SAFE_INTEGER,
                percentile: 0
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
            else if (typeof value === "boolean") {
                newStats[index].average += value ? 1 : 0;
                newStats[index].max = Math.max(newStats[index].max, value ? 1 : 0);
                newStats[index].min = Math.min(newStats[index].min, value ? 1 : 0);
            }
        });
    });

    newStats.forEach((stat, index) => {
        newStats[index].average /= team.scoutingData.length;
        newStats[index].percentile = newStats[index].average / maxs[index];
    });

    return newStats;
}