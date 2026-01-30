import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  KeyboardAvoidingView, Platform, Alert, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SIZES } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import GradientBackground from '../components/GradientBackground';

export default function AuthScreen() {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const { signInWithGoogle, signInWithEmail, authError } = useAuth();
  const { t } = useLanguage();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (e) {
      // Error already handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(t('common.error'), t('auth.emailPasswordRequired'));
      return;
    }
    if (password.length < 6) {
      Alert.alert(t('common.error'), t('auth.passwordMinLength'));
      return;
    }
    try {
      setLoading(true);
      await signInWithEmail(email.trim(), password, isRegistering);
    } catch (e) {
      // Error already handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.logoContainer, { backgroundColor: colors.primary + '15' }]}>
            <Ionicons name="flash" size={48} color={colors.primary} />
          </View>
          <Text style={styles.appName}>FocusLife</Text>
          <Text style={styles.tagline}>{t('auth.tagline')}</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>{t('auth.loggingIn')}</Text>
          </View>
        ) : showEmailForm ? (
          /* Email/Password Form */
          <View style={styles.form}>
            {/* Toggle Login/Register */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[styles.toggleButton, !isRegistering && styles.toggleButtonActive]}
                onPress={() => setIsRegistering(false)}
              >
                <Text style={[styles.toggleText, !isRegistering && styles.toggleTextActive]}>
                  {t('auth.login')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, isRegistering && styles.toggleButtonActive]}
                onPress={() => setIsRegistering(true)}
              >
                <Text style={[styles.toggleText, isRegistering && styles.toggleTextActive]}>
                  {t('auth.register')}
                </Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder={t('auth.email')}
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={styles.input}
              placeholder={t('auth.password')}
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {authError && (
              <Text style={styles.errorText}>{authError}</Text>
            )}

            <TouchableOpacity style={styles.emailButton} onPress={handleEmail}>
              <Ionicons name={isRegistering ? "person-add" : "log-in"} size={20} color="#FFFFFF" />
              <Text style={styles.emailButtonText}>
                {isRegistering ? t('auth.createAccount') : t('auth.login')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => { setShowEmailForm(false); setEmail(''); setPassword(''); setIsRegistering(false); }}
            >
              <Text style={styles.backButtonText}>{t('common.back')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Main Auth Options */
          <View style={styles.buttons}>
            {/* Google Sign-In */}
            <TouchableOpacity style={styles.googleButton} onPress={handleGoogle}>
              <Ionicons name="logo-google" size={20} color="#FFFFFF" />
              <Text style={styles.googleButtonText}>{t('auth.continueWithGoogle')}</Text>
            </TouchableOpacity>

            {/* Email Sign-In */}
            <TouchableOpacity
              style={styles.emailOptionButton}
              onPress={() => setShowEmailForm(true)}
            >
              <Ionicons name="mail-outline" size={20} color={colors.text} />
              <Text style={styles.emailOptionText}>{t('auth.continueWithEmail')}</Text>
            </TouchableOpacity>

            {authError && (
              <Text style={styles.errorText}>{authError}</Text>
            )}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {t('auth.terms')}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </GradientBackground>
  );
}

const useStyles = (COLORS) => useMemo(() => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    padding: SIZES.paddingLg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: SIZES.title,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 8,
  },
  tagline: {
    fontSize: SIZES.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
  },
  buttons: {
    gap: 12,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    borderRadius: SIZES.radiusXl,
    padding: 16,
    gap: 10,
  },
  googleButtonText: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  emailOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusXl,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emailOptionText: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  form: {
    gap: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusXl,
    padding: 4,
    marginBottom: 8,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: SIZES.radiusXl - 4,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: COLORS.primary,
  },
  toggleText: {
    fontSize: SIZES.md,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    fontSize: SIZES.lg,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusXl,
    padding: 16,
    gap: 10,
    marginTop: 8,
  },
  emailButtonText: {
    fontSize: SIZES.lg,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  backButton: {
    alignItems: 'center',
    padding: 12,
  },
  backButtonText: {
    fontSize: SIZES.md,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  errorText: {
    fontSize: SIZES.sm,
    color: COLORS.error,
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: SIZES.xs,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
}), [COLORS]);
