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
  ChevronDown,
  Heart,
  LayoutGrid,
  MapPin,
  Mic,
  Search,
  User,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PropertyCard } from '../components/PropertyCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PADDING = 44;
const CARD_GAP = 10;
const CARD_WIDTH = (SCREEN_WIDTH - H_PADDING - CARD_GAP) / 2;

const CATEGORIES = ['All', 'House', 'Apartment', 'Villa'];

const PROPERTIES = [
  {
    id: '1',
    title: 'Wings Tower',
    pricePerMonth: 220,
    rating: 4.9,
    location: 'Jakarta, Indonesia',
    imageSource: require('../assets/estate-img-1.png'),
    isFavorite: true,
    category: 'Apartment',
  },
  {
    id: '2',
    title: 'Bungalow House',
    pricePerMonth: 235,
    rating: 4.7,
    location: 'Jakarta, Indonesia',
    imageSource: require('../assets/estate-img-2.png'),
    isFavorite: false,
    category: 'House',
  },
  {
    id: '3',
    title: 'Mill Sper House',
    pricePerMonth: 271,
    rating: 4.8,
    location: 'Jakarta, Indonesia',
    imageSource: require('../assets/estate-img-3.png'),
    isFavorite: false,
    category: 'House',
  },
  {
    id: '4',
    title: 'Sky Dandelions Apartment',
    pricePerMonth: 290,
    rating: 4.9,
    location: 'Jakarta, Indonesia',
    imageSource: require('../assets/estate-img-4.png'),
    isFavorite: false,
    category: 'Apartment',
  },
  {
    id: '5',
    title: 'Palm Villa Resort',
    pricePerMonth: 320,
    rating: 4.8,
    location: 'Bali, Indonesia',
    imageSource: require('../assets/estate-img-1.png'),
    isFavorite: false,
    category: 'Villa',
  },
  {
    id: '6',
    title: 'Garden View Apartment',
    pricePerMonth: 195,
    rating: 4.6,
    location: 'Surabaya, Indonesia',
    imageSource: require('../assets/estate-img-2.png'),
    isFavorite: true,
    category: 'Apartment',
  },
  {
    id: '7',
    title: 'Modern Family House',
    pricePerMonth: 380,
    rating: 4.9,
    location: 'Bandung, Indonesia',
    imageSource: require('../assets/estate-img-3.png'),
    isFavorite: false,
    category: 'House',
  },
  {
    id: '8',
    title: 'Luxury Beach Villa',
    pricePerMonth: 450,
    rating: 5.0,
    location: 'Bali, Indonesia',
    imageSource: require('../assets/estate-img-4.png'),
    isFavorite: true,
    category: 'Villa',
  },
  {
    id: '9',
    title: 'City Loft Apartment',
    pricePerMonth: 265,
    rating: 4.7,
    location: 'Jakarta, Indonesia',
    imageSource: require('../assets/estate-img-1.png'),
    isFavorite: false,
    category: 'Apartment',
  },
  {
    id: '10',
    title: 'Cozy Cottage House',
    pricePerMonth: 198,
    rating: 4.5,
    location: 'Yogyakarta, Indonesia',
    imageSource: require('../assets/estate-img-2.png'),
    isFavorite: false,
    category: 'House',
  },
  {
    id: '11',
    title: 'Hillside Villa',
    pricePerMonth: 520,
    rating: 4.9,
    location: 'Ubud, Bali',
    imageSource: require('../assets/estate-img-3.png'),
    isFavorite: true,
    category: 'Villa',
  },
  {
    id: '12',
    title: 'Riverside Apartment',
    pricePerMonth: 240,
    rating: 4.6,
    location: 'Jakarta, Indonesia',
    imageSource: require('../assets/estate-img-4.png'),
    isFavorite: false,
    category: 'Apartment',
  },
  {
    id: '13',
    title: 'Sunset House',
    pricePerMonth: 310,
    rating: 4.8,
    location: 'Seminyak, Bali',
    imageSource: require('../assets/estate-img-1.png'),
    isFavorite: false,
    category: 'House',
  },
  {
    id: '14',
    title: 'Studio Apartment Central',
    pricePerMonth: 175,
    rating: 4.4,
    location: 'Jakarta, Indonesia',
    imageSource: require('../assets/estate-img-2.png'),
    isFavorite: false,
    category: 'Apartment',
  },
  {
    id: '15',
    title: 'Private Pool Villa',
    pricePerMonth: 580,
    rating: 5.0,
    location: 'Canggu, Bali',
    imageSource: require('../assets/estate-img-3.png'),
    isFavorite: true,
    category: 'Villa',
  },
  {
    id: '16',
    title: 'Heritage House',
    pricePerMonth: 275,
    rating: 4.7,
    location: 'Bandung, Indonesia',
    imageSource: require('../assets/estate-img-4.png'),
    isFavorite: false,
    category: 'House',
  },
  {
    id: '17',
    title: 'High-Rise Apartment',
    pricePerMonth: 330,
    rating: 4.9,
    location: 'Jakarta, Indonesia',
    imageSource: require('../assets/estate-img-1.png'),
    isFavorite: false,
    category: 'Apartment',
  },
  {
    id: '18',
    title: 'Tropical Villa',
    pricePerMonth: 410,
    rating: 4.8,
    location: 'Lombok, Indonesia',
    imageSource: require('../assets/estate-img-2.png'),
    isFavorite: true,
    category: 'Villa',
  },
  {
    id: '19',
    title: 'Suburban House',
    pricePerMonth: 225,
    rating: 4.5,
    location: 'Tangerang, Indonesia',
    imageSource: require('../assets/estate-img-3.png'),
    isFavorite: false,
    category: 'House',
  },
  {
    id: '20',
    title: 'Minimalist Apartment',
    pricePerMonth: 205,
    rating: 4.6,
    location: 'Jakarta, Indonesia',
    imageSource: require('../assets/estate-img-4.png'),
    isFavorite: false,
    category: 'Apartment',
  },
  {
    id: '21',
    title: 'Cliff Edge Villa',
    pricePerMonth: 620,
    rating: 5.0,
    location: 'Uluwatu, Bali',
    imageSource: require('../assets/estate-img-1.png'),
    isFavorite: true,
    category: 'Villa',
  },
  {
    id: '22',
    title: 'Duplex House',
    pricePerMonth: 355,
    rating: 4.8,
    location: 'Jakarta, Indonesia',
    imageSource: require('../assets/estate-img-2.png'),
    isFavorite: false,
    category: 'House',
  },
  {
    id: '23',
    title: 'Waterfront Apartment',
    pricePerMonth: 298,
    rating: 4.7,
    location: 'Batam, Indonesia',
    imageSource: require('../assets/estate-img-3.png'),
    isFavorite: false,
    category: 'Apartment',
  },
  {
    id: '24',
    title: 'Rice Field Villa',
    pricePerMonth: 390,
    rating: 4.9,
    location: 'Ubud, Bali',
    imageSource: require('../assets/estate-img-4.png'),
    isFavorite: true,
    category: 'Villa',
  },
  {
    id: '25',
    title: 'Classic Colonial House',
    pricePerMonth: 295,
    rating: 4.7,
    location: 'Bandung, Indonesia',
    imageSource: require('../assets/estate-img-1.png'),
    isFavorite: false,
    category: 'House',
  },
  {
    id: '26',
    title: 'Bridgeland Modern House',
    pricePerMonth: 260,
    rating: 4.9,
    location: 'Semarang, Indonesia',
    imageSource: require('../assets/estate-img-2.png'),
    isFavorite: false,
    category: 'House',
  },
  {
    id: '27',
    title: 'Flower Heaven Appartment',
    pricePerMonth: 370,
    rating: 4.8,
    location: 'Semarang, Indonesia',
    imageSource: require('../assets/estate-img-4.png'),
    isFavorite: false,
    category: 'Apartment',
  },
];

export { PROPERTIES };

export function HomeScreen({
  favoriteIds,
  onToggleFavorite,
  onNavigateToSearch,
  onNavigateToWishlist,
  onNavigateToPropertyDetail,
  onNavigateToProfile,
}: {
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onNavigateToSearch?: () => void;
  onNavigateToWishlist?: () => void;
  onNavigateToPropertyDetail?: (id: string) => void;
  onNavigateToProfile?: () => void;
}) {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const paddingTop = insets?.top ?? 0;
  const paddingBottom = insets?.bottom ?? 0;

  const selectedCategoryLabel = CATEGORIES[selectedCategory];
  const categoryFiltered =
    selectedCategoryLabel === 'All'
      ? PROPERTIES
      : PROPERTIES.filter(p => p.category === selectedCategoryLabel);

  const searchLower = searchQuery.trim().toLowerCase();
  const filteredProperties = searchLower
    ? categoryFiltered.filter(
        p =>
          p.title.toLowerCase().includes(searchLower) ||
          p.location.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower),
      )
    : categoryFiltered;

  return (
    <View style={[styles.container, { paddingBottom }]}>
      {/* Fixed top navbar: location dropdown + profile image */}
      <View style={[styles.fixedHeader, { paddingTop: paddingTop + 8 }]}>
        <Pressable style={styles.locationButton}>
          <MapPin size={15} color="#252b5c" style={styles.icon15} />
          <Text style={styles.locationText}>Jakarta, Indonesia</Text>
          <ChevronDown size={10} color="#252b5c" style={styles.icon10} />
        </Pressable>
        <View style={styles.profileAvatar}>
          <Image
            source={require('../assets/user-profile.jpg')}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Scrollable content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>
          Hey, <Text style={styles.greetingName}>Jonathan!</Text>
        </Text>

        <View style={styles.searchBar}>
          <Search size={20} color="#a1a5c1" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search House, Apartment, etc"
            placeholderTextColor="#a1a5c1"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Mic size={20} color="#252b5c" style={styles.micIcon} />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
          style={styles.categoriesScroll}
        >
          {CATEGORIES.map((cat, index) => (
            <Pressable
              key={`${cat}-${index}`}
              style={[
                styles.categoryChip,
                selectedCategory === index && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(index)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === index && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

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
                discountLabel={
                  'discountLabel' in prop
                    ? (prop as { discountLabel?: string }).discountLabel
                    : undefined
                }
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixed bottom navbar */}
      <View style={[styles.bottomBar, { paddingBottom }]}>
        <View style={styles.bottomBarInner}>
          <Pressable style={styles.tab}>
            <LayoutGrid size={24} color="#8bc83f" style={styles.icon24} />
            <View style={styles.tabDot} />
          </Pressable>
          <Pressable style={styles.tab} onPress={onNavigateToSearch}>
            <Search size={24} color="#252b5c" style={styles.icon24} />
          </Pressable>
          <Pressable style={styles.tab} onPress={onNavigateToWishlist}>
            <Heart size={24} color="#252b5c" style={styles.icon24} />
          </Pressable>
          <Pressable style={styles.tab} onPress={onNavigateToProfile}>
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
  fixedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 17.5,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ecedf3',
    backgroundColor: '#fff',
  },
  locationText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#252b5c',
    letterSpacing: 0.3,
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
    paddingBottom: 100,
  },
  greeting: {
    fontSize: 25,
    fontWeight: '500',
    color: '#252b5c',
    letterSpacing: 0.75,
    marginBottom: 8,
  },
  greetingName: {
    fontWeight: '800',
    color: '#234f68',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#f5f4f8',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#252b5c',
    paddingVertical: 0,
  },
  micIcon: { width: 20, height: 20 },
  icon10: { width: 10, height: 10 },
  icon15: { width: 15, height: 15 },
  icon24: { width: 24, height: 24 },
  categoriesScroll: {
    marginHorizontal: -22,
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 22,
    marginBottom: 12,
  },
  categoryChip: {
    paddingVertical: 17.5,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: '#f5f4f8',
  },
  categoryChipActive: {
    backgroundColor: '#234f68',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#252b5c',
    letterSpacing: 0.3,
  },
  categoryTextActive: {
    fontWeight: '700',
    color: '#f5f4f8',
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
});
