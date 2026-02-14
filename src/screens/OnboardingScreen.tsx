import React, {useState, useCallback} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OliveLogo, ObsidianButton} from '@components';
import {Colors, Typography, Spacing} from '@theme';
import {useAuth} from '../context/AuthContext';

const SECTIONS = [
  {
    title: 'What is Olive?',
    body: 'Olive is a platform for discovering and reserving allocations in private investment deals\u2009—\u2009real estate, venture, debt, and more. We bring institutional-grade opportunities to you.',
  },
  {
    title: 'How it works',
    body: 'Browse curated deals on your feed. When something catches your eye, reserve an allocation. This is a soft commitment\u2009—\u2009we won\u2019t pull any funds until the deal closes and you confirm.',
  },
  {
    title: 'No money moves yet',
    body: 'Reserving an allocation signals your interest and secures your spot. You\u2019ll be notified before any funds are collected, and you can withdraw your reservation at any time.',
  },
];

const OnboardingScreen: React.FC = () => {
  const {completeOnboarding} = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = useCallback(async () => {
    setLoading(true);
    try {
      await completeOnboarding();
    } catch {
      // Still proceed even if Firestore update fails
    } finally {
      setLoading(false);
    }
  }, [completeOnboarding]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <OliveLogo size={48} />
          <Text style={styles.welcome}>Welcome to Olive</Text>
        </View>

        {/* Sections */}
        {SECTIONS.map((section, index) => (
          <View
            key={section.title}
            style={[
              styles.section,
              index < SECTIONS.length - 1 && styles.sectionBorder,
            ]}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionBody}>{section.body}</Text>
          </View>
        ))}

        {/* CTA */}
        <View style={styles.ctaSection}>
          <ObsidianButton
            title="Get Started"
            onPress={handleGetStarted}
            loading={loading}
            disabled={loading}
            style={styles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  welcome: {
    ...Typography.headerLarge,
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
  },
  section: {
    paddingVertical: Spacing.xl,
  },
  sectionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  sectionTitle: {
    ...Typography.headerMedium,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  sectionBody: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    lineHeight: 26,
  },
  ctaSection: {
    marginTop: Spacing.xxl,
  },
  button: {
    borderRadius: 0,
  },
});

export default OnboardingScreen;
