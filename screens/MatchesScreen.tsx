import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, Container, Title } from '../components/Themed';

export default function MatchesScreen() {
  return (
    <Container>
        <Title>Matches</Title>
        <Text>Match data has not been downloaded from TBA yet. Download is available under settings</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
