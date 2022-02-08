import { useNavigation } from '@react-navigation/native';
import * as Print from 'expo-print';
import * as React from 'react';
import ScrollContainer from '../../components/containers/ScrollContainer';
import Subtitle from '../../components/text/Subtitle';
import Title from '../../components/text/Title';
import useEvent from '../../hooks/useEvent';
import { getStats } from '../../hooks/useStats';
import { getTeam } from '../../hooks/useTeam';
import { getTemplate } from '../../hooks/useTemplate';
import { TemplateType } from '../../types/TemplateTypes';

const PRINT_HEADER = `<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
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
    const [event] = useEvent();

    const printSummary = async () => {
        if (event.id === "bogus")
            return;
        const template = await getTemplate(TemplateType.Match);
        if (template === undefined)
            return;

        let printData = PRINT_HEADER;
        printData += `<h1>Scouting Data Export</h1>`;
        printData += `<h6>Event:` + event.id + ` Teams:` + event.teamIDs.length + ` Matches:` + event.matchIDs.length + ` Timestamp` + ((new Date()).toISOString()) + `</h6>`;
        printData += `<hr />`;

        printData += `<table>`
        printData += `<tr><th />`;
        for (const element of template)
            if (typeof element.value === "number")
                printData += `<th>` + element.label + `</th>`;

        printData += `<th>Notes</th></tr>`;
        for (const teamID of event.teamIDs) {
            const team = await getTeam(teamID);
            const stats = await getStats(teamID);

            if (team === undefined || stats === undefined)
                continue;

            printData += `<tr>`;
            printData += `<th><h4>` + team.number + `</h3><h6>` + team.name + `</h4></th>`

            for (const stat of stats) {
                printData += `<td style="background-color:rgba(150,150,150,` + stat.percentile + `);"><h4>` + (Math.round(stat.average * 100) / 100) + `</h4></td>`
            }

            printData += `</tr><div class="pagebreak" />`;
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
