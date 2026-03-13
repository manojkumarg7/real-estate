import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, RadialGradient as SvgRadialGradient, Rect, Stop } from 'react-native-svg';

/**
 * Soft radial gradient overlay: transparent at center, darker toward edges.
 * Premium vignette effect for splash and full-screen backgrounds.
 */
type RadialGradientOverlayProps = {
  width: number;
  height: number;
  /** Center opacity (0 = transparent) */
  centerOpacity?: number;
  /** Edge opacity (0–1, higher = darker edges) */
  edgeOpacity?: number;
  /** Optional tint color (default dark blue) */
  color?: string;
};

const DEFAULT_COLOR = '#1F4C6B';

export function RadialGradientOverlay({
  width,
  height,
  centerOpacity = 0,
  edgeOpacity = 0.55,
  color = DEFAULT_COLOR,
}: RadialGradientOverlayProps) {
  if (width <= 0 || height <= 0) return null;

  return (
    <View style={[StyleSheet.absoluteFill, styles.overlay]} pointerEvents="none">
      <Svg width={width} height={height} style={styles.svg}>
        <Defs>
          <SvgRadialGradient
            id="splashRadialGradient"
            cx="0.5"
            cy="0.5"
            r="0.7"
            gradientUnits="objectBoundingBox"
          >
            <Stop offset="0" stopColor={color} stopOpacity={centerOpacity} />
            <Stop offset="0.5" stopColor={color} stopOpacity={edgeOpacity * 0.4} />
            <Stop offset="1" stopColor={color} stopOpacity={edgeOpacity} />
          </SvgRadialGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#splashRadialGradient)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'transparent',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
