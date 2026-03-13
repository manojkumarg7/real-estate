import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient as SvgRadialGradient, Rect, Stop } from 'react-native-svg';

/**
 * Full-screen radial gradient overlay. Center at bottom (50%, 100%).
 * Fades in from transparent at center, builds color, then fades out toward the top.
 */
type RadialGradientOverlayProps = {
  width: number;
  height: number;
  /** Gradient color (default #1F4C6B) */
  color?: string;
};

const DEFAULT_COLOR = '#1F4C6B';

export function RadialGradientOverlay({
  width,
  height,
  color = DEFAULT_COLOR,
}: RadialGradientOverlayProps) {
  if (width <= 0 || height <= 0) return null;

  return (
    <View
      style={[StyleSheet.absoluteFill, styles.overlay, { width, height }]}
      pointerEvents="none"
    >
      <Svg width={width} height={height} style={styles.svg}>
        <Defs>
          <SvgRadialGradient
            id="splashRadialGradient"
            cx="0.5"
            cy="1"
            r="1.2"
            gradientUnits="objectBoundingBox"
          >
            <Stop offset="0" stopColor={color} stopOpacity="0" />
            <Stop offset="0.08" stopColor={color} stopOpacity="0" />
            <Stop offset="0.35" stopColor={color} stopOpacity="0.4" />
            <Stop offset="0.55" stopColor={color} stopOpacity="0.75" />
            <Stop offset="0.72" stopColor={color} stopOpacity="0.5" />
            <Stop offset="0.88" stopColor={color} stopOpacity="0.15" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </SvgRadialGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#splashRadialGradient)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
