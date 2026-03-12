import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
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

const PROPERTY_TYPES = ['All', 'House', 'Apartment', 'Villa'] as const;
type PropertyTypeFilter = (typeof PROPERTY_TYPES)[number];

type ViewMode = 'grid' | 'list' | 'filter';

export function SearchResultsScreen({
  favoriteIds,
  onToggleFavorite,
  onBack,
  onNavigateToHome,
  onNavigateToWishlist,
  onNavigateToPropertyDetail,
}: {
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onNavigateToHome: () => void;
  onNavigateToWishlist: () => void;
  onNavigateToPropertyDetail?: (id: string) => void;
}) {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterPropertyType, setFilterPropertyType] =
    useState<PropertyTypeFilter>('All');
  const [filterLocation, setFilterLocation] = useState('Semarang');
  // Applied filter: only these affect the list until user taps "Apply Filter"
  const [appliedPropertyType, setAppliedPropertyType] =
    useState<PropertyTypeFilter>('All');
  const [appliedLocation, setAppliedLocation] = useState('');
  const paddingTop = insets?.top ?? 0;
  const paddingBottom = insets?.bottom ?? 0;

  const searchLower = searchQuery.trim().toLowerCase();
  let filteredProperties = searchLower
    ? PROPERTIES.filter(
        p =>
          p.title.toLowerCase().includes(searchLower) ||
          p.location.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower),
      )
    : [...PROPERTIES];
  if (appliedPropertyType !== 'All') {
    filteredProperties = filteredProperties.filter(
      p => p.category === appliedPropertyType,
    );
  }
  if (appliedLocation.trim()) {
    const locLower = appliedLocation.trim().toLowerCase();
    filteredProperties = filteredProperties.filter(p =>
      p.location.toLowerCase().includes(locLower),
    );
  }

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
                filterVisible && styles.viewToggleActive,
              ]}
              onPress={() => {
                setFilterPropertyType(appliedPropertyType);
                setFilterLocation(appliedLocation.trim() || 'Semarang');
                setFilterVisible(true);
              }}
            >
              <SlidersHorizontal
                size={18}
                color={filterVisible ? '#252b5c' : '#a1a5c1'}
              />
            </Pressable>
          </View>
        </View>

        {/* Filter bottom overlay */}
        <Modal
          visible={filterVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setFilterVisible(false)}
        >
          <View style={styles.filterModalContainer}>
            <TouchableWithoutFeedback onPress={() => setFilterVisible(false)}>
              <View style={styles.filterBackdrop} />
            </TouchableWithoutFeedback>
            <View
              style={[
                styles.filterSheet,
                { paddingBottom: paddingBottom + 24 },
              ]}
              onStartShouldSetResponder={() => true}
            >
              <TouchableWithoutFeedback>
                <View>
                  <View style={styles.filterHandle} />
                  <View style={styles.filterHeader}>
                    <Text style={styles.filterTitle}>Filter</Text>
                    <Pressable
                      style={styles.filterResetBtn}
                    onPress={() => {
                      setFilterPropertyType('All');
                      setFilterLocation('Semarang');
                      setAppliedPropertyType('All');
                      setAppliedLocation('');
                    }}
                    >
                      <Text style={styles.filterResetText}>Reset</Text>
                    </Pressable>
                  </View>
                  <View style={styles.filterBody}>
                    <View style={styles.filterSection}>
                      <View style={styles.filterSectionTitleRow}>
                        <Text style={styles.filterSectionTitle}>
                          Property type
                        </Text>
                        <View style={styles.filterRequiredDot} />
                      </View>
                      <View style={styles.filterChipsRow}>
                        {PROPERTY_TYPES.map(type => (
                          <Pressable
                            key={type}
                            style={[
                              styles.filterChip,
                              filterPropertyType === type &&
                                styles.filterChipActive,
                            ]}
                            onPress={() => setFilterPropertyType(type)}
                          >
                            <Text
                              style={[
                                styles.filterChipText,
                                filterPropertyType === type &&
                                  styles.filterChipTextActive,
                              ]}
                            >
                              {type}
                            </Text>
                          </Pressable>
                        ))}
                      </View>
                    </View>
                    <View style={styles.filterSection}>
                      <Text style={styles.filterSectionTitle}>Location</Text>
                      <View style={styles.filterLocationInput}>
                        <MapPin
                          size={20}
                          color="#252b5c"
                          style={styles.filterLocationIcon}
                        />
                        <TextInput
                          style={styles.filterLocationTextInput}
                          placeholder="Search location"
                          placeholderTextColor="#a1a5c1"
                          value={filterLocation}
                          onChangeText={setFilterLocation}
                        />
                        <Search size={20} color="#53587a" />
                      </View>
                      <View style={styles.filterMapPlaceholder}>
                        <Image
                          source={require('../assets/estate-img-1.png')}
                          style={styles.filterMapImage}
                          resizeMode="cover"
                        />
                        <View style={styles.filterMapOverlay}>
                          <MapPin size={32} color="#53587a" />
                          <Text style={styles.filterMapPlaceholderText}>
                            Map placeholder
                          </Text>
                        </View>
                      </View>
                    </View>
                  <Pressable
                    style={styles.filterApplyBtn}
                    onPress={() => {
                      setAppliedPropertyType(filterPropertyType);
                      setAppliedLocation(filterLocation.trim());
                      setFilterVisible(false);
                    }}
                  >
                      <Text style={styles.filterApplyText}>Apply Filter</Text>
                    </Pressable>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Modal>

        {/* Property grid or list */}
            {viewMode === 'list' ? (
          <View style={styles.propertyList}>
            {filteredProperties.map(prop => (
              <Pressable
                key={prop.id}
                style={styles.listCard}
                onPress={() => onNavigateToPropertyDetail?.(prop.id)}
              >
                <View style={styles.listCardImageWrap}>
                  <Image
                    source={prop.imageSource}
                    style={styles.listCardImage}
                    resizeMode="cover"
                  />
                  <Pressable
                    style={styles.listFavoriteBtn}
                    hitSlop={8}
                    onPress={() => onToggleFavorite(prop.id)}
                  >
                    <View
                      style={[
                        styles.listHeartCircle,
                        favoriteIds.includes(prop.id) &&
                          styles.listHeartCircleActive,
                      ]}
                    >
                      <Heart
                        size={14}
                        color={
                          favoriteIds.includes(prop.id) ? '#fff' : '#53587a'
                        }
                        fill={favoriteIds.includes(prop.id) ? '#fff' : 'none'}
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
                  isFavorite={favoriteIds.includes(prop.id)}
                  onFavoritePress={() => onToggleFavorite(prop.id)}
                  onPress={() => onNavigateToPropertyDetail?.(prop.id)}
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
          <Pressable style={styles.tab} onPress={onNavigateToWishlist}>
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
  // Filter overlay
  filterModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  filterBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  filterSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 22,
    paddingTop: 12,
  },
  filterHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e0e0e0',
    alignSelf: 'center',
    marginBottom: 20,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  filterTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#252b5c',
  },
  filterResetBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#252b5c',
  },
  filterResetText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  filterBody: {
    paddingBottom: 16,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#252b5c',
  },
  filterRequiredDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e53935',
    marginLeft: 4,
  },
  filterChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterChip: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#f5f4f8',
  },
  filterChipActive: {
    backgroundColor: '#252b5c',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#53587a',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  filterLocationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#f5f4f8',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 10,
  },
  filterLocationIcon: {
    width: 20,
    height: 20,
  },
  filterLocationTextInput: {
    flex: 1,
    fontSize: 14,
    color: '#252b5c',
    paddingVertical: 0,
  },
  filterMapPlaceholder: {
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e8e8e8',
    position: 'relative',
  },
  filterMapImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  filterMapOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(232,232,232,0.6)',
  },
  filterMapPlaceholderText: {
    marginTop: 8,
    fontSize: 13,
    color: '#53587a',
    fontWeight: '500',
  },
  filterApplyBtn: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#8bc83f',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  filterApplyText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
