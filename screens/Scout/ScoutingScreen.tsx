import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Button from '../../components/common/Button';
import ScrollContainer from '../../components/containers/ScrollContainer';
import ScoutingElement from '../../components/elements/ScoutingElement';
import Text from '../../components/text/Text';
import useTeam from '../../hooks/useTeam';
import useTemplate from '../../hooks/useTemplate';
import { ElementData, ScoutingData } from '../../types/TemplateTypes';

export default function ScoutingScreen({ route }: any) {
    const navigator = useNavigation();
    const [template, setTemplate] = useTemplate(route.params.templateType);
    const [team, setTeam] = useTeam(route.params.teamID);

    const onChange = (element: ElementData) => {
        const index = template.findIndex(e => e.id === element.id);
        if (index >= 0)
            template[index] = element;
    }

    const onSubmit = () => {
        let data: ScoutingData = {
            matchID: route.params.matchID,
            values: []
        };
        for (let element of template) {
            if (element.value !== undefined)
                data.values.push(element.value);
        }
        team.scoutingData.push(data);
        setTeam(team);
        navigator.goBack();
        navigator.goBack();
        Alert.alert("Success", "Data has been saved to storage");
    }

    React.useLayoutEffect(() => {
        navigator.setOptions({
            title: team.number.toString()
        });
    })

    return (
        <View style={styles.parentView}>
            <ScrollContainer>
                {template.map((element, index) =>
                    <ScoutingElement
                        data={element}
                        isEditable={false}
                        key={index}
                        onChange={onChange} />
                )}

                <Button
                    style={styles.submitButton}
                    onPress={onSubmit}>

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
        margin: 10,
        marginTop: 0,

        backgroundColor: "#c89f00"
    },
    buttonText: {
        color: "#000000",
        fontWeight: "bold"
    }
});