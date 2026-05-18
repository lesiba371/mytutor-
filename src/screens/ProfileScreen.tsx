import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Switch,
} from 'react-native';
import { Colors, FontSize, FontWeight, Radius, Shadow, Spacing } from '../theme';

interface Preference {
  id: string;
  label: string;
  value: boolean;
}

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState<Preference[]>([
    { id: 'session_reminder', label: 'Session reminders', value: true },
    { id: 'new_message', label: 'New messages', value: true },
    { id: 'promotions', label: 'Promotions & tips', value: false },
  ]);

  const toggle = (id: string) => {
    setNotifications((prev) =>
      prev.map((p) => (p.id === id ? { ...p, value: !p.value } : p)),
    );
  };

  const handleEditProfile = () => Alert.alert('Edit Profile', 'Profile editing coming soon!');
  const handleHelp = () => Alert.alert('Help & Support', 'Email us at support@mytutor.co.za');
  const handleLogout = () => Alert.alert('Log out', 'Are you sure you want to log out?', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Log out', style: 'destructive', onPress: () => {} },
  ]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar / name */}
        <View style={styles.hero}>
          <View style={styles.avatarWrapper}>
            <Text style={styles.avatar}>🧑‍🎓</Text>
          </View>
          <Text style={styles.name}>Alex Dlamini</Text>
          <Text style={styles.email}>alex.dlamini@email.com</Text>
          <TouchableOpacity style={styles.editBtn} onPress={handleEditProfile}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Tutors</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Subjects</Text>
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          {notifications.map((pref) => (
            <View key={pref.id} style={styles.preferenceRow}>
              <Text style={styles.preferenceLabel}>{pref.label}</Text>
              <Switch
                value={pref.value}
                onValueChange={() => toggle(pref.id)}
                trackColor={{ false: Colors.border, true: Colors.primaryLight }}
                thumbColor={pref.value ? Colors.primary : Colors.textMuted}
              />
            </View>
          ))}
        </View>

        {/* Account */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {[
            { icon: '💳', label: 'Payment Methods' },
            { icon: '🔒', label: 'Privacy & Security' },
            { icon: '❓', label: 'Help & Support', onPress: handleHelp },
            { icon: '⭐', label: 'Rate the App' },
          ].map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.menuItem}
              onPress={item.onPress ?? (() => Alert.alert(item.label, 'Coming soon!'))}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Log out */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  hero: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
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
  },
  email: {
    fontSize: FontSize.sm,
    color: Colors.primaryLight,
    marginBottom: Spacing.md,
  },
  editBtn: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs + 2,
  },
  editBtnText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    ...Shadow.sm,
  },
  stat: { flex: 1, alignItems: 'center' },
  statNumber: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  section: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  sectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  preferenceLabel: {
    fontSize: FontSize.md,
    color: Colors.text,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  menuIcon: { fontSize: 18, marginRight: Spacing.md },
  menuLabel: { flex: 1, fontSize: FontSize.md, color: Colors.text },
  menuChevron: {
    fontSize: FontSize.xl,
    color: Colors.textMuted,
  },
  logoutBtn: {
    margin: Spacing.md,
    marginTop: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.error,
    ...Shadow.sm,
  },
  logoutText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.error,
  },
});
