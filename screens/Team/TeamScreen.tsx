import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import TBA from "../../api/TBA";
import Button from "../../components/common/Button";
import HorizontalBar from "../../components/common/HorizontalBar";
import StandardButton from "../../components/common/StandardButton";
import Subtitle from "../../components/text/Subtitle";
import Text from "../../components/text/Text";
import Title from "../../components/text/Title";
import useStats from "../../hooks/useStats";
import useTeam from "../../hooks/useTeam";

export default function TeamScreen({ route }: any) {
    const navigator = useNavigation();
    const [team, setTeam] = useTeam(route.params.teamID);
    const stats = useStats(team.id);

    const generateID = () => {
        return team.id + "_" + Math.random().toString(36).slice(2);
    }

    const takePhoto = async () => {
        const path = FileSystem.documentDirectory + generateID() + ".png";
        const cameraResult = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: .5,
            base64: true
        });

        if (cameraResult.cancelled || !cameraResult.base64)
            return;

        await FileSystem.writeAsStringAsync(path, cameraResult.base64, {
            encoding: FileSystem.EncodingType.Base64,
        });

        let mediaPaths = team.mediaPaths;
        mediaPaths.push(path);
        setTeam({
            id: team.id,
            name: team.name,
            number: team.number,
            rank: team.rank,
            wins: team.wins,
            losses: team.losses,
            ties: team.ties,
            mediaPaths,
            scoutingData: team.scoutingData
        });
    }

    const uploadPhoto = async () => {
        const path = FileSystem.documentDirectory + generateID() + ".png";
        const cameraResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: .5,
            base64: true
        });

        if (cameraResult.cancelled || !cameraResult.base64)
            return;

        await FileSystem.writeAsStringAsync(path, cameraResult.base64, {
            encoding: FileSystem.EncodingType.Base64,
        });

        let mediaPaths = team.mediaPaths;
        mediaPaths.push(path);
        setTeam({
            id: team.id,
            name: team.name,
            number: team.number,
            rank: team.rank,
            wins: team.wins,
            losses: team.losses,
            ties: team.ties,
            mediaPaths,
            scoutingData: team.scoutingData
        });
    }

    const deletePhoto = async (path: string) => {
        let mediaPaths = team.mediaPaths;
        mediaPaths.splice(mediaPaths.indexOf(path), 1);
        setTeam({
            id: team.id,
            name: team.name,
            number: team.number,
            rank: team.rank,
            wins: team.wins,
            losses: team.losses,
            ties: team.ties,
            mediaPaths,
            scoutingData: team.scoutingData
        });
    }

    const printStat = (name: string, ...values: string[]) => {
        return (<View style={styles.statContainer} key={name}>
            <Text style={styles.statLabel}>{name}</Text>
            <View style={styles.valueContainer}>
                {values.map((value, index) => {
                    return (<Text style={styles.statValue} key={index}>{value}</Text>);
                })}
            </View>
        </View>);
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <ScrollView style={styles.media} horizontal={true}>
                    {team.mediaPaths.map((mediaPath, index) =>
                        <Button
                            style={styles.imageButton}
                            onPress={() => { navigator.navigate("Media", { mediaPath, onDelete: deletePhoto }); }}
                            key={Math.random()}>

                            <Image style={styles.thumbnail} source={{ uri: mediaPath }} key={index} />

                        </Button>
                    )}

                    <Button
                        style={styles.imageButton}
                        onPress={async () => { takePhoto(); }}>
                        <MaterialIcons
                            size={50}
                            name={"add-a-photo"}
                            color={"white"} />
                    </Button>

                    <Button
                        style={styles.imageButton}
                        onPress={async () => { uploadPhoto(); }}>
                        <MaterialIcons
                            size={50}
                            name={"add-photo-alternate"}
                            color={"white"} />
                    </Button>
                </ScrollView>

                <Title>{team.name}</Title>
                <Subtitle>{team.number}</Subtitle>

                <HorizontalBar />

                <StandardButton
                    iconType={"explore"}
                    title={"Scout Team"}
                    subtitle={"Pit scout this team"}
                    onPress={() => { }} />

                <StandardButton
                    iconTba={true}
                    title={"View on TBA"}
                    subtitle={"View Team " + team.number + " on The Blue Alliance"}
                    onPress={() => { team ? TBA.openTeam(team.number) : null }} />

                <HorizontalBar />

                <View style={styles.statsContainer}>
                    {printStat("Rank", team.rank.toString())}
                    {printStat("Wins", team.wins.toString())}
                    {printStat("Losses", team.losses.toString())}
                    {printStat("Ties", team.ties.toString())}
                </View>

                <View style={styles.statsContainer}>
                    {stats.metrics.length > 0 ?
                        <View style={styles.statContainer}>
                            <View style={styles.valueContainer}>
                                <Text style={styles.statHeader}>Min</Text>
                                <Text style={styles.statHeader}>Avg</Text>
                                <Text style={styles.statHeader}>Max</Text>
                            </View>
                        </View>
                        :
                        null
                    }

                    {stats.metrics.map((stat, index) =>
                        printStat(stat.label, stat.min.toString(), stat.average.toString(), stat.max.toString())
                    )}
                </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    media: {
        marginBottom: 10,
        marginLeft: -20,
        height: 200,
        width: Dimensions.get("window").width
    },
    thumbnail: {
        height: 200,
        width: 200,
        borderRadius: 5
    },
    imageButton: {
        height: 200,
        width: 200,
        marginLeft: 6,
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#444",
        borderRadius: 5
    },

    statLabel: {
        fontWeight: "bold",
        fontSize: 18
    },
    statType: {
        color: "#bbb"
    },
    statValue: {
        color: "#bbb",
        fontSize: 16,
        textAlign: "center",
        width: 50
    },
    statHeader: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        width: 50
    },
    valueContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        flex: 1,
    },
    statContainer: {
        flexDirection: "row",
        flex: 1,
        padding: 10,
    },
    statsContainer: {
        backgroundColor: "#1b1b1b",
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5
    }
});
