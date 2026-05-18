import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '../theme';
import { TUTORS } from '../data';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, 'TutorProfile'>;
};

export default function TutorProfileScreen({ navigation, route }: Props) {
  const tutor = TUTORS.find((t) => t.id === route.params.tutorId);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  if (!tutor) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.notFound}>Tutor not found.</Text>
      </SafeAreaView>
    );
  }

  const handleBook = () => {
    if (!selectedSubject) {
      Alert.alert('Select a subject', 'Please choose a subject before booking.');
      return;
    }
    navigation.navigate('Booking', { tutorId: tutor.id, subject: selectedSubject });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.avatarWrapper}>
            <Text style={styles.avatar}>{tutor.avatar}</Text>
          </View>
          <Text style={styles.name}>{tutor.name}</Text>
          <Text style={styles.education}>{tutor.education}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.rating}>{tutor.rating.toFixed(2)}</Text>
            <Text style={styles.reviews}> ({tutor.reviewCount} reviews)</Text>
            <Text style={styles.experience}> · {tutor.experience}</Text>
          </View>
          <View style={styles.rateRow}>
            <Text style={styles.rate}>R{tutor.hourlyRate}</Text>
            <Text style={styles.perHour}>/hour</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* About */}
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bio}>{tutor.bio}</Text>

          {/* Languages */}
          <Text style={styles.sectionTitle}>Languages</Text>
          <View style={styles.chipRow}>
            {tutor.languages.map((lang) => (
              <View key={lang} style={styles.chip}>
                <Text style={styles.chipText}>{lang}</Text>
              </View>
            ))}
          </View>

          {/* Select a subject */}
          <Text style={styles.sectionTitle}>Select Subject</Text>
          <View style={styles.chipRow}>
            {tutor.subjects.map((subj) => (
              <TouchableOpacity
                key={subj}
                style={[styles.chip, selectedSubject === subj && styles.chipActive]}
                onPress={() => setSelectedSubject(subj)}
              >
                <Text
                  style={[styles.chipText, selectedSubject === subj && styles.chipTextActive]}
                >
                  {subj}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Available slots */}
          <Text style={styles.sectionTitle}>Available Slots</Text>
          <View style={styles.chipRow}>
            {tutor.availableSlots.map((slot) => (
              <View key={slot} style={[styles.chip, { backgroundColor: '#ECFDF5' }]}>
                <Text style={[styles.chipText, { color: Colors.secondary }]}>{slot}</Text>
              </View>
            ))}
          </View>

          {/* Book button */}
          <TouchableOpacity style={styles.bookBtn} onPress={handleBook} activeOpacity={0.85}>
            <Text style={styles.bookBtnText}>Book a Session</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  notFound: {
    textAlign: 'center',
    marginTop: Spacing.xxl,
    color: Colors.textSecondary,
    fontSize: FontSize.md,
  },
  hero: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    ...Shadow.md,
  },
  avatar: { fontSize: 40 },
  name: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.surface,
    marginBottom: 4,
  },
  education: {
    fontSize: FontSize.sm,
    color: Colors.primaryLight,
    marginBottom: Spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  star: { color: Colors.star, fontSize: FontSize.md },
  rating: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.surface,
    marginLeft: 3,
  },
  reviews: { fontSize: FontSize.sm, color: Colors.primaryLight },
  experience: { fontSize: FontSize.sm, color: Colors.primaryLight },
  rateRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: Spacing.xs },
  rate: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.surface,
  },
  perHour: {
    fontSize: FontSize.sm,
    color: Colors.primaryLight,
    marginLeft: 2,
  },
  body: {
    padding: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  bio: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.border,
    ...Shadow.sm,
  },
  chipActive: {
    backgroundColor: Colors.primary,
  },
  chipText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  chipTextActive: {
    color: Colors.surface,
  },
  bookBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadow.md,
  },
  bookBtnText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.surface,
  },
});
