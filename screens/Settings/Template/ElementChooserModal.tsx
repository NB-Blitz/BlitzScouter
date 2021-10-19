import * as React from 'react';
import { BlitzDB } from '../../../api/BlitzDB';
import { ElementType, TemplateType } from '../../../api/DBModels';
import HorizontalBar from '../../../components/common/HorizontalBar';
import Modal from '../../../components/common/Modal';
import StandardButton from '../../../components/common/StandardButton';
import Subtitle from '../../../components/text/Subtitle';
import Title from '../../../components/text/Title';

interface ModalProps {
    isVisible: boolean;
    setVisible: (isVisible: boolean) => void;
    type: TemplateType;
}

export default function ElementChooserModal(props: ModalProps) {
    // Default Behaviour
    if (!props.isVisible)
        return null;

    const chooseElement = (type: ElementType) => {
        BlitzDB.templates[props.type].push({
            type: type,
            label: "Element",
            options: {}
        });

        props.setVisible(false);
    }

    return (
        <Modal setVisible={props.setVisible} >
            <Title>Add Element</Title>
            <Subtitle>Choose an element to add:</Subtitle>
            <HorizontalBar />

            <StandardButton
                iconType={"hashtag"}
                title={"Counter"}
                subtitle={"Increment and decrement a number"}
                onPress={() => { }} />

            <StandardButton
                iconType={"check-square-o"}
                title={"Checkbox"}
                subtitle={"A simple check or uncheck"}
                onPress={() => { }} />

            <StandardButton
                iconType={"pencil-square-o"}
                title={"Textbox"}
                subtitle={"Type in text or comments"}
                onPress={() => { }} />

            <StandardButton
                iconType={"star"}
                title={"5-Star Rating"}
                subtitle={"Similar to reviews"}
                onPress={() => { }} />

            <HorizontalBar />

            <StandardButton
                iconText={"T"}
                title={"Title"}
                subtitle={"A title or section for scouters"}
                onPress={() => { chooseElement(ElementType.title); }} />

            <StandardButton
                iconText={"S"}
                title={"Subtitle"}
                subtitle={"A title or section for scouters"}
                onPress={() => { chooseElement(ElementType.subtitle); }} />

            <StandardButton
                iconText={"F"}
                title={"Text"}
                subtitle={"A description or instructions for scouters"}
                onPress={() => { chooseElement(ElementType.text); }} />

            <StandardButton
                iconText={"-"}
                title={"Horizontal Rule"}
                subtitle={"A divider to seperate sections"}
                onPress={() => { chooseElement(ElementType.hr); }} />
        </Modal>
    );
}