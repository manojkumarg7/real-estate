import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Bath,
  BedDouble,
  ChevronLeft,
  ChevronDown,
  Heart,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Star,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PROPERTIES } from './HomeScreen';
import { PropertyCard } from '../components/PropertyCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock detail data (can be replaced with API)
function getDetailExtras(propertyId: string) {
  return {
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1030,
    address: "16-18, Jacob's Creek Way, Melbourne",
    distanceFromCenter: '2.5km from your center',
    agentName: 'Anderson',
    agentTitle: 'Real Coder',
    costOfLivingPerMonth: 830,
    costOfLivingNote: 'From utility bill over food to loan.',
    reviewCount: '100+',
    reviews: [
      { name: 'Kat Miles', rating: 5, text: 'Great place to live. Highly recommend!' },
      { name: 'Ray Swanson', rating: 5, text: 'Loved the neighborhood and the view.' },
    ],
  };
}

export function PropertyDetailScreen({
  propertyId,
  favoriteIds,
  onToggleFavorite,
  onBack,
  onNavigateToPropertyDetail,
}: {
  propertyId: string;
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onNavigateToPropertyDetail?: (id: string) => void;
}) {
  const insets = useSafeAreaInsets();
  const property = PROPERTIES.find(p => p.id === propertyId);
  const paddingTop = insets?.top ?? 0;
  const paddingBottom = insets?.bottom ?? 0;

  if (!property) {
    return (
      <View style={styles.container}>
        <Pressable onPress={onBack} style={styles.backButtonFloating}>
          <ChevronLeft size={24} color="#252b5c" />
        </Pressable>
        <Text style={styles.errorText}>Property not found</Text>
      </View>
    );
  }

  const extras = getDetailExtras(property.id);
  const isFavorite = favoriteIds.includes(property.id);
  const nearbyProperties = PROPERTIES.filter(p => p.id !== property.id).slice(0, 5);
  const cardWidth = (SCREEN_WIDTH - 44 - 10) / 2;

  return (
    <View style={[styles.container, { paddingBottom }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: paddingBottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero image */}
        <View style={styles.heroImageWrap}>
          <Image
            source={property.imageSource}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={[styles.heroOverlay, { paddingTop: paddingTop + 12 }]}>
            <Pressable style={styles.backButton} onPress={onBack}>
              <ChevronLeft size={24} color="#252b5c" />
            </Pressable>
            <Pressable
              style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
              onPress={() => onToggleFavorite(property.id)}
            >
              <Heart
                size={20}
                color={isFavorite ? '#fff' : '#252b5c'}
                fill={isFavorite ? '#fff' : 'none'}
              />
            </Pressable>
          </View>
          <View style={styles.heroBadges}>
            <View style={styles.heroBadge}>
              <Star size={12} color="#FFD700" fill="#FFD700" />
              <Text style={styles.heroBadgeText}>{property.rating}</Text>
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>{property.category}</Text>
            </View>
          </View>
          <View style={styles.galleryThumbs}>
            <View style={styles.galleryThumb} />
            <View style={styles.galleryThumb} />
            <View style={[styles.galleryThumb, styles.galleryThumbMore]}>
              <Text style={styles.galleryThumbMoreText}>+3</Text>
            </View>
          </View>
        </View>

        {/* Title, price, location, actions */}
        <View style={styles.section}>
          <View style={styles.titleRow}>
            <Text style={styles.propertyTitle}>{property.title}</Text>
            <View style={styles.priceBlock}>
              <Text style={styles.priceAmount}>${property.pricePerMonth}</Text>
              <Text style={styles.priceUnit}>per month</Text>
            </View>
          </View>
          <Text style={styles.locationShort}>• {property.location}</Text>
          <View style={styles.actionRow}>
            <Pressable style={styles.rentButton}>
              <Text style={styles.rentButtonText}>Rent</Text>
            </Pressable>
            <Pressable style={styles.outlineButton}>
              <Text style={styles.outlineButtonText}>Buy</Text>
            </Pressable>
            <Pressable style={styles.sqftButton}>
              <LayoutGrid size={16} color="#53587a" />
              <Text style={styles.sqftButtonText}>{extras.sqft} sqft</Text>
            </Pressable>
          </View>
        </View>

        {/* Agent */}
        <View style={styles.agentCard}>
          <Image
            source={require('../assets/user-profile.jpg')}
            style={styles.agentAvatar}
          />
          <View style={styles.agentInfo}>
            <Text style={styles.agentName}>{extras.agentName}</Text>
            <Text style={styles.agentTitle}>{extras.agentTitle}</Text>
          </View>
          <Pressable style={styles.agentContact}>
            <MessageCircle size={24} color="#252b5c" />
          </Pressable>
        </View>
        <View style={styles.featureBadges}>
          <View style={styles.featureBadge}>
            <BedDouble size={16} color="#53587a" />
            <Text style={styles.featureBadgeText}>{extras.bedrooms} Bedrooms</Text>
          </View>
          <View style={styles.featureBadge}>
            <Bath size={16} color="#53587a" />
            <Text style={styles.featureBadgeText}>{extras.bathrooms} Bathrooms</Text>
          </View>
          <View style={styles.featureBadge}>
            <LayoutGrid size={16} color="#53587a" />
            <Text style={styles.featureBadgeText}>{extras.sqft} sqft</Text>
          </View>
        </View>

        {/* Location & Public Facilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location & Public Facilities</Text>
          <View style={styles.addressRow}>
            <MapPin size={18} color="#252b5c" style={styles.addressIcon} />
            <Text style={styles.addressText}>{extras.address}</Text>
          </View>
          <Pressable style={styles.distanceRow}>
            <MapPin size={18} color="#252b5c" style={styles.addressIcon} />
            <Text style={styles.distanceText}>{extras.distanceFromCenter}</Text>
            <ChevronDown size={18} color="#53587a" />
          </Pressable>
          <View style={styles.filterChips}>
            <Pressable style={styles.filterChip}><Text style={styles.filterChipText}>Near by</Text></Pressable>
            <Pressable style={styles.filterChip}><Text style={styles.filterChipText}>Public facilities</Text></Pressable>
            <Pressable style={styles.filterChip}><Text style={styles.filterChipText}>Schools</Text></Pressable>
          </View>
          <View style={styles.mapPlaceholder}>
            <Image
              source={property.imageSource}
              style={styles.mapImage}
              resizeMode="cover"
            />
            <View style={styles.mapOverlay}>
              <MapPin size={28} color="#252b5c" />
            </View>
          </View>
          <Text style={styles.viewAllMap}>View all map</Text>
        </View>

        {/* Cost of Living */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cost of Living</Text>
            <Text style={styles.viewAllLink}>View all</Text>
          </View>
          <View style={styles.costCard}>
            <Text style={styles.costAmount}>${extras.costOfLivingPerMonth} / month</Text>
            <Text style={styles.costNote}>{extras.costOfLivingNote}</Text>
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <View style={styles.reviewSummaryCard}>
            <View style={styles.reviewSummaryLeft}>
              <Star size={28} color="#FFD700" fill="#FFD700" />
              <Text style={styles.reviewScore}>{property.rating}</Text>
            </View>
            <View style={styles.reviewStars}>
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={14} color="#FFD700" fill="#FFD700" />
              ))}
            </View>
            <View style={styles.reviewAvatars}>
              <View style={styles.reviewAvatar} />
              <View style={[styles.reviewAvatar, styles.reviewAvatar2]} />
              <View style={[styles.reviewAvatar, styles.reviewAvatar3]} />
            </View>
            <Text style={styles.reviewCount}>Based on {extras.reviewCount} Reviews</Text>
          </View>
          {extras.reviews.map((r, i) => (
            <View key={i} style={styles.reviewCard}>
              <Image source={require('../assets/user-profile.jpg')} style={styles.reviewerAvatar} />
              <View style={styles.reviewBody}>
                <Text style={styles.reviewerName}>{r.name}</Text>
                <View style={styles.reviewStarsSmall}>
                  {[1, 2, 3, 4, 5].map(j => (
                    <Star key={j} size={10} color="#FFD700" fill="#FFD700" />
                  ))}
                </View>
                <Text style={styles.reviewText}>{r.text}</Text>
              </View>
            </View>
          ))}
          <Text style={styles.viewAllMap}>View all reviews</Text>
        </View>

        {/* Nearby */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby From this Location</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.nearbyScroll}
          >
            {nearbyProperties.map(p => (
              <Pressable
                key={p.id}
                style={[styles.nearbyCardWrap, { width: cardWidth }]}
                onPress={() => onNavigateToPropertyDetail?.(p.id)}
              >
                <PropertyCard
                  title={p.title}
                  pricePerMonth={p.pricePerMonth}
                  rating={p.rating}
                  location={p.location}
                  imageSource={p.imageSource}
                  isFavorite={favoriteIds.includes(p.id)}
                  onFavoritePress={() => onToggleFavorite(p.id)}
                  onPress={() => onNavigateToPropertyDetail?.(p.id)}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  backButtonFloating: { padding: 16 },
  errorText: { padding: 20, fontSize: 16, color: '#53587a' },
  heroImageWrap: {
    width: '100%',
    aspectRatio: 1.1,
    backgroundColor: '#e8e8e8',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButtonActive: { backgroundColor: '#8bc83f' },
  heroBadges: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    flexDirection: 'row',
    gap: 8,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(35,79,104,0.75)',
  },
  heroBadgeText: { fontSize: 12, fontWeight: '600', color: '#fff' },
  galleryThumbs: {
    position: 'absolute',
    bottom: 16,
    right: 20,
    flexDirection: 'column',
    gap: 6,
  },
  galleryThumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  galleryThumbMore: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(35,79,104,0.6)',
  },
  galleryThumbMoreText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  section: { paddingHorizontal: 22, paddingTop: 24 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  propertyTitle: { fontSize: 22, fontWeight: '700', color: '#252b5c', flex: 1 },
  priceBlock: { alignItems: 'flex-end' },
  priceAmount: { fontSize: 20, fontWeight: '700', color: '#252b5c' },
  priceUnit: { fontSize: 12, color: '#53587a', marginTop: 2 },
  locationShort: { fontSize: 14, color: '#53587a', marginBottom: 16 },
  actionRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  rentButton: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#8bc83f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rentButtonText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  outlineButton: {
    paddingHorizontal: 20,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButtonText: { fontSize: 14, fontWeight: '600', color: '#252b5c' },
  sqftButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sqftButtonText: { fontSize: 12, fontWeight: '600', color: '#53587a' },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f4f8',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    marginHorizontal: 22,
  },
  agentAvatar: { width: 48, height: 48, borderRadius: 24 },
  agentInfo: { flex: 1, marginLeft: 14 },
  agentName: { fontSize: 16, fontWeight: '700', color: '#252b5c' },
  agentTitle: { fontSize: 13, color: '#53587a', marginTop: 2 },
  agentContact: { padding: 8 },
  featureBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
    paddingHorizontal: 22,
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#f5f4f8',
  },
  featureBadgeText: { fontSize: 13, fontWeight: '600', color: '#53587a' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#252b5c', marginBottom: 14 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  viewAllLink: { fontSize: 14, fontWeight: '600', color: '#8bc83f' },
  addressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  addressIcon: { width: 18, height: 18, marginRight: 10 },
  addressText: { flex: 1, fontSize: 14, color: '#252b5c' },
  distanceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  distanceText: { flex: 1, fontSize: 14, color: '#53587a' },
  filterChips: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#f5f4f8',
  },
  filterChipText: { fontSize: 13, fontWeight: '600', color: '#53587a' },
  mapPlaceholder: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#e8e8e8',
    position: 'relative',
  },
  mapImage: { width: '100%', height: '100%', opacity: 0.6 },
  mapOverlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  viewAllMap: { fontSize: 14, fontWeight: '600', color: '#8bc83f', marginTop: 10 },
  costCard: {
    backgroundColor: '#f5f4f8',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costAmount: { fontSize: 16, fontWeight: '700', color: '#252b5c' },
  costNote: { fontSize: 12, color: '#53587a', flex: 1, marginLeft: 12 },
  reviewSummaryCard: {
    backgroundColor: '#e8eef2',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
  },
  reviewSummaryLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  reviewScore: { fontSize: 24, fontWeight: '700', color: '#252b5c' },
  reviewStars: { flexDirection: 'row', gap: 4, marginTop: 8 },
  reviewAvatars: { flexDirection: 'row', marginTop: 8 },
  reviewAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#c0c0c0', marginRight: -8 },
  reviewAvatar2: { backgroundColor: '#a0a0a0' },
  reviewAvatar3: { backgroundColor: '#808080' },
  reviewCount: { fontSize: 12, color: '#53587a', marginTop: 8 },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#f5f4f8',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  reviewerAvatar: { width: 40, height: 40, borderRadius: 20 },
  reviewBody: { flex: 1, marginLeft: 12 },
  reviewerName: { fontSize: 14, fontWeight: '700', color: '#252b5c' },
  reviewStarsSmall: { flexDirection: 'row', gap: 2, marginTop: 4 },
  reviewText: { fontSize: 13, color: '#53587a', marginTop: 6 },
  nearbyScroll: { paddingRight: 22, gap: 10 },
  nearbyCardWrap: { marginRight: 10 },
});
