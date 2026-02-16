import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {OliveLogo, ObsidianButton} from '@components';
import {Colors, Typography, Spacing} from '@theme';
import {useAuth} from '../context/AuthContext';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

// --- Geometric illustrations built from Views ---

const WelcomeIllustration: React.FC = () => (
  <View style={ilStyles.container}>
    <OliveLogo size={72} />
  </View>
);

// Document stack — represents browsing deals
const DealsIllustration: React.FC = () => (
  <View style={ilStyles.container}>
    {/* Back card */}
    <View style={[ilStyles.card, ilStyles.cardBack]} />
    {/* Middle card */}
    <View style={[ilStyles.card, ilStyles.cardMid]} />
    {/* Front card */}
    <View style={[ilStyles.card, ilStyles.cardFront]}>
      <View style={ilStyles.cardLine} />
      <View style={[ilStyles.cardLine, {width: 32}]} />
      <View style={ilStyles.cardDivider} />
      <View style={ilStyles.cardAccentBar} />
    </View>
  </View>
);

// Connected circles — represents pooling with friends
const PoolIllustration: React.FC = () => (
  <View style={ilStyles.container}>
    <View style={ilStyles.poolGroup}>
      {/* Center circle */}
      <View style={[ilStyles.poolCircle, ilStyles.poolCenter]}>
        <View style={ilStyles.poolCenterDot} />
      </View>
      {/* Surrounding circles */}
      <View style={[ilStyles.poolCircle, ilStyles.poolTop]} />
      <View style={[ilStyles.poolCircle, ilStyles.poolRight]} />
      <View style={[ilStyles.poolCircle, ilStyles.poolBottom]} />
      <View style={[ilStyles.poolCircle, ilStyles.poolLeft]} />
      {/* Connection lines */}
      <View style={[ilStyles.poolLine, ilStyles.lineV]} />
      <View style={[ilStyles.poolLine, ilStyles.lineH]} />
    </View>
  </View>
);

// Shield outline — represents safety / no money moves
const SafetyIllustration: React.FC = () => (
  <View style={ilStyles.container}>
    <View style={ilStyles.shield}>
      <View style={ilStyles.shieldCheck}>
        <View style={ilStyles.checkShort} />
        <View style={ilStyles.checkLong} />
      </View>
    </View>
  </View>
);

const ilStyles = StyleSheet.create({
  container: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
  },
  // Deals — card stack
  card: {
    position: 'absolute',
    width: 80,
    height: 100,
    borderWidth: 2,
    borderColor: Colors.accent,
    borderRadius: 6,
    backgroundColor: Colors.backgroundPrimary,
  },
  cardBack: {
    transform: [{rotate: '8deg'}, {translateX: 6}],
    opacity: 0.25,
  },
  cardMid: {
    transform: [{rotate: '3deg'}, {translateX: 2}],
    opacity: 0.5,
  },
  cardFront: {
    paddingTop: 18,
    paddingLeft: 12,
    gap: 6,
  },
  cardLine: {
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.primaryBlack,
    opacity: 0.2,
  },
  cardDivider: {
    width: 56,
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 4,
  },
  cardAccentBar: {
    width: 36,
    height: 8,
    borderRadius: 2,
    backgroundColor: Colors.accent,
    opacity: 0.7,
  },
  // Pool — connected circles
  poolGroup: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  poolCircle: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.accent,
    backgroundColor: Colors.backgroundPrimary,
  },
  poolCenter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2.5,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  poolCenterDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.accent,
  },
  poolTop: {top: 0, left: 44},
  poolRight: {top: 44, right: 0},
  poolBottom: {bottom: 0, left: 44},
  poolLeft: {top: 44, left: 0},
  poolLine: {
    position: 'absolute',
    backgroundColor: Colors.accent,
    opacity: 0.25,
  },
  lineV: {width: 2, height: 88},
  lineH: {height: 2, width: 88},
  // Safety — shield
  shield: {
    width: 72,
    height: 88,
    borderWidth: 2.5,
    borderColor: Colors.accent,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldCheck: {
    width: 32,
    height: 24,
    marginTop: -2,
  },
  checkShort: {
    position: 'absolute',
    bottom: 0,
    left: 2,
    width: 12,
    height: 3,
    backgroundColor: Colors.accent,
    borderRadius: 2,
    transform: [{rotate: '45deg'}],
  },
  checkLong: {
    position: 'absolute',
    bottom: 3,
    left: 10,
    width: 22,
    height: 3,
    backgroundColor: Colors.accent,
    borderRadius: 2,
    transform: [{rotate: '-45deg'}],
  },
});

// --- Page data ---

interface Page {
  Illustration: React.FC;
  title: string | ((name: string) => string);
  subtitle: string;
}

const PAGES: Page[] = [
  {
    Illustration: WelcomeIllustration,
    title: (name: string) => `Welcome${name ? `, ${name}` : ''}`,
    subtitle:
      'Olive brings institutional-grade investment opportunities to you \u2014 real estate, venture, debt, and more.',
  },
  {
    Illustration: DealsIllustration,
    title: 'Discover deals',
    subtitle:
      'Browse curated opportunities on your feed. When something catches your eye, reserve your allocation with a tap.',
  },
  {
    Illustration: PoolIllustration,
    title: 'Pool with friends',
    subtitle:
      'Join or create pools to invest together. Chat, track progress, and combine your capital for bigger opportunities.',
  },
  {
    Illustration: SafetyIllustration,
    title: 'No money moves yet',
    subtitle:
      'Reserving signals your interest and secures your spot. You\u2019ll be notified before any funds are collected, and you can withdraw anytime.',
  },
];

// --- Onboarding screen ---

const OnboardingScreen: React.FC = () => {
  const {completeOnboarding, userName} = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const isLastPage = currentPage === PAGES.length - 1;

  const animateTransition = useCallback(
    (toPage: number) => {
      const direction = toPage > currentPage ? 1 : -1;
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: direction * -30,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentPage(toPage);
        slideAnim.setValue(direction * 30);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start();
      });
    },
    [currentPage, fadeAnim, slideAnim],
  );

  const handleNext = useCallback(() => {
    if (isLastPage) {
      setLoading(true);
      completeOnboarding()
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      animateTransition(currentPage + 1);
    }
  }, [isLastPage, currentPage, animateTransition, completeOnboarding]);

  const handleSkip = useCallback(() => {
    setLoading(true);
    completeOnboarding()
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [completeOnboarding]);

  const page = PAGES[currentPage];
  const title =
    typeof page.title === 'function' ? page.title(userName) : page.title;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Skip button */}
        {!isLastPage && (
          <Pressable style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        )}
        {isLastPage && <View style={styles.skipPlaceholder} />}

        {/* Page content */}
        <Animated.View
          style={[
            styles.pageContent,
            {opacity: fadeAnim, transform: [{translateY: slideAnim}]},
          ]}>
          <page.Illustration />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{page.subtitle}</Text>
        </Animated.View>

        {/* Bottom section */}
        <View style={styles.bottomSection}>
          {/* Progress dots */}
          <View style={styles.dots}>
            {PAGES.map((_, i) => (
              <Pressable
                key={i}
                onPress={() => i !== currentPage && animateTransition(i)}
                style={styles.dotTouchable}>
                <View
                  style={[
                    styles.dot,
                    i === currentPage ? styles.dotActive : styles.dotInactive,
                  ]}
                />
              </Pressable>
            ))}
          </View>

          {/* CTA */}
          <ObsidianButton
            title={isLastPage ? 'Get started' : 'Continue'}
            onPress={handleNext}
            loading={loading}
            disabled={loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  skipButton: {
    alignSelf: 'flex-end',
    paddingVertical: Spacing.md,
  },
  skipPlaceholder: {
    height: 52,
  },
  skipText: {
    ...Typography.bodyMedium,
    color: Colors.textTertiary,
    fontWeight: '600',
  },
  pageContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...Typography.displayMedium,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: Spacing.sm,
  },
  bottomSection: {
    paddingBottom: Spacing.xl,
    gap: Spacing.lg,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  dotTouchable: {
    padding: 4,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.accent,
  },
  dotInactive: {
    width: 8,
    backgroundColor: Colors.borderLight,
  },
});

export default OnboardingScreen;
