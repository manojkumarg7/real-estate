import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Heart, MapPin } from 'lucide-react-native';

export type PropertyCardProps = {
  title: string;
  pricePerMonth: number;
  rating: number;
  location: string;
  imageSource: ImageSourcePropType;
  isFavorite?: boolean;
  discountLabel?: string;
  onPress?: () => void;
  onFavoritePress?: () => void;
};

export function PropertyCard({
  title,
  pricePerMonth,
  rating,
  location,
  imageSource,
  isFavorite = false,
  discountLabel,
  onPress,
  onFavoritePress,
}: PropertyCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
        {discountLabel ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText} numberOfLines={1}>
              {discountLabel}
            </Text>
          </View>
        ) : null}
        <Pressable
          style={styles.favoriteButton}
          onPress={onFavoritePress}
          hitSlop={8}
        >
          <View style={[styles.heartCircle, isFavorite && styles.heartCircleActive]}>
            <Heart
              size={14}
              color={isFavorite ? '#fff' : '#53587a'}
              fill={isFavorite ? '#fff' : 'none'}
              style={styles.heartIcon}
            />
          </View>
        </Pressable>
        <View style={styles.priceOverlay}>
          <Text style={styles.priceAmount}>$ {pricePerMonth}</Text>
          <Text style={styles.pricePeriod}>/month</Text>
        </View>
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.metaRow}>
        <Text style={styles.rating}>★ {rating}</Text>
        <View style={styles.locationRow}>
          <MapPin size={9} color="#53587a" style={styles.mapPinIcon} />
          <Text style={styles.location} numberOfLines={1}>{location}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f4f8',
    borderRadius: 25,
    padding: 8,
    paddingTop: 8,
    paddingBottom: 16,
    width: '100%',
  },
  imageContainer: {
    height: 160,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
  },
  discountBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    fontSize: 10,
    color: '#fff',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartCircle: {},
  heartCircleActive: {
    backgroundColor: '#8bc83f',
  },
  heartIcon: { width: 14, height: 14 },
  mapPinIcon: { width: 9, height: 9 },
  priceOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 12,
    backgroundColor: 'rgba(35,79,104,0.69)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  priceAmount: {
    color: '#f5f4f8',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.36,
  },
  pricePeriod: {
    color: '#f5f4f8',
    fontSize: 6,
    fontWeight: '500',
    marginLeft: 2,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: '#252b5c',
    letterSpacing: 0.36,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rating: {
    fontSize: 8,
    fontWeight: '700',
    color: '#53587a',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    flex: 1,
    minWidth: 0,
  },
  location: {
    fontSize: 8,
    color: '#53587a',
    flex: 1,
  },
});
