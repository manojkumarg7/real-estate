import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ChevronLeft,
  Heart,
  LayoutGrid,
  MapPin,
  Search,
  User,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PROPERTIES } from './HomeScreen';

export function WishlistScreen({
  favoriteIds,
  onToggleFavorite,
  onBack,
  onNavigateToHome,
  onNavigateToSearch,
  onNavigateToPropertyDetail,
}: {
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onNavigateToHome: () => void;
  onNavigateToSearch: () => void;
  onNavigateToPropertyDetail?: (id: string) => void;
}) {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets?.bottom ?? 0;

  const wishlistProperties = PROPERTIES.filter(p => favoriteIds.includes(p.id));

  return (
    <View style={[styles.container, { paddingBottom }]}>
      <View style={[styles.header, { paddingTop: (insets?.top ?? 0) + 8 }]}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <ChevronLeft size={22} color="#252b5c" />
        </Pressable>
        <Text style={styles.headerTitle}>Wishlist</Text>
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
        {wishlistProperties.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyHeartCircle}>
              <Heart size={40} color="#a1a5c1" />
            </View>
            <Text style={styles.emptyTitle}>No saved properties</Text>
            <Text style={styles.emptySubtitle}>
              Tap the heart on any property to add it here.
            </Text>
          </View>
        ) : (
          <View style={styles.propertyList}>
            {wishlistProperties.map(prop => (
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
                        styles.listHeartCircleActive,
                      ]}
                    >
                      <Heart
                        size={14}
                        color="#fff"
                        fill="#fff"
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
        )}
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom }]}>
        <View style={styles.bottomBarInner}>
          <Pressable style={styles.tab} onPress={onNavigateToHome}>
            <LayoutGrid size={24} color="#252b5c" style={styles.icon24} />
          </Pressable>
          <Pressable style={styles.tab} onPress={onNavigateToSearch}>
            <Search size={24} color="#252b5c" style={styles.icon24} />
          </Pressable>
          <Pressable style={styles.tab}>
            <Heart size={24} color="#8bc83f" style={styles.icon24} />
            <View style={styles.tabDot} />
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
  container: { flex: 1, backgroundColor: '#fff' },
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
  headerTitle: { fontSize: 16, fontWeight: '600', color: '#252b5c' },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#f5f4f8',
  },
  profileImage: { width: '100%', height: '100%' },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 22 },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyHeartCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f5f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#252b5c',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#53587a',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  propertyList: { gap: 12 },
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
  listCardImage: { width: '100%', height: '100%' },
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
  listHeartCircleActive: { backgroundColor: '#8bc83f' },
  listCategoryTag: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(35,79,104,0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  listCategoryText: { fontSize: 10, fontWeight: '600', color: '#fff' },
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
  listMetaColumn: { flexDirection: 'column', gap: 4 },
  listRating: { fontSize: 11, fontWeight: '700', color: '#53587a' },
  listLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    minWidth: 0,
  },
  listLocation: { fontSize: 11, color: '#53587a', flex: 1 },
  listPrice: { fontSize: 14, fontWeight: '700', color: '#252b5c' },
  listPricePeriod: { fontSize: 11, fontWeight: '500', color: '#53587a' },
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
  tab: { alignItems: 'center', justifyContent: 'center' },
  tabDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#8bc83f',
    marginTop: 4,
  },
  icon24: { width: 24, height: 24 },
});
