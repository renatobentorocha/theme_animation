import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { ThemeProvider } from 'styled-components';

import { darkThemeVariables } from './src/theme/dark';
import { Post } from './src/components/Post';

import { Box } from './src/components/Bases';
import { Header } from './src/components/Header';
import { SubHeader } from './src/components/SubHeader';
import { Sale } from './src/components/Sale';
import { Button } from './src/components/Button';

export default function App() {
  return (
    <ThemeProvider theme={darkThemeVariables}>
      <Box bg="background.main" flex={1}>
        <Header />
        <Box mt={20} mb={16} px={16}>
          <SubHeader />
        </Box>
        <Box>
          <ScrollView
            horizontal
            contentContainerStyle={{ paddingLeft: 16 }}
            showsHorizontalScrollIndicator={false}
          >
            <Post />
            <Post ml={16} bg="#FFAF66" />
            <Post ml={16} />
          </ScrollView>
        </Box>
        <Box py={StyleSheet.hairlineWidth} bg="background.stroke" my={16} />
        <Sale />
        <Box px={16}>
          <Button />
        </Box>

        <StatusBar style="auto" />
      </Box>
    </ThemeProvider>
  );
}
