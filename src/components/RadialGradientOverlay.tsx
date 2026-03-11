import React from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * Gradient overlay matching (approximated with Views, no native SVG):
 * radial-gradient(746.5% 129.57% at 50% 100%, rgba(33, 98, 138, 0) 5.19%, #1F4C6B 56.53%)
 * Center at bottom — transparent at top, #1F4C6B at bottom.
 */
const OVERLAY_COLOR = '#1F4C6B';

export function RadialGradientOverlay() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Solid overlay from ~40% down to simulate radial gradient from bottom */}
      <View style={styles.bottomOverlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '38%',
    bottom: 0,
    backgroundColor: OVERLAY_COLOR,
  },
});
