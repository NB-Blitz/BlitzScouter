import { useNavigation } from '@react-navigation/native';
import * as Print from 'expo-print';
import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Subtitle from '../../components/text/Subtitle';
import Title from '../../components/text/Title';
import useEvent from '../../hooks/useEvent';
import { useEventStats } from '../../hooks/useStats';
import { getTeam } from '../../hooks/useTeam';

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
    const [event] = useEvent();
    const [stats, statVersion] = useEventStats();

    const printSummary = async () => {
        let printData = PRINT_HEADER;

        // Page Header
        printData += `<h1>Scouting Data Export</h1>`;
        printData += `<h6>Event:` + event.id + ` Teams:` + event.teamIDs.length + ` Matches:` + event.matchIDs.length + ` Stats:` + stats.length + `</h6>`;
        printData += `<hr />`;

        printData += `<table>`

        // Table Labels
        printData += `<tr><th />`;
        for (const stat of stats)
            printData += `<th>` + stat.label + `</th>`;
        printData += `<th /><th>Notes</th><th /></tr>`;

        // Team Rows
        for (const teamID of event.teamIDs) {
            const team = await getTeam(teamID);
            if (team === undefined)
                continue;

            const teamStats = stats.map(stat => stat.teams.find((statTeam) => statTeam.teamID === teamID));
            const averages = teamStats.map(teamStat => teamStat ? teamStat.avg : 0);
            const maxs = stats.map(stat => stat.eventMax);

            printData += `<tr>`;
            printData += `<th><div class="restrict"><h4>` + team.number + `</h3><h6>` + team.name + `</h4></div></th>`

            averages.forEach((avg, index) => {
                printData += `<td style="background-color:rgba(100,100,100,` + (avg / maxs[index]) + `);"><h4>` + (Math.round(avg * 100) / 100) + `</h4></td>`
            })

            printData += `</tr>`;
        }
        printData += `</table>`;

        printData += PRINT_FOOTER;
        await Print.printAsync({ html: printData, });

        if (navigator.canGoBack())
            navigator.goBack();
    }

    React.useEffect(() => {
        if (event.id === "bogus")
            return;
        if (stats.length <= 0)
            return;
        printSummary();
    }, [event, statVersion]);

    return (
        <ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Title>Generating...</Title>
            <Subtitle>Please wait for the printing pop-up</Subtitle>
        </ScrollView>
    );
}
