import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { RadialGradientOverlay } from '../components/RadialGradientOverlay';

// Radial gradient layer: radial-gradient(746.5% 129.57% at 50% 100%, rgba(33, 98, 138, 0) 5.19%, #1F4C6B 56.53%)

type SplashScreenProps = {
  onLetsStart: () => void;
};

export function SplashScreen({ onLetsStart }: SplashScreenProps) {
  const insets = useSafeAreaInsets();
  const paddingTop = insets?.top ?? 0;
  const paddingBottom = insets?.bottom ?? 0;

  return (
    <View style={[styles.container, { paddingTop, paddingBottom }]}>
      {/* Base background color (matches Figma bg) */}
      <View style={[StyleSheet.absoluteFill, styles.baseBg]} />

      {/* Radial gradient layer from bottom: transparent 5.19% → #1F4C6B 56.53% */}
      <RadialGradientOverlay />

      {/* Centered content: logo + title */}
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

      {/* Bottom: CTA button + version */}
      <View style={styles.bottom}>
        <Button title="let's start" onPress={onLetsStart} />
        <Text style={styles.version}>v.1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#234f68',
  },
  baseBg: {
    backgroundColor: '#234f68',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 172,
    height: 155,
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
