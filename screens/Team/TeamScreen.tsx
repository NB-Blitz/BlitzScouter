import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import TBA from "../../api/TBA";
import Button from "../../components/common/Button";
import Subtitle from "../../components/text/Subtitle";
import Text from "../../components/text/Text";
import Title from "../../components/text/Title";
import useEvent from "../../hooks/useEvent";
import { usePalette } from "../../hooks/usePalette";
import useTeam from "../../hooks/useTeam";
import StatTable from "./Stats/StatTable";

export default function TeamScreen({ route }: any) {
    const [palette] = usePalette();
    const navigator = useNavigation();
    const [team, setTeam] = useTeam(route.params.teamID);
    const [event] = useEvent();

    // Photos
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
            mediaPaths
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
            mediaPaths
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
            mediaPaths
        });
    }

    // Browser Button
    const onBrowserButton = () => {
        TBA.openTeam(team.number, event.year);
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
                        style={[styles.imageButton, { backgroundColor: palette.innerBox }]}
                        onPress={async () => { takePhoto(); }}>
                        <MaterialIcons
                            size={50}
                            name={"add-a-photo"}
                            color={palette.textPrimary} />
                    </Button>

                    <Button
                        style={[styles.imageButton, { backgroundColor: palette.innerBox }]}
                        onPress={async () => { uploadPhoto(); }}>
                        <MaterialIcons
                            size={50}
                            name={"add-photo-alternate"}
                            color={palette.textPrimary} />
                    </Button>
                </ScrollView>

                <View>
                    <Title style={{ marginRight: 25 }}>{team.name}</Title>
                    <Subtitle>{team.number}</Subtitle>
                    <Text style={[styles.sidetitle, { color: palette.textSecondary }]}>
                        {team.rank ? "#" + team.rank : ""}
                    </Text>
                </View>

                <StatTable teamID={route.params.teamID} useCharts={true} />

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
        borderRadius: 5
    },
    headerButtons: {
        alignSelf: "flex-end",
        flexDirection: "row"
    },
    sidetitle: {
        position: "absolute",
        top: 20,
        right: 0,
        fontSize: 12
    }
});
