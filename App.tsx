/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { Dimensions, Platform, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { HomeScreen } from './src/screens/HomeScreen';
import { SearchResultsScreen } from './src/screens/SearchResultsScreen';
import { SplashScreen } from './src/screens/SplashScreen';

// So SafeAreaProvider shows content immediately instead of waiting for native insets (avoids black screen).
const { width, height } = Dimensions.get('window');
const INITIAL_METRICS = {
  frame: { x: 0, y: 0, width, height },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

type AppScreen = 'splash' | 'home' | 'search';

function App() {
  const [screen, setScreen] = useState<AppScreen>('splash');

  return (
    <ErrorBoundary>
      <View style={styles.root}>
        <SafeAreaProvider style={styles.safeArea} initialMetrics={INITIAL_METRICS}>
          <StatusBar
            barStyle={screen === 'splash' ? 'light-content' : 'dark-content'}
            backgroundColor={screen === 'splash' ? '#234f68' : '#fff'}
          />
          {screen === 'splash' ? (
            <SplashScreen onLetsStart={() => setScreen('home')} />
          ) : screen === 'search' ? (
            <SearchResultsScreen
              onBack={() => setScreen('home')}
              onNavigateToHome={() => setScreen('home')}
            />
          ) : (
            <HomeScreen onNavigateToSearch={() => setScreen('search')} />
          )}
        </SafeAreaProvider>
      </View>
    </ErrorBoundary>
  );
}

const styles = {
  root: {
    flex: 1,
    backgroundColor: '#234f68',
  } as const,
  safeArea: {
    flex: 1,
  } as const,
};

export default App;
