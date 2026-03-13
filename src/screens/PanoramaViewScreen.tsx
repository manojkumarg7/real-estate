/**
 * PanoramaViewScreen – Full-screen 360° panoramic view using WebView + Pannellum.
 * Opens from the property detail "360" button; shows the bundled panorama image
 * with drag-to-rotate and optional property card overlay.
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ChevronLeft, MapPin, Star } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { PROPERTIES } from './HomeScreen';

const PANORAMA_ASSET = require('../assets/Panorama Viewer.jpg');

// Convert ArrayBuffer to base64; use global btoa when available
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 2048;
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
    binary += String.fromCharCode.apply(null, chunk as unknown as number[]);
  }
  const g = typeof globalThis !== 'undefined' ? globalThis : undefined;
  const btoaFn =
    g &&
    typeof (g as unknown as { btoa?: (s: string) => string }).btoa ===
      'function'
      ? (g as unknown as { btoa: (s: string) => string }).btoa
      : null;
  return btoaFn ? btoaFn(binary) : '';
}

// Resolve asset and try to load as base64 so WebView can display it (works on all platforms)
function usePanoramaDataUrl(): string | null {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const resolved = Image.resolveAssetSource(PANORAMA_ASSET);
    const uri = resolved?.uri;

    if (typeof uri !== 'string' || uri.length === 0) {
      setDataUrl('https://pannellum.org/images/alma.jpg');
      return;
    }

    fetch(uri)
      .then(res => res.arrayBuffer())
      .then(buffer => {
        if (cancelled) return;
        const base64 = arrayBufferToBase64(buffer);
        if (base64) {
          setDataUrl(`data:image/jpeg;base64,${base64}`);
        } else {
          setDataUrl(uri);
        }
      })
      .catch(() => {
        if (!cancelled) setDataUrl(uri);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return dataUrl;
}

function buildPanoramaHTML(panoramaUrl: string): string {
  const encodedUrl = panoramaUrl
    .replace(/\\/g, '\\\\')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;');
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.7/build/pannellum.css"/>
  <script src="https://cdn.jsdelivr.net/npm/pannellum@2.5.7/build/pannellum.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 100%; height: 100%; overflow: hidden; }
    #panorama { width: 100%; height: 100%; }
  </style>
</head>
<body>
  <div id="panorama"></div>
  <script>
    pannellum.viewer('panorama', {
      type: 'equirectangular',
      panorama: "${encodedUrl}",
      autoLoad: true,
      showControls: false
    });
  </script>
</body>
</html>
`;
}

export type PanoramaViewScreenProps = {
  onBack: () => void;
  /** When opened from property detail, show this property's card at the bottom */
  propertyId?: string | null;
};

export function PanoramaViewScreen({
  onBack,
  propertyId,
}: PanoramaViewScreenProps) {
  const insets = useSafeAreaInsets();
  const paddingTop = insets?.top ?? 0;
  const paddingBottom = insets?.bottom ?? 0;

  const panoramaUrl = usePanoramaDataUrl();
  const html = useMemo(
    () => (panoramaUrl ? buildPanoramaHTML(panoramaUrl) : ''),
    [panoramaUrl],
  );

  const property = propertyId
    ? PROPERTIES.find(p => p.id === propertyId)
    : null;

  if (!panoramaUrl || !html) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8bc83f" style={styles.loader} />
        <Text style={styles.loadingText}>Loading panorama…</Text>
        <View style={[styles.header, { paddingTop: paddingTop + 12 }]}>
          <Pressable style={styles.backButton} onPress={onBack}>
            <View style={styles.backButtonCircle}>
              <ChevronLeft size={24} color="#252b5c" />
            </View>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ html }}
        style={styles.webview}
        scrollEnabled={false}
        bounces={false}
        originWhitelist={['*']}
        mixedContentMode="compatibility"
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled
        domStorageEnabled
      />
      {/* Back button */}
      <View style={[styles.header, { paddingTop: paddingTop + 12 }]}>
        <Pressable
          style={styles.backButton}
          onPress={onBack}
          accessibilityLabel="Go back"
        >
          <View style={styles.backButtonCircle}>
            <ChevronLeft size={24} color="#252b5c" />
          </View>
        </Pressable>
      </View>
      {/* Room label – above the card so they don't overlap */}
      <View
        style={[
          styles.roomLabelWrap,
          {
            bottom: property
              ? paddingBottom + 16 + 72 + 12 + 12 + 8
              : paddingBottom + 24,
          },
        ]}
      >
        <Text style={styles.roomLabel}>Living Room</Text>
      </View>
      {/* Property detail card at bottom */}
      {property && (
        <View style={[styles.cardWrap, { paddingBottom: paddingBottom + 16 }]}>
          <View style={styles.card}>
            <Image
              source={property.imageSource}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{property.title}</Text>
              <View style={styles.cardRow}>
                <Star size={14} color="#FFD700" fill="#FFD700" />
                <Text style={styles.cardRating}>{property.rating}</Text>
              </View>
              <View style={styles.cardRow}>
                <MapPin size={14} color="#252b5c" />
                <Text style={styles.cardLocation} numberOfLines={1}>
                  {property.location}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -24,
    marginTop: -24,
  },
  loadingText: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    marginTop: 16,
    textAlign: 'center',
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  backButton: {
    padding: 4,
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: { elevation: 4 },
    }),
  },
  roomLabelWrap: {
    position: 'absolute',
    left: 16,
  },
  roomLabel: {
    backgroundColor: 'rgba(37, 43, 92, 0.85)',
    color: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: '600',
    overflow: 'hidden',
  },
  cardWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: { elevation: 4 },
    }),
  },
  cardImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#252b5c',
    marginBottom: 4,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  cardRating: {
    fontSize: 13,
    color: '#252b5c',
    marginLeft: 4,
  },
  cardLocation: {
    fontSize: 13,
    color: '#53587a',
    marginLeft: 4,
    flex: 1,
  },
});
