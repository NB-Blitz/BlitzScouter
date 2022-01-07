import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../components/common/Button';
import HorizontalBar from '../../components/common/HorizontalBar';
import ScrollContainer from '../../components/containers/ScrollContainer';
import ScoutingElement from '../../components/elements/ScoutingElement';
import Text from '../../components/text/Text';

export default function ScoutingScreen({ route }: any) {
    const template = BlitzDB.matchTemplate.useTemplate();
    const navigator = useNavigation();

    // Element Preview
    let elementList: JSX.Element[] = [];
    elementList = template.map(element => <ScoutingElement data={element} isEditable={false} key={Math.random()} />)

    return (
        <View style={styles.parentView}>
            <ScrollContainer>
                {elementList}

                <HorizontalBar />

                <Button
                    style={styles.submitButton}
                    onPress={() => { }}>

                    <Text style={styles.buttonText}>Submit</Text>

                </Button>
            </ScrollContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    parentView: {
        height: "100%",
        width: "100%"
    },
    submitButton: {
        height: 40,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        marginTop: 0,

        backgroundColor: "#c89f00"
    },
    buttonText: {
        color: "#000000",
        fontWeight: "bold"
    }
});