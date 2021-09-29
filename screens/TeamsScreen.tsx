import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TBA } from '../components/TBA';

import { Text, Title, Container } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TeamsScreen({ navigation }: RootTabScreenProps<'Teams'>) {
    return (
        <Container>
            <Title>Teams</Title>
            <Text>Team data has not been downloaded from TBA yet. Download is available under settings</Text>
        </Container>
    );
}

const styles = StyleSheet.create({

});
