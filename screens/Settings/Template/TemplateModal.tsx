import * as React from 'react';
import { Alert } from 'react-native';
import { ElementData, TemplateType } from '../../../api/models/TemplateModels';
import HorizontalBar from '../../../components/common/HorizontalBar';
import Modal from '../../../components/common/Modal';
import StandardButton from '../../../components/common/StandardButton';
import ScoutingElement from '../../../components/elements/ScoutingElement';
import Subtitle from '../../../components/text/Subtitle';
import Text from '../../../components/text/Text';
import Title from '../../../components/text/Title';
import ElementChooserModal from './ElementChooserModal';

interface ModalProps {
    isVisible: boolean;
    setVisible: (isVisible: boolean) => void;
    type: TemplateType;
}

const StringTypes = [
    "Pit",
    "Match"
];

export default function TemplateModal(props: ModalProps) {
    const [isVisible, setVisible] = React.useState(false);
    const [version, setVersion] = React.useState(0);

    // Default Behaviour
    if (!props.isVisible)
        return null;

    // Element Preview
    const stringType = StringTypes[props.type];
    const template: ElementData[] = []; //BlitzDB.templates[props.type];
    let elementList: JSX.Element[] = [];
    if (template.length > 0) {
        for (let elementData of template) {
            elementList.push(
                <ScoutingElement data={elementData} key={Math.random()} />
            );
        }
    }
    else {
        elementList.push(<Text key={"0"}>There are no elements yet. Add an element to scout below</Text>);
    }

    // Clear Behaviour
    const clearTemplate = () => {
        Alert.alert("Are you sure?", "This will delete all elements in this template. Are you sure you want to continue?",
            [
                {
                    text: "Confirm",
                    onPress: () => {
                        //BlitzDB.templates[props.type] = [];
                        setVersion(version + 1);
                    }
                },
                { text: "Cancel", style: "cancel" }
            ], { cancelable: true }
        );
    }

    return (
        <Modal setVisible={props.setVisible} >

            <Title>Edit Template</Title>
            <Subtitle>{stringType} Scouting</Subtitle>

            <HorizontalBar />

            {elementList}

            <HorizontalBar />
            <StandardButton
                iconType={"plus"}
                title={"Add Element"}
                subtitle={"Adds a counter, textbox, or other input"}
                onPress={() => { setVisible(true); }} />

            <StandardButton
                iconType={"trash"}
                title={"Clear Template"}
                subtitle={"Removes all elements from the template"}
                onPress={() => { clearTemplate(); }} />

            <ElementChooserModal type={props.type} isVisible={isVisible} setVisible={setVisible} />
        </Modal>
    );
}