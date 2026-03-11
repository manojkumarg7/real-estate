import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  ChevronLeft,
  Heart,
  LayoutGrid,
  LayoutList,
  Search,
  SlidersHorizontal,
  User,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PropertyCard } from '../components/PropertyCard';
import { PROPERTIES } from './HomeScreen';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PADDING = 44;
const CARD_GAP = 10;
const CARD_WIDTH = (SCREEN_WIDTH - H_PADDING - CARD_GAP) / 2;

type ViewMode = 'grid' | 'list' | 'filter';

export function SearchResultsScreen({
  onBack,
  onNavigateToHome,
}: {
  onBack: () => void;
  onNavigateToHome: () => void;
}) {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const paddingTop = insets?.top ?? 0;
  const paddingBottom = insets?.bottom ?? 0;

  const searchLower = searchQuery.trim().toLowerCase();
  const filteredProperties = searchLower
    ? PROPERTIES.filter(
        p =>
          p.title.toLowerCase().includes(searchLower) ||
          p.location.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower),
      )
    : PROPERTIES;

  const count = filteredProperties.length;

  return (
    <View style={[styles.container, { paddingBottom }]}>
      {/* Top bar: back, title, profile */}
      <View style={[styles.header, { paddingTop: paddingTop + 8 }]}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <ChevronLeft size={22} color="#252b5c" />
        </Pressable>
        <Text style={styles.headerTitle}>Search results</Text>
        <View style={styles.profileAvatar}>
          <Image
            source={require('../assets/user-profile.jpg')}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: paddingBottom + 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Search bar */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search House, Apartment, etc"
            placeholderTextColor="#a1a5c1"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Search size={20} color="#252b5c" style={styles.searchIconRight} />
        </View>

        {/* Results count + view toggles */}
        <View style={styles.resultsRow}>
          <Text style={styles.resultsCount}>
            Found {count} {count === 1 ? 'estate' : 'estates'}
          </Text>
          <View style={styles.viewToggles}>
            <Pressable
              style={[
                styles.viewToggle,
                viewMode === 'grid' && styles.viewToggleActive,
              ]}
              onPress={() => setViewMode('grid')}
            >
              <LayoutGrid
                size={18}
                color={viewMode === 'grid' ? '#252b5c' : '#a1a5c1'}
              />
            </Pressable>
            <Pressable
              style={[
                styles.viewToggle,
                viewMode === 'list' && styles.viewToggleActive,
              ]}
              onPress={() => setViewMode('list')}
            >
              <LayoutList
                size={18}
                color={viewMode === 'list' ? '#252b5c' : '#a1a5c1'}
              />
            </Pressable>
            <Pressable
              style={[
                styles.viewToggle,
                viewMode === 'filter' && styles.viewToggleActive,
              ]}
              onPress={() => setViewMode('filter')}
            >
              <SlidersHorizontal
                size={18}
                color={viewMode === 'filter' ? '#252b5c' : '#a1a5c1'}
              />
            </Pressable>
          </View>
        </View>

        {/* Property grid (list view can be added later) */}
        <View style={styles.propertyGrid}>
          {filteredProperties.map(prop => (
            <View
              key={prop.id}
              style={[styles.propertyCardWrapper, { width: CARD_WIDTH }]}
            >
              <PropertyCard
                title={prop.title}
                pricePerMonth={prop.pricePerMonth}
                rating={prop.rating}
                location={prop.location}
                imageSource={prop.imageSource}
                isFavorite={prop.isFavorite}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom navbar - Search active */}
      <View style={[styles.bottomBar, { paddingBottom }]}>
        <View style={styles.bottomBarInner}>
          <Pressable style={styles.tab} onPress={onNavigateToHome}>
            <LayoutGrid size={24} color="#252b5c" style={styles.icon24} />
          </Pressable>
          <Pressable style={styles.tab}>
            <Search size={24} color="#8bc83f" style={styles.icon24} />
            <View style={styles.tabDot} />
          </Pressable>
          <Pressable style={styles.tab}>
            <Heart size={24} color="#252b5c" style={styles.icon24} />
          </Pressable>
          <Pressable style={styles.tab}>
            <User size={24} color="#252b5c" style={styles.icon24} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f4f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#252b5c',
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#f5f4f8',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#f5f4f8',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#252b5c',
    paddingVertical: 0,
  },
  searchIconRight: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  resultsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  resultsCount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#252b5c',
  },
  viewToggles: {
    flexDirection: 'row',
    gap: 8,
  },
  viewToggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f4f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewToggleActive: {
    backgroundColor: '#ecedf3',
  },
  propertyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CARD_GAP,
  },
  propertyCardWrapper: {
    maxWidth: CARD_WIDTH,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 20,
  },
  bottomBarInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#8bc83f',
    marginTop: 4,
  },
  icon24: { width: 24, height: 24 },
});
