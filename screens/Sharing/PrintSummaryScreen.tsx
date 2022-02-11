import { useNavigation } from '@react-navigation/native';
import * as Print from 'expo-print';
import * as React from 'react';
import ScrollContainer from '../../components/containers/ScrollContainer';
import Subtitle from '../../components/text/Subtitle';
import Title from '../../components/text/Title';
import useEvent from '../../hooks/useEvent';
import useScoutingData from '../../hooks/useScoutingData';
import { getTeam } from '../../hooks/useTeam';
import { getTemplate } from '../../hooks/useTemplate';
import { ScoutingData, TemplateType } from '../../types/TemplateTypes';

const PRINT_HEADER = `<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
            .restrict {
                height: 48px;
                overflow: hidden;
            }
            td {
                border: 1px solid black;
                text-align: center;
                margin: 0;
                padding: 0;
                height: 50px;
            }
            tr {
                page-break-inside:avoid;
                page-break-after:auto;
            }
            table {
                width: 100%;
                table-layout: fixed;
                border-collapse: collapse;
                page-break-inside:auto;
            }
            h1, h2, h3, h4, h5, h6 {
                margin: 2px;
            }
        </style>
    </head><body>`;
const PRINT_FOOTER = `</body></html>`;

export default function PrintSummaryScreen() {
    const navigator = useNavigation();
    const [scoutingData] = useScoutingData();
    const [event] = useEvent();

    const getValues = (data: ScoutingData[], index: number) => {
        return data.map((scout) => index < scout.values.length ? scout.values[index] : 0);
    }

    const printSummary = async () => {
        if (event.id === "bogus")
            return;
        if (scoutingData.length <= 0)
            return;
        const template = await getTemplate(TemplateType.Match);
        if (template === undefined)
            return;

        let printData = PRINT_HEADER;
        printData += `<h1>Scouting Data Export</h1>`;
        printData += `<h6>Event:` + event.id + ` Teams:` + event.teamIDs.length + ` Matches:` + event.matchIDs.length + ` Scouts:` + scoutingData.length + `</h6>`;
        printData += `<hr />`;

        printData += `<table>`
        printData += `<tr><th />`;
        for (const element of template)
            if (element.value !== undefined)
                printData += `<th>` + element.label + `</th>`;

        printData += `<th /><th>Notes</th><th /></tr>`;
        for (const teamID of event.teamIDs) {
            const team = await getTeam(teamID);
            if (team === undefined)
                continue;

            const teamScoutingData = scoutingData.filter((data) => data.teamID === teamID);


            // Calculate Stats
            const labels = template.filter((elem) => elem.value !== undefined).map((elem) => elem.label);
            const avgs: number[] = [];
            const maxs: number[] = [];
            labels.forEach((label, index) => {
                const teamValues = getValues(teamScoutingData, index);
                const allValues = getValues(scoutingData, index);

                if (teamValues.length <= 0)
                    return;

                maxs.push(Math.max(...allValues));
                avgs.push(teamValues.reduce((prev, cur) => prev + cur) / teamValues.length);
            });

            printData += `<tr>`;
            printData += `<th><div class="restrict"><h4>` + team.number + `</h3><h6>` + team.name + `</h4></div></th>`

            avgs.forEach((avg, index) => {
                printData += `<td style="background-color:rgba(100,100,100,` + (avg / maxs[index]) + `);"><h4>` + (Math.round(avg * 100) / 100) + `</h4></td>`
            })

            printData += `</tr>`;
        }
        printData += `</table>`;

        printData += PRINT_FOOTER;
        await Print.printAsync({ html: printData, });
    }

    React.useEffect(() => {
        printSummary();
        if (navigator.canGoBack())
            navigator.goBack();
    }, [event]);

    return (
        <ScrollContainer>
            <Title>Printing...</Title>
            <Subtitle>Please wait for the printing pop-up</Subtitle>
        </ScrollContainer>
    );
}
