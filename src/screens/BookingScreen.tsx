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
  route: RouteProp<RootStackParamList, 'Booking'>;
};

const DURATIONS = [30, 60, 90, 120];

// Generate next 7 days
function getUpcomingDays(): Array<{ label: string; value: string }> {
  const days: Array<{ label: string; value: string }> = [];
  const now = new Date();
  for (let i = 1; i <= 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const label = d.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' });
    const value = d.toISOString().split('T')[0];
    days.push({ label, value });
  }
  return days;
}

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00',
];

export default function BookingScreen({ navigation, route }: Props) {
  const tutor = TUTORS.find((t) => t.id === route.params.tutorId)!;
  const { subject } = route.params;

  const days = getUpcomingDays();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number>(60);

  const canConfirm = selectedDay && selectedTime;

  const handleConfirm = () => {
    if (!canConfirm) return;
    Alert.alert(
      'Session Booked! 🎉',
      `Your ${subject} session with ${tutor.name} is confirmed for ${selectedDay} at ${selectedTime} (${selectedDuration} min).\n\nR${Math.round((tutor.hourlyRate * selectedDuration) / 60)} will be charged.`,
      [{ text: 'Great!', onPress: () => navigation.navigate('SessionsTab') }],
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tutor summary */}
        <View style={styles.tutorCard}>
          <Text style={styles.tutorAvatar}>{tutor.avatar}</Text>
          <View>
            <Text style={styles.tutorName}>{tutor.name}</Text>
            <Text style={styles.subjectTag}>{subject}</Text>
          </View>
          <View style={styles.rateTag}>
            <Text style={styles.rateText}>R{tutor.hourlyRate}/hr</Text>
          </View>
        </View>

        <View style={styles.section}>
          {/* Date */}
          <Text style={styles.sectionTitle}>Choose a Date</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dayRow}
          >
            {days.map((d) => (
              <TouchableOpacity
                key={d.value}
                style={[styles.dayChip, selectedDay === d.value && styles.dayChipActive]}
                onPress={() => setSelectedDay(d.value)}
              >
                <Text
                  style={[styles.dayText, selectedDay === d.value && styles.dayTextActive]}
                >
                  {d.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Time */}
          <Text style={styles.sectionTitle}>Choose a Time</Text>
          <View style={styles.timeGrid}>
            {TIME_SLOTS.map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.timeChip, selectedTime === t && styles.timeChipActive]}
                onPress={() => setSelectedTime(t)}
              >
                <Text
                  style={[styles.timeText, selectedTime === t && styles.timeTextActive]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Duration */}
          <Text style={styles.sectionTitle}>Duration</Text>
          <View style={styles.durationRow}>
            {DURATIONS.map((dur) => (
              <TouchableOpacity
                key={dur}
                style={[
                  styles.durationChip,
                  selectedDuration === dur && styles.durationChipActive,
                ]}
                onPress={() => setSelectedDuration(dur)}
              >
                <Text
                  style={[
                    styles.durationText,
                    selectedDuration === dur && styles.durationTextActive,
                  ]}
                >
                  {dur} min
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Price summary */}
          {canConfirm && (
            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>Session Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Date & Time</Text>
                <Text style={styles.summaryValue}>{selectedDay} · {selectedTime}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Duration</Text>
                <Text style={styles.summaryValue}>{selectedDuration} minutes</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subject</Text>
                <Text style={styles.summaryValue}>{subject}</Text>
              </View>
              <View style={[styles.summaryRow, styles.summaryTotal]}>
                <Text style={styles.summaryTotalLabel}>Total</Text>
                <Text style={styles.summaryTotalValue}>
                  R{Math.round((tutor.hourlyRate * selectedDuration) / 60)}
                </Text>
              </View>
            </View>
          )}

          {/* Confirm */}
          <TouchableOpacity
            style={[styles.confirmBtn, !canConfirm && styles.confirmBtnDisabled]}
            onPress={handleConfirm}
            disabled={!canConfirm}
            activeOpacity={0.85}
          >
            <Text style={styles.confirmBtnText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  tutorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  tutorAvatar: { fontSize: 36 },
  tutorName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.surface,
  },
  subjectTag: {
    fontSize: FontSize.sm,
    color: Colors.primaryLight,
  },
  rateTag: {
    marginLeft: 'auto',
    backgroundColor: Colors.primaryDark,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  rateText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.surface,
  },
  section: {
    padding: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  dayRow: {
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  dayChip: {
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.sm,
  },
  dayChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dayText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  dayTextActive: { color: Colors.surface },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  timeChip: {
    width: '22%',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.sm,
  },
  timeChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  timeText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  timeTextActive: { color: Colors.surface },
  durationRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  durationChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.sm,
  },
  durationChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  durationText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
  durationTextActive: { color: Colors.surface },
  summary: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    ...Shadow.sm,
  },
  summaryTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  summaryLabel: { fontSize: FontSize.sm, color: Colors.textSecondary },
  summaryValue: { fontSize: FontSize.sm, color: Colors.text, fontWeight: FontWeight.medium },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
  },
  summaryTotalLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  summaryTotalValue: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  confirmBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadow.md,
  },
  confirmBtnDisabled: {
    backgroundColor: Colors.textMuted,
  },
  confirmBtnText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.surface,
  },
});
