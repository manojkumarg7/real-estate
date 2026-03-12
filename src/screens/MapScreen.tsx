/**
 * MapScreen – Full-screen interactive map for property locations.
 * Uses MapLibre React Native with OpenStreetMap style and a center property marker.
 * Built for the Rise Real Estate app; ready to extend with multiple property markers.
 *
 * If the MapLibre native module is not registered, shows a fallback UI and avoids
 * mounting MapView so you don't get "Cannot read event types of null" etc.
 * Fix by running a full native rebuild (see fallback message or docs).
 */

import React, { useMemo } from 'react';
import {
  NativeModules,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ChevronLeft, MapPin } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Load MapLibre once at module scope so the native view is only registered once
// (dynamic require inside the component can cause "tried to register two views with the same name")
const MapLibre = require('@maplibre/maplibre-react-native');

// Lazy-check: only use MapLibre when native module is registered (avoids null refs)
const isMapLibreAvailable = (): boolean =>
  NativeModules.MLRNModule != null;

// ---------------------------------------------------------------------------
// Constants – Bangalore center (GeoJSON order: [longitude, latitude])
// ---------------------------------------------------------------------------
const BANGALORE_CENTER: GeoJSON.Position = [77.5946, 12.9716];
const INITIAL_ZOOM = 13;

// Map style: neutral background + OpenStreetMap raster tiles (streets, places, POIs visible)
const MAP_STYLE: object = {
  version: 8,
  name: 'OSM Streets',
  sources: {
    osm: {
      type: 'raster',
      tiles: [
        'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: { 'background-color': '#f0f0f0' },
    },
    {
      id: 'osm-raster',
      type: 'raster',
      source: 'osm',
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type MapScreenProps = {
  /** Optional list of property coordinates to show as markers; defaults to center only */
  propertyCoordinates?: Array<{ id: string; coordinate: GeoJSON.Position; title?: string }>;
  /** Called when the user taps the back button */
  onBack: () => void;
  /** Optional callback when a property marker is selected */
  onPropertySelect?: (id: string) => void;
};

// ---------------------------------------------------------------------------
// MapScreen Component
// ---------------------------------------------------------------------------
export function MapScreen({
  propertyCoordinates,
  onBack,
  onPropertySelect,
}: MapScreenProps) {
  const insets = useSafeAreaInsets();
  const paddingTop = insets?.top ?? 0;

  const mapAvailable = useMemo(() => isMapLibreAvailable(), []);

  // Use provided markers or a single default property at Bangalore center
  const markers =
    propertyCoordinates && propertyCoordinates.length > 0
      ? propertyCoordinates
      : [
          {
            id: 'default-property',
            coordinate: BANGALORE_CENTER,
            title: 'Property location',
          },
        ];

  // When native module is not registered, show fallback to avoid "event types of null" etc.
  if (!mapAvailable) {
    return (
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: paddingTop + 8 }]}>
          <Pressable
            style={styles.backButton}
            onPress={onBack}
            accessibilityLabel="Go back"
          >
            <ChevronLeft size={24} color="#252b5c" />
          </Pressable>
          <Text style={styles.headerTitle}>Map</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.fallback}>
          <MapPin size={48} color="#53587a" />
          <Text style={styles.fallbackTitle}>Map not available</Text>
          <Text style={styles.fallbackText}>
            The MapLibre native module was not registered. Run a full native
            rebuild so the map works.
          </Text>
          <Text style={styles.fallbackSteps}>
            Android: npx react-native run-android
          </Text>
          <Text style={styles.fallbackSteps}>
            iOS: add $MLRN.post_install(installer) in ios/Podfile post_install,
            then cd ios && pod install
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Full-screen map with zoom and pan enabled by default */}
      <MapLibre.MapView
        style={styles.map}
        mapStyle={MAP_STYLE}
        zoomEnabled
        scrollEnabled
        pitchEnabled
        rotateEnabled
        onDidFinishLoadingMap={() => {
          // Optional: handle map load complete (e.g. analytics)
        }}
      >
        {/* Camera: center on Bangalore with initial zoom 12–14 */}
        <MapLibre.Camera
          defaultSettings={{
            centerCoordinate: BANGALORE_CENTER,
            zoomLevel: INITIAL_ZOOM,
          }}
          centerCoordinate={BANGALORE_CENTER}
          zoomLevel={INITIAL_ZOOM}
          minZoomLevel={8}
          maxZoomLevel={18}
        />

        {/* Property markers */}
        {markers.map(({ id, coordinate, title }) => (
          <MapLibre.PointAnnotation
            key={id}
            id={id}
            coordinate={coordinate}
            title={title}
            selected={markers.length === 1}
            onSelected={() => onPropertySelect?.(id)}
          >
            <View style={styles.markerContainer}>
              <View style={styles.markerPin}>
                <MapPin size={22} color="#fff" />
              </View>
            </View>
            <MapLibre.Callout
              title={title ?? 'Property'}
              textStyle={styles.calloutText}
              contentStyle={styles.calloutContent}
            />
          </MapLibre.PointAnnotation>
        ))}
      </MapLibre.MapView>

      {/* Header with back button */}
      <View style={[styles.header, { paddingTop: paddingTop + 8 }]}>
        <Pressable
          style={styles.backButton}
          onPress={onBack}
          accessibilityLabel="Go back"
        >
          <ChevronLeft size={24} color="#252b5c" />
        </Pressable>
        <Text style={styles.headerTitle}>Map</Text>
        <View style={styles.headerSpacer} />
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles – responsive full-screen map via flex: 1
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#252b5c',
  },
  headerSpacer: {
    width: 40,
  },
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  fallbackTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#252b5c',
    marginTop: 16,
  },
  fallbackText: {
    fontSize: 14,
    color: '#53587a',
    textAlign: 'center',
    marginTop: 8,
  },
  fallbackSteps: {
    fontSize: 12,
    color: '#53587a',
    marginTop: 16,
    fontFamily: 'monospace',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerPin: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#c53030',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 6,
  },
  calloutContent: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 120,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
  },
  calloutText: {
    color: '#252b5c',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
