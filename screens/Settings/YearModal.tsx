import React from "react";
import { StyleSheet, ToastAndroid } from "react-native";
import { BlitzDB } from "../../api/BlitzDB";
import { TBA } from "../../api/TBA";
import Button from "../../components/common/Button";
import HorizontalBar from "../../components/common/HorizontalBar";
import Modal from "../../components/common/Modal";
import Subtitle from "../../components/text/Subtitle";
import Text from "../../components/text/Text";
import Title from "../../components/text/Title";

interface ModalProps {
    isVisible: boolean;
    setVisible: (isVisible: boolean) => void;
}

const INIT_YEAR = 1992;

export default function YearModal(props: ModalProps) {
    const [maxYear, setMaxYear] = React.useState(0);

    // Default Behaviour
    if (!props.isVisible)
        return null;

    // Generate List
    let yearsDisplay: JSX.Element[] = [];
    if (maxYear <= INIT_YEAR) {
        TBA.getServerStatus().then((status) => {
            if (status)
                setMaxYear(status.max_season);
            else
                ToastAndroid.show("Failed to connect to TBA", 1000);
        })

        yearsDisplay.push(
            <Text style={styles.loadingText} key={1}>
                Loading All Seasons...
            </Text>
        );
    }
    else {
        for (let y = maxYear; y >= INIT_YEAR; y--) {
            let year = y;
            yearsDisplay.push(
                <Button
                    key={year}
                    onPress={() => { BlitzDB.setYear(year); props.setVisible(false); }}
                    style={styles.regionalButton}>

                    <Text style={styles.regionalText}>
                        {year}
                    </Text>

                </Button>
            );
        }
    }

    // Display Data

    return (
        <Modal setVisible={props.setVisible}>
            <Title>Set Year</Title>
            <Subtitle>Select the current season / year:</Subtitle>
            <HorizontalBar />
            {yearsDisplay}
            <HorizontalBar />
        </Modal>
    );
}

const styles = StyleSheet.create({
    regionalButton: {
        padding: 8,
        marginLeft: 4,
        textAlign: "center"
    },
    regionalText: {
        fontSize: 16
    },
    loadingText: {
        textAlign: "center",
        fontStyle: "italic"
    }
});
