import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import BlitzDB from '../../../api/BlitzDB';
import { ElementType } from '../../../api/models/TemplateModels';
import HorizontalBar from '../../../components/common/HorizontalBar';
import StandardButton from '../../../components/common/StandardButton';
import ScrollContainer from '../../../components/containers/ScrollContainer';
import Subtitle from '../../../components/text/Subtitle';
import Title from '../../../components/text/Title';

export default function ElementChooserScreen({ route }: any) {
    const navigator = useNavigation();
    const templateType = route.params.templateType;

    const chooseElement = (elementType: ElementType) => {
        BlitzDB.matchTemplate.addElement({
            id: BlitzDB.generateID(),
            type: elementType,
            label: "",
            options: {}
        });
        navigator.goBack();
    }

    return (
        <ScrollContainer>
            <Title>Add Element</Title>
            <Subtitle>Choose an element to add:</Subtitle>
            <HorizontalBar />

            <StandardButton
                iconType={"import-export"}
                title={"Counter"}
                subtitle={"Increment and decrement a number"}
                onPress={() => { chooseElement(ElementType.counter); }} />

            <StandardButton
                iconType={"check-box"}
                title={"Checkbox"}
                subtitle={"A simple check or uncheck"}
                onPress={() => { chooseElement(ElementType.checkbox); }} />

            <StandardButton
                iconType={"text-fields"}
                title={"Textbox"}
                subtitle={"Type in text or comments"}
                onPress={() => { chooseElement(ElementType.textbox); }} />

            <HorizontalBar />

            <StandardButton
                iconText={"T"}
                title={"Title"}
                subtitle={"A title or section for scouters"}
                onPress={() => { chooseElement(ElementType.title); }} />

            <StandardButton
                iconText={"S"}
                title={"Subtitle"}
                subtitle={"A sub-title or section for scouters"}
                onPress={() => { chooseElement(ElementType.subtitle); }} />

            <StandardButton
                iconText={"F"}
                title={"Text"}
                subtitle={"A description or instructions for scouters"}
                onPress={() => { chooseElement(ElementType.text); }} />

            <StandardButton
                iconType={"horizontal-rule"}
                title={"Horizontal Rule"}
                subtitle={"A divider to seperate sections"}
                onPress={() => { chooseElement(ElementType.hr); }} />

        </ScrollContainer>
    );
}