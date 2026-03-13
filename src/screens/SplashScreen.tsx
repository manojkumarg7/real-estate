import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { RadialGradientOverlay } from '../components/RadialGradientOverlay';

// Use 'screen' so the background covers the entire display (including status bar area)
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

type SplashScreenProps = {
  onLetsStart: () => void;
};

export function SplashScreen({ onLetsStart }: SplashScreenProps) {
  const insets = useSafeAreaInsets();
  const paddingTop = insets?.top ?? 0;
  const paddingBottom = insets?.bottom ?? 0;

  return (
    <View style={styles.container}>
      {/* Full-screen background layer: no safe area, covers entire screen */}
      <View style={[styles.backgroundLayer, { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }]}>
        <Image
          source={require('../assets/splash-bg.png')}
          style={styles.splashBgImage}
          resizeMode="cover"
          accessibilityLabel="Splash background"
        />
        <RadialGradientOverlay
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          color="#1F4C6B"
        />
      </View>

      {/* Content: safe area padding, center-aligned and responsive */}
      <View style={[styles.content, { paddingTop, paddingBottom }]}>
        <View style={styles.centered}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="Rise Real Estate logo"
          />
          <Text style={styles.titleRise}>Rise</Text>
          <Text style={styles.titleRealEstate}>Real Estate</Text>
        </View>

        <View style={styles.bottom}>
          <Button title="let's start" onPress={onLetsStart} />
          <Text style={styles.version}>v.1.0</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#234f68',
  },
  backgroundLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  splashBgImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 172,
    height: 155,
    maxWidth: '70%',
    marginBottom: 16,
  },
  titleRise: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -1.08,
    marginBottom: 3,
  },
  titleRealEstate: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -1.08,
  },
  bottom: {
    alignItems: 'center',
    paddingBottom: 24,
    gap: 16,
  },
  version: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
