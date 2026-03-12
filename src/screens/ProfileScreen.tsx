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
  Mail,
  Phone,
  Search,
  User,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Dummy real estate user profile
const DUMMY_PROFILE = {
  name: 'Jonathan Smith',
  role: 'Property Buyer',
  email: 'jonathan.smith@email.com',
  phone: '+62 812 3456 7890',
  memberSince: 'Jan 2024',
};

export function ProfileScreen({
  favoriteIds,
  onBack,
  onNavigateToHome,
  onNavigateToSearch,
  onNavigateToWishlist,
}: {
  favoriteIds: string[];
  onBack: () => void;
  onNavigateToHome: () => void;
  onNavigateToSearch: () => void;
  onNavigateToWishlist: () => void;
}) {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets?.bottom ?? 0;
  const savedCount = favoriteIds.length;

  return (
    <View style={[styles.container, { paddingBottom }]}>
      <View style={[styles.header, { paddingTop: (insets?.top ?? 0) + 8 }]}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <ChevronLeft size={22} color="#252b5c" />
        </Pressable>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: paddingBottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <Image
            source={require('../assets/user-profile.jpg')}
            style={styles.avatar}
            resizeMode="cover"
          />
          <Text style={styles.name}>{DUMMY_PROFILE.name}</Text>
          <Text style={styles.role}>{DUMMY_PROFILE.role}</Text>
          <Text style={styles.memberSince}>Member since {DUMMY_PROFILE.memberSince}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <View style={styles.contactRow}>
            <Mail size={20} color="#53587a" style={styles.contactIcon} />
            <Text style={styles.contactText}>{DUMMY_PROFILE.email}</Text>
          </View>
          <View style={styles.contactRow}>
            <Phone size={20} color="#53587a" style={styles.contactIcon} />
            <Text style={styles.contactText}>{DUMMY_PROFILE.phone}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity</Text>
          <View style={styles.statsCard}>
            <View style={styles.statRow}>
              <Heart size={22} color="#8bc83f" />
              <Text style={styles.statLabel}>Saved listings</Text>
              <Text style={styles.statValue}>{savedCount}</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </Pressable>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom }]}>
        <View style={styles.bottomBarInner}>
          <Pressable style={styles.tab} onPress={onNavigateToHome}>
            <LayoutGrid size={24} color="#252b5c" style={styles.icon24} />
          </Pressable>
          <Pressable style={styles.tab} onPress={onNavigateToSearch}>
            <Search size={24} color="#252b5c" style={styles.icon24} />
          </Pressable>
          <Pressable style={styles.tab} onPress={onNavigateToWishlist}>
            <Heart size={24} color="#252b5c" style={styles.icon24} />
          </Pressable>
          <Pressable style={styles.tab}>
            <User size={24} color="#8bc83f" style={styles.icon24} />
            <View style={styles.tabDot} />
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
  headerPlaceholder: { width: 44 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 22, paddingTop: 20 },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 28,
    marginBottom: 24,
    backgroundColor: '#f5f4f8',
    borderRadius: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },
  name: { fontSize: 22, fontWeight: '700', color: '#252b5c', marginBottom: 4 },
  role: { fontSize: 14, color: '#53587a', marginBottom: 6 },
  memberSince: { fontSize: 12, color: '#a1a5c1' },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#252b5c',
    marginBottom: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f5f4f8',
    borderRadius: 12,
    marginBottom: 8,
  },
  contactIcon: { width: 20, height: 20, marginRight: 12 },
  contactText: { fontSize: 14, color: '#252b5c', flex: 1 },
  statsCard: {
    backgroundColor: '#f5f4f8',
    borderRadius: 16,
    padding: 18,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statLabel: { fontSize: 15, color: '#252b5c', flex: 1 },
  statValue: { fontSize: 16, fontWeight: '700', color: '#8bc83f' },
  editButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#252b5c',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  editButtonText: { fontSize: 16, fontWeight: '700', color: '#fff' },
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
