import * as React from 'react';
import { TemplateType } from '../../../api/DBModels';
import HorizontalBar from '../../../components/common/HorizontalBar';
import Modal from '../../../components/common/Modal';
import StandardButton from '../../../components/common/StandardButton';
import Subtitle from '../../../components/text/Subtitle';
import Title from '../../../components/text/Title';

interface ModalProps
{
    setType: (type: TemplateType) => void;
    type: TemplateType
}

const StringTypes = [
    "NULL",
    "Pit",
    "Match"
];

export default function TemplateModal(props: ModalProps)
{
    // Default Behaviour
    if (props.type === TemplateType.None)
        return null;

    let stringType = StringTypes[props.type];

    return (
        <Modal setVisible={() => { props.setType(TemplateType.None); }} >
            <Title>Edit Template</Title>
            <Subtitle>{stringType} Scouting</Subtitle>
            <HorizontalBar />
            <StandardButton
                iconType={"plus"}
                title={"Add Element"}
                subtitle={"Adds a counter, textbox, or other input"}
                onPress={() => {}}/>
        </Modal>
    );
}