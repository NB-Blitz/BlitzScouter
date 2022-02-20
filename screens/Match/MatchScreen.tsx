import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import TBA from "../../api/TBA";
import Button from "../../components/common/Button";
import StandardButton from "../../components/common/StandardButton";
import Subtitle from "../../components/text/Subtitle";
import Text from "../../components/text/Text";
import Title from "../../components/text/Title";
import useMatch from "../../hooks/useMatch";
import { usePalette } from "../../hooks/usePalette";
import useTemplate from "../../hooks/useTemplate";
import { TemplateType } from "../../types/TemplateTypes";
import TeamPreview from "../Matches/TeamPreview";

export default function MatchScreen({ route }: any) {
    const [palette] = usePalette();
    const navigator = useNavigation();
    const [match] = useMatch(route.params.matchID);
    const [template] = useTemplate(TemplateType.Match);

    // Browser Button
    const onBrowserButton = () => {
        TBA.openMatch(match.id);
    }
    React.useLayoutEffect(() => {
        navigator.setOptions({
            headerRight: () => (
                <View style={styles.headerButtons}>
                    <Button onPress={onBrowserButton} style={{ marginRight: 11 }}>
                        <MaterialIcons name="open-in-browser" size={25} color={palette.textPrimary} />
                    </Button>
                </View>
            )
        });
    });

    return (
        <ScrollView>
            <View style={styles.container}>
                <Title>{match.name}</Title>
                <Subtitle>{match.description}</Subtitle>

                {/* Create Template / Scout Button */}
                <View style={{ marginTop: 10 }}>
                    {template.filter((element) => element.value !== undefined).length > 0 ?
                        <StandardButton
                            iconType={"explore"}
                            title={"Scout Match"}
                            subtitle={"Scout this match"}
                            onPress={() => { navigator.navigate("TeamSelect", { matchID: match.id }); }} />
                        :
                        <StandardButton
                            iconType={"edit"}
                            title={"Create Scouting Template"}
                            subtitle={"Create a match scouting template"}
                            onPress={() => { navigator.navigate("EditTemplate", { templateType: TemplateType.Match }); }} />
                    }
                </View>

                {/* Stat Tables */}
                <View style={styles.scrollContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{ width: 20 }} />
                        <ScrollView style={{ width: "100%" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={[styles.allianceHeader, { backgroundColor: "#e7311f" }]}>Red Alliance</Text>
                                <Text style={[styles.allianceHeader, { backgroundColor: "#008cf1" }]}>Blue Alliance</Text>
                            </View>
                            <View style={styles.previewContainer}>
                                {match.redTeamIDs.map(teamID => <TeamPreview teamID={teamID} key={teamID} />)}
                                <View style={{ marginRight: 8 }} />
                                {match.blueTeamIDs.map(teamID => <TeamPreview teamID={teamID} key={teamID} />)}
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <View style={[styles.allianceFooter, { backgroundColor: "#e7311f" }]} />
                                <View style={[styles.allianceFooter, { backgroundColor: "#008cf1" }]} />
                            </View>
                        </ScrollView>
                        <View style={{ width: 20 }} />
                    </ScrollView>
                </View>
            </View >
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    allianceHeader: {
        paddingBottom: 5,
        paddingTop: 5,
        marginRight: 8,
        borderRadius: 6,
        marginBottom: 5,
        fontSize: 18,
        fontWeight: "bold",
        width: 300,
        textAlign: "center",
        color: "#fff"
    },
    allianceFooter: {
        borderRadius: 10,
        width: 300,
        height: 10,
        marginRight: 8,
        marginBottom: 20,
        marginTop: 5
    },
    headerButtons: {
        alignSelf: "flex-end",
        flexDirection: "row"
    },
    previewContainer: {
        flex: 1,
        flexDirection: "row"
    },
    scrollContainer: {
        marginLeft: -20,
        marginRight: -20,
        marginTop: 15
    }
});
