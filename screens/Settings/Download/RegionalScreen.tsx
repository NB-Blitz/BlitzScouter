import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import TBA from "../../../api/TBA";
import Button from "../../../components/common/Button";
import Text from "../../../components/text/Text";
import { PaletteContext } from "../../../context/PaletteContext";
import { TBAEvent } from "../../../types/TBAModels";

export default function RegionalScreen({ route }: any) {
    const paletteContext = React.useContext(PaletteContext);
    const navigator = useNavigation();
    const [searchTerm, updateSearch] = React.useState("");
    const [regionalList, updateRegionals] = React.useState([] as TBAEvent[]);
    const year = route.params.year;

    useEffect(() => {
        TBA.getEvents(year).then((events) => {
            if (events)
                updateRegionals(events);
        }).catch(() => {
            Alert.alert("Error", "Could not connect to The Blue Alliance");
        });
    }, [])

    // Generate List
    let regionalsDisplay: JSX.Element[] = [];
    if (regionalList.length <= 0) {
        regionalsDisplay.push(
            <Text style={styles.loadingText} key={1}>
                Loading All Regionals...
            </Text>
        );
    }
    else {
        regionalList.forEach(regional => {
            let key = regional.key;
            if (regional.name.toLowerCase().includes(searchTerm)) {
                regionalsDisplay.push(
                    <Button
                        key={key}
                        onPress={() => { navigator.navigate("Download", { eventID: key }); }}
                        style={[styles.regionalButton]} >

                        <Text style={[styles.regionalText, { color: paletteContext.palette.textPrimary }]} numberOfLines={1}>
                            {regional.name}
                        </Text>

                    </Button >
                );
            }
        });
    }

    // Display Data
    return (
        <View style={styles.container}>

            <TextInput
                placeholder="Search..."
                placeholderTextColor={paletteContext.palette.textSecondary}
                style={[styles.textInput, { color: paletteContext.palette.textPrimary, backgroundColor: paletteContext.palette.button }]}
                onChangeText={(text) => { updateSearch(text.toLowerCase()) }}
            />

            <ScrollView>
                <View style={styles.scrollContainer}>
                    {regionalsDisplay}
                </View>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"
    },
    scrollContainer: {
        paddingLeft: 20,
        paddingRight: 20
    },
    regionalButton: {
        padding: 8,
        marginLeft: 4,
        flexDirection: "row"
    },
    regionalText: {
        fontSize: 16
    },
    textInput: {
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    },
    loadingText: {
        textAlign: "center",
        fontStyle: "italic"
    }
});
