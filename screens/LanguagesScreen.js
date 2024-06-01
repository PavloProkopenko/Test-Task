import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import Back from '../assets/img/back_arrow.png';
import LanguageIcon from '../assets/img/language_icon.png';
import CheckIcon from '../assets/img/check_icon.png';

const languages = [
  { id: 'en', name: 'English' },
  { id: 'ar', name: 'Arabic' },
];

const LanguageScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageSelect = async (language) => {
    setSelectedLanguage(language.id);
    await AsyncStorage.setItem('appLanguage', language.id);
    i18n.changeLanguage(language.id);
  };

  useEffect(() => {
    const getSelectedLanguage = async () => {
      const language = await AsyncStorage.getItem('appLanguage');
      if (language) {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
      }
    };

    getSelectedLanguage();
  }, [i18n]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={Back} style={styles.backArrow} />
      </TouchableOpacity>
      <Text style={styles.title}>{t('language')}</Text>
      {languages.map((language) => (
        <TouchableOpacity
          key={language.id}
          style={styles.languageOption}
          onPress={() => handleLanguageSelect(language)}
        >
          <Image source={LanguageIcon} style={styles.languageIcon} />
          <Text style={styles.languageText}>{language.name}</Text>
          {selectedLanguage === language.id && <Image source={CheckIcon} style={styles.checkIcon} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f3f5',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,
  },
  backArrow: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 56,
    marginBottom: 20,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 10,
  },
  languageIcon: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  languageText: {
    fontSize: 16,
    flex: 1,
  },
  checkIcon: {
    width: 24,
    height: 24,
  },
});

export default LanguageScreen;
