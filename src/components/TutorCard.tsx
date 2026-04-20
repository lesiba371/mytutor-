import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '../theme';
import { Tutor } from '../data';

interface TutorCardProps {
  tutor: Tutor;
  onPress: (tutor: Tutor) => void;
}

export default function TutorCard({ tutor, onPress }: TutorCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(tutor)} activeOpacity={0.85}>
      <View style={styles.avatarWrapper}>
        <Text style={styles.avatar}>{tutor.avatar}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{tutor.name}</Text>
        <Text style={styles.subjects} numberOfLines={1}>{tutor.subjects.join(' · ')}</Text>
        <View style={styles.meta}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.rating}>{tutor.rating.toFixed(1)}</Text>
          <Text style={styles.reviews}>({tutor.reviewCount})</Text>
          <Text style={styles.rate}> · R{tutor.hourlyRate}/hr</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  avatarWrapper: {
    width: 54,
    height: 54,
    borderRadius: Radius.full,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  avatar: {
    fontSize: 30,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
    marginBottom: 2,
  },
  subjects: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: Colors.star,
    fontSize: FontSize.sm,
  },
  rating: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
    marginLeft: 2,
  },
  reviews: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginLeft: 2,
  },
  rate: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
});
