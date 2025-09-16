import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image,
  TouchableOpacity, ScrollView, Linking,} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Seguro() {
  const navigation = useNavigation();

  const handleDownloadPDF = () => {
    Linking.openURL('https://example.com/contrato.pdf');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}
          onPress={() => navigation.navigate('TelasUsuario')}
        >
          <Image source={require('../../assets/icones/SetaVoltar.png')}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Seguro</Text>
      </View>

      <View style={styles.contentArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentWrapper}>
            <Text style={styles.title}>
              Conheça Nosso Seguro
            </Text>

            <Text style={styles.paragraph}>
              ed lectus purus, bibendum quis facilisis et, pulvinar nec nulla. Duis
              placerat volutpat tincidunt. In pharetra, purus nec dapibus
              scelerisque, orci nibh vestibulum mi, ac dapibus turpis justo vel
              nisl. Sed in iaculis justo.
            </Text>

            <Text style={styles.paragraph}>
              Phasellus sollicitudin bibendum blandit. Curabitur ac tempus leo.
              Pellentesque sit amet leo dignissim, porttitor augue vitae, molestie
              nulla. Integer ac neque eget nisl laoreet consequat eu non tellus.
              Vivamus faucibus lectus et elit faucibus, malesuada vestibulum nisl
              commodo.
            </Text>

            <Text style={styles.paragraph}>
              Aliquam pharetra eleifend tristique. Vivamus porta massa a sem
              fringilla pellentesque pharetra id erat. Etiam elit nunc, iaculis
              gravida nulla quis, bibendum volutpat lacus. Ut suscipit diam at
              aliquam mollis.
            </Text>

            <Text style={styles.paragraph}>
              Sed lectus purus, bibendum quis facilisis et, pulvinar nec nulla.
              Duis placerat volutpat tincidunt. In pharetra, purus nec dapibus
              scelerisque, orci nibh vestibulum mi, ac dapibus turpis justo vel
              nisl. Sed in iaculis justo.
            </Text>

            <Text style={styles.paragraph}>
              Phasellus sollicitudin bibendum blandit. Curabitur ac tempus leo.
              Pellentesque sit amet leo dignissim, porttitor augue vitae, molestie
              nulla. Integer ac neque eget nisl laoreet consequat eu non tellus.
              Vivamus faucibus lectus et elit faucibus, malesuada vestibulum nisl
              commodo.
            </Text>

            <Text style={styles.paragraph}>
              Aliquam pharetra eleifend tristique. Vivamus porta massa a sem
              fringilla pellentesque pharetra id erat. Etiam elit nunc, iaculis
              gravida nulla quis, bibendum volutpat lacus. Ut suscipit diam at
              aliquam mollis.
            </Text>

            <Text style={styles.downloadText}>
              Baixe o PDF para visualizar o{' '}
              <Text style={styles.highlight}>contrato do seguro</Text>
            </Text>

            <TouchableOpacity style={styles.imageButton} onPress={handleDownloadPDF}>
              <Image source={require('../../assets/icones/pdfIcon.webp')}
                style={styles.pdfIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.footer} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerContainer: {
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  contentArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentWrapper: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    color: '#a5c3a7',
    fontSize: 24,
  },
  paragraph: {
    color: '#737373',
    fontSize: 16,
    marginTop: 12,
    lineHeight: 24,
  },
  downloadText: {
    fontSize: 16,
    marginTop: 24,
    color: '#737373',
  },
  highlight: {
    color: '#d17b88',
  },
  imageButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  pdfIcon: {
    width: 80,
    height: 80,
  },
  footer: {
    height: 40,
    backgroundColor: '#ffffff',
    borderTopWidth: 2,
    borderTopColor: '#dcdcdc',
  },
});
