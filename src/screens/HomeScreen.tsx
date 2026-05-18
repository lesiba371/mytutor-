import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '../theme';
import { SUBJECTS, TUTORS } from '../data';
import TutorCard from '../components/TutorCard';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function HomeScreen({ navigation }: Props) {
  const featuredTutors = TUTORS.slice(0, 3);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning 👋</Text>
            <Text style={styles.headline}>Find your perfect tutor</Text>
          </View>
          <TouchableOpacity
            style={styles.profileBtn}
            onPress={() => navigation.navigate('ProfileTab')}
          >
            <Text style={styles.profileBtnText}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Search bar (decorative — real search is on TutorsTab) */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('TutorsTab')}
          activeOpacity={0.8}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search tutors, subjects…</Text>
        </TouchableOpacity>

        {/* Subjects */}
        <Text style={styles.sectionTitle}>Subjects</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subjectRow}
        >
          {SUBJECTS.map((subject) => (
            <TouchableOpacity
              key={subject.id}
              style={[styles.subjectChip, { backgroundColor: subject.color }]}
              onPress={() => navigation.navigate('TutorsTab', { subjectFilter: subject.name })}
            >
              <Text style={styles.subjectIcon}>{subject.icon}</Text>
              <Text style={styles.subjectName}>{subject.name}</Text>
              <Text style={styles.subjectCount}>{subject.tutorCount} tutors</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Tutors */}
        <View style={styles.row}>
          <Text style={styles.sectionTitle}>Featured Tutors</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TutorsTab')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        {featuredTutors.map((tutor) => (
          <TutorCard
            key={tutor.id}
            tutor={tutor}
            onPress={(t) => navigation.navigate('TutorProfile', { tutorId: t.id })}
          />
        ))}

        {/* Quick stats banner */}
        <View style={styles.banner}>
          <View style={styles.bannerStat}>
            <Text style={styles.bannerNumber}>200+</Text>
            <Text style={styles.bannerLabel}>Verified Tutors</Text>
          </View>
          <View style={styles.bannerDivider} />
          <View style={styles.bannerStat}>
            <Text style={styles.bannerNumber}>15k+</Text>
            <Text style={styles.bannerLabel}>Sessions Done</Text>
          </View>
          <View style={styles.bannerDivider} />
          <View style={styles.bannerStat}>
            <Text style={styles.bannerNumber}>4.9★</Text>
            <Text style={styles.bannerLabel}>Avg. Rating</Text>
          </View>
        </View>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1, paddingHorizontal: Spacing.md },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  greeting: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  headline: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  profileBtn: {
    width: 42,
    height: 42,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBtnText: { fontSize: 20 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    marginBottom: Spacing.lg,
    ...Shadow.sm,
  },
  searchIcon: { fontSize: 16, marginRight: Spacing.sm },
  searchPlaceholder: { fontSize: FontSize.md, color: Colors.textMuted },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subjectRow: {
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  subjectChip: {
    borderRadius: Radius.md,
    padding: Spacing.md,
    width: 110,
    alignItems: 'center',
    ...Shadow.sm,
  },
  subjectIcon: { fontSize: 26, marginBottom: 4 },
  subjectName: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
    textAlign: 'center',
  },
  subjectCount: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  seeAll: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.semibold,
  },
  banner: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginTop: Spacing.md,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bannerStat: { alignItems: 'center', flex: 1 },
  bannerNumber: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.surface,
  },
  bannerLabel: {
    fontSize: FontSize.xs,
    color: Colors.primaryLight,
    marginTop: 2,
  },
  bannerDivider: {
    width: 1,
    height: 36,
    backgroundColor: Colors.primaryLight,
    opacity: 0.5,
  },
});
