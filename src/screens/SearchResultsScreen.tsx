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
  MapPin,
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

        {/* Property grid or list */}
        {viewMode === 'list' ? (
          <View style={styles.propertyList}>
            {filteredProperties.map(prop => (
              <Pressable key={prop.id} style={styles.listCard}>
                <View style={styles.listCardImageWrap}>
                  <Image
                    source={prop.imageSource}
                    style={styles.listCardImage}
                    resizeMode="cover"
                  />
                  <Pressable style={styles.listFavoriteBtn} hitSlop={8}>
                    <View
                      style={[
                        styles.listHeartCircle,
                        prop.isFavorite && styles.listHeartCircleActive,
                      ]}
                    >
                      <Heart
                        size={14}
                        color={prop.isFavorite ? '#fff' : '#53587a'}
                        fill={prop.isFavorite ? '#fff' : 'none'}
                      />
                    </View>
                  </Pressable>
                  <View style={styles.listCategoryTag}>
                    <Text style={styles.listCategoryText}>{prop.category}</Text>
                  </View>
                </View>
                <View style={styles.listCardContent}>
                  <Text style={styles.listCardTitle} numberOfLines={1}>
                    {prop.title}
                  </Text>
                  <View style={styles.listMetaColumn}>
                    <Text style={styles.listRating}>★ {prop.rating}</Text>
                    <View style={styles.listLocationRow}>
                      <MapPin size={10} color="#53587a" />
                      <Text style={styles.listLocation} numberOfLines={1}>
                        {prop.location}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.listPrice}>
                    $ {prop.pricePerMonth}
                    <Text style={styles.listPricePeriod}>/month</Text>
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
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
        )}
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
  propertyList: {
    gap: 12,
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  listCardImageWrap: {
    width: '42%',
    aspectRatio: 1.1,
    backgroundColor: '#e8e8e8',
    overflow: 'hidden',
  },
  listCardImage: {
    width: '100%',
    height: '100%',
  },
  listFavoriteBtn: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  listHeartCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  listHeartCircleActive: {
    backgroundColor: '#8bc83f',
  },
  listCategoryTag: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(35,79,104,0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  listCategoryText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  listCardContent: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
  },
  listCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#252b5c',
    letterSpacing: 0.3,
    marginBottom: 5,
  },
  listMetaColumn: {
    flexDirection: 'column',
    gap: 4,
  },
  listRating: {
    fontSize: 11,
    fontWeight: '700',
    color: '#53587a',
  },
  listLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    minWidth: 0,
  },
  listLocation: {
    fontSize: 11,
    color: '#53587a',
    flex: 1,
  },
  listPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#252b5c',
  },
  listPricePeriod: {
    fontSize: 11,
    fontWeight: '500',
    color: '#53587a',
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
