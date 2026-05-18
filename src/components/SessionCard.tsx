import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '../theme';
import { Session } from '../data';

interface SessionCardProps {
  session: Session;
  onPress?: (session: Session) => void;
}

const STATUS_LABEL: Record<Session['status'], string> = {
  upcoming: 'Upcoming',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const STATUS_COLOR: Record<Session['status'], string> = {
  upcoming: Colors.primary,
  completed: Colors.secondary,
  cancelled: Colors.error,
};

const STATUS_BG: Record<Session['status'], string> = {
  upcoming: '#EEF2FF',
  completed: '#ECFDF5',
  cancelled: '#FEE2E2',
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

export default function SessionCard({ session, onPress }: SessionCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(session)}
      activeOpacity={onPress ? 0.85 : 1}
    >
      <View style={styles.top}>
        <View style={styles.tutorRow}>
          <Text style={styles.avatar}>{session.tutorAvatar}</Text>
          <View>
            <Text style={styles.name}>{session.tutorName}</Text>
            <Text style={styles.subject}>{session.subject}</Text>
          </View>
        </View>
        <View style={[styles.badge, { backgroundColor: STATUS_BG[session.status] }]}>
          <Text style={[styles.badgeText, { color: STATUS_COLOR[session.status] }]}>
            {STATUS_LABEL[session.status]}
          </Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.bottom}>
        <Text style={styles.metaText}>📅 {formatDate(session.date)}</Text>
        <Text style={styles.metaText}>🕐 {session.time}  ·  {session.duration} min</Text>
      </View>
      {session.notes ? <Text style={styles.notes} numberOfLines={2}>{session.notes}</Text> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tutorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.sm,
  },
  avatar: {
    fontSize: 28,
    marginRight: Spacing.sm,
  },
  name: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  subject: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  badge: {
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },
  bottom: {
    flexDirection: 'row',
    gap: Spacing.md,
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  notes: {
    marginTop: Spacing.sm,
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
});
