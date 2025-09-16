import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity,
  ScrollView, TextInput, LayoutAnimation, UIManager, Platform,
  Image,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import FundoFAQChat from '../../Style/Backgrounds/FAQ&Chat_Fundo';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function FAQ() {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(expanded === index ? null : index);
  };

  const perguntas = [
    {
      pergunta: 'O que é COMPRO?',
      resposta:
        'A expressão Lorem ipsum em design gráfico e editoração é um texto padrão em latim utilizado na     produção gráfica para preencher os espaços de texto em publicações para testar e ajustar aspectos visuais antes de utilizar conteúdo real.',
    },
    {
      pergunta: 'Meus dados estão seguros na plataforma?',
      resposta: 'Sim, utilizamos protocolos de segurança e criptografia.',
    },
    {
      pergunta: 'Como entro em contato com suporte?',
      resposta: 'Você pode acessar a aba de Suporte no menu principal.',
    },
    {
      pergunta: 'Onde vejo o contrato do Seguro?',
      resposta: 'O contrato está disponível na seção de Seguros do aplicativo.',
    },
    { pergunta: 'Dúvida 5', resposta: 'Resposta para dúvida 5.' },
    { pergunta: 'Dúvida 6', resposta: 'Resposta para dúvida 6.' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FundoFAQChat />
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('TelasUsuario')}>
          <Image source={require('../../assets/icones/SetaVoltar.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Perguntas frequentes</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={30} color="#555" style={{ marginRight: 6 }} />
        <TextInput
          placeholder="Procurar"
          placeholderTextColor="#000"
          style={styles.searchInput}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {perguntas.map((item, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity style={styles.cardHeader} 
              onPress={() => toggleExpand(index)}
            >
              <Text style={styles.cardTitle}>{item.pergunta}</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={30}
                color="#444"
                style={expanded === index ? { transform: [{ rotate: '180deg' }] } : {}}
              />
            </TouchableOpacity>
            {expanded === index && (
              <>
                <View style={styles.divider} />
                <Text style={styles.cardContent}>{item.resposta}</Text>
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 26,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: '#fff',
    borderColor: '#d9d9d9',
    borderWidth: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 20,
    color: '#000',
  },
  scrollContent: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderWidth: 2,
    borderColor: '#d9d9d9',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  cardContent: {
    marginTop: 8,
    fontSize: 18,
    color: '#573122',
    lineHeight: 18,
  },
  divider: {
    height: 2,
    backgroundColor: '#d9d9d9',
    marginTop: 12,
    marginBottom: 10,
  },
});
