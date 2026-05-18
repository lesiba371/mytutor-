import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Colors, FontSize, FontWeight, Radius, Spacing } from '../theme';
import { SESSIONS } from '../data';
import SessionCard from '../components/SessionCard';

const TABS = ['Upcoming', 'Completed', 'Cancelled'] as const;
type Tab = typeof TABS[number];

export default function SessionsScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('Upcoming');

  const filtered = SESSIONS.filter(
    (s) => s.status === activeTab.toLowerCase() as typeof s.status,
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Tab bar */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>
              {activeTab === 'Upcoming' ? '📅' : activeTab === 'Completed' ? '✅' : '❌'}
            </Text>
            <Text style={styles.emptyText}>No {activeTab.toLowerCase()} sessions.</Text>
          </View>
        }
        renderItem={({ item }) => <SessionCard session={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm + 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },
  list: {
    padding: Spacing.md,
    flexGrow: 1,
  },
  empty: {
    alignItems: 'center',
    paddingTop: Spacing.xxl,
  },
  emptyIcon: { fontSize: 40, marginBottom: Spacing.md },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
});
