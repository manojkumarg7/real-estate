/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Suspense, useState } from 'react';
import { ActivityIndicator, Dimensions, StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { HomeScreen } from './src/screens/HomeScreen';
import { PropertyDetailScreen } from './src/screens/PropertyDetailScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SearchResultsScreen } from './src/screens/SearchResultsScreen';
import { SplashScreen } from './src/screens/SplashScreen';
import { WishlistScreen } from './src/screens/WishlistScreen';

// Lazy-load MapScreen so MapLibre is only loaded when user opens the map (avoids console errors on app start when native module is not linked)
const MapScreen = React.lazy(() =>
  import('./src/screens/MapScreen').then(m => ({ default: m.MapScreen })),
);

// So SafeAreaProvider shows content immediately instead of waiting for native insets (avoids black screen).
const { width, height } = Dimensions.get('window');
const INITIAL_METRICS = {
  frame: { x: 0, y: 0, width, height },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

type AppScreen = 'splash' | 'home' | 'search' | 'map' | 'wishlist' | 'property-detail' | 'profile';

// Initial favorites matching PROPERTIES that have isFavorite: true
const INITIAL_FAVORITE_IDS = ['1', '6', '8', '11', '15', '18', '21', '24'];

type AppContentProps = {
  screen: AppScreen;
  selectedPropertyId: string | null;
  favoriteIds: string[];
  setScreen: (s: AppScreen) => void;
  setSelectedPropertyId: (id: string | null) => void;
  toggleFavorite: (id: string) => void;
  navigateToPropertyDetail: (id: string) => void;
};

function AppContent({
  screen,
  selectedPropertyId,
  favoriteIds,
  setScreen,
  setSelectedPropertyId,
  toggleFavorite,
  navigateToPropertyDetail,
}: AppContentProps) {
  const showPropertyDetail = screen === 'property-detail' && selectedPropertyId != null;

  if (screen === 'splash') {
    return <SplashScreen onLetsStart={() => setScreen('home')} />;
  }
  if (showPropertyDetail && selectedPropertyId) {
    return (
      <PropertyDetailScreen
        propertyId={selectedPropertyId}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        onBack={() => {
          setSelectedPropertyId(null);
          setScreen('home');
        }}
        onNavigateToPropertyDetail={navigateToPropertyDetail}
      />
    );
  }
  if (screen === 'search') {
    return (
      <SearchResultsScreen
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        onBack={() => setScreen('home')}
        onNavigateToHome={() => setScreen('home')}
        onNavigateToMap={() => setScreen('map')}
        onNavigateToWishlist={() => setScreen('wishlist')}
        onNavigateToPropertyDetail={navigateToPropertyDetail}
        onNavigateToProfile={() => setScreen('profile')}
      />
    );
  }
  if (screen === 'map') {
    return (
      <Suspense
        fallback={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#53587a" />
          </View>
        }
      >
        <MapScreen
          onBack={() => setScreen('search')}
          onPropertySelect={id => {
            if (id !== 'default-property') navigateToPropertyDetail(id);
          }}
        />
      </Suspense>
    );
  }
  if (screen === 'wishlist') {
    return (
      <WishlistScreen
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        onBack={() => setScreen('home')}
        onNavigateToHome={() => setScreen('home')}
        onNavigateToSearch={() => setScreen('search')}
        onNavigateToPropertyDetail={navigateToPropertyDetail}
        onNavigateToProfile={() => setScreen('profile')}
      />
    );
  }
  if (screen === 'profile') {
    return (
      <ProfileScreen
        favoriteIds={favoriteIds}
        onBack={() => setScreen('home')}
        onNavigateToHome={() => setScreen('home')}
        onNavigateToSearch={() => setScreen('search')}
        onNavigateToWishlist={() => setScreen('wishlist')}
      />
    );
  }
  return (
    <HomeScreen
      favoriteIds={favoriteIds}
      onToggleFavorite={toggleFavorite}
      onNavigateToSearch={() => setScreen('search')}
      onNavigateToWishlist={() => setScreen('wishlist')}
      onNavigateToPropertyDetail={navigateToPropertyDetail}
      onNavigateToProfile={() => setScreen('profile')}
    />
  );
}

function App() {
  const [screen, setScreen] = useState<AppScreen>('splash');
  const [favoriteIds, setFavoriteIds] = useState<string[]>(INITIAL_FAVORITE_IDS);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const toggleFavorite = (id: string) => {
    setFavoriteIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id],
    );
  };

  const navigateToPropertyDetail = (id: string) => {
    setSelectedPropertyId(id);
    setScreen('property-detail');
  };

  return (
    <ErrorBoundary>
      <View style={styles.root}>
        <SafeAreaProvider style={styles.safeArea} initialMetrics={INITIAL_METRICS}>
          <StatusBar
            barStyle={screen === 'splash' ? 'light-content' : 'dark-content'}
            backgroundColor={screen === 'splash' ? '#234f68' : '#fff'}
          />
          <AppContent
            screen={screen}
            selectedPropertyId={selectedPropertyId}
            favoriteIds={favoriteIds}
            setScreen={setScreen}
            setSelectedPropertyId={setSelectedPropertyId}
            toggleFavorite={toggleFavorite}
            navigateToPropertyDetail={navigateToPropertyDetail}
          />
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
