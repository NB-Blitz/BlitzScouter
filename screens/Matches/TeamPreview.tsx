import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";
import { BlitzDB } from '../../api/BlitzDB';
import Text from '../../components/text/Text';
import Button from '../../components/common/Button';
import TeamModal from '../Teams/TeamModal';

interface TeamThumbnailProps
{
    teamID: string
}

export default function TeamPreview(props: TeamThumbnailProps)
{
    const [isVisible, setVisible] = React.useState(false);

    // Grab Team Data
    let team = BlitzDB.getTeam(props.teamID);
    if (!(team))
    {
        Alert.alert("Error", "There was an error grabbing the data from that team. Try re-downloading TBA data then try again.");
        return null;
    }

    // Grab Team Media
    let mediaIcon: JSX.Element;
    if (team.media.length > 0)
    {
        let preview = team.media[team.media.length - 1];
        mediaIcon = (
            <Image
                style={styles.thumbnail}
                source={{uri: preview}}
                key={Math.random()} />
        );
    }
    else
    {
        mediaIcon = (
            <View style={styles.thumbnail}>
                <FontAwesome
                    name="ban"
                    size={50} 
                    color={"#aaa"} />
            </View>
        );
    }


    return (
        <Button
            style={styles.container}
            onPress={() => { setVisible(true) }}>

            <TeamModal
                teamID={team.id}
                isVisible={isVisible}
                setVisible={setVisible} />

            {mediaIcon}
            
            <View style={styles.subContainer}>
                <Text style={styles.teamName}>{team.name}</Text>
                <Text style={styles.teamDesc}>{team.number}</Text>
                
            </View>
        </Button>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        flexDirection: "row",
        height: 150
    },
    subContainer: {
        width: "100%"
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "black"
    },
    thumbnail: {
        height: 150,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#444",
        marginRight: 15,
    },
    teamName: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
        width: 150
    },
    teamDesc: {
        color: "#bbb",
        fontWeight: "bold"
    },
});
