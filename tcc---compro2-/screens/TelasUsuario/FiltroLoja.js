import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions,
  ScrollView, Platform, StatusBar, TouchableOpacity, Image, } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { RadioButton } from 'react-native-paper';

const screenWidth = Dimensions.get('window').width;

export default function Home({ navigation }) {
  const [values, setValues] = useState([20, 80]);
  const [selectedValue, setSelectedValue] = useState('4.5 e acima');
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedGender, setSelectedGender] = useState('Todos');

  const ratings = [
    '4.5 - 5.0',
    '4.0 - 4.5',
    '3.5 - 4.0',
    '3.0 - 3.5',
    '2.5 - 3.0',
    '2.0 - 2.5',
  ];

  const proteses = [
    'Todos',
    'Transtibial',
    'Transfemoral',
    'Transradial',
    'Transumeral',
    'Desart. joelho',
    'Desart. quadril',
    'Desart. ombro',
    'Parcial de pé',
    'Parcial de mão',
    'Modular',
  ];

  const handleBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } else {
      console.log('Voltar clicado');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnVoltar}
          onPress={() => navigation.navigate('TelasUsuario', { screen: 'Loja' })}
        >
          <Image source={require('../../assets/icones/SetaVoltar.png')}
            style={styles.imgVoltar}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Filtro
        </Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>
              Gênero
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {['Todos', 'Femininos', 'Masculinos'].map((gender, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedGender(gender)}
                  style={[
                    styles.genderButton,
                    selectedGender === gender ? styles.verde : styles.brancoScroll,
                  ]}
                >
                  <Text style={[ styles.text, selectedGender === gender ? styles.textBranco : {},]}>
                    {gender}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel2}>
              Tipos de Próteses
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {proteses.map((tipo, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedType(tipo)}
                  style={[
                    styles.tipoButton,
                    selectedType === tipo ? styles.verde : styles.brancoScroll,
                  ]}
                >
                  <Text style={[ styles.text, selectedType === tipo ? styles.textBranco : {},]} >
                    {tipo}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel2}>
              Preço
            </Text>
            <View style={{ alignItems: 'center' }}>
              <MultiSlider
                values={values}
                sliderLength={screenWidth - 50}
                onValuesChange={setValues}
                min={0}
                max={100}
                step={1}
                selectedStyle={{ backgroundColor: '#a8c9a3', height: 10 }}
                unselectedStyle={{ backgroundColor: '#d9d9d9', height: 10, borderRadius: 100, }} 
                markerStyle={{
                  backgroundColor: '#a8c9a3',
                  height: 28, 
                  width: 28,
                  borderRadius: 14,
                  borderWidth: 5,
                  borderColor: '#f5f5f5',
                  elevation: 3,
                  marginTop: 3,
                }}
              />
              
            </View>
            <View style={styles.priceRange}>
              <Text style={styles.text}>R$ 1.000</Text>
              <Text style={styles.text}>R$ 80.000+</Text>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel2}>
              Avaliações
            </Text>

            {ratings.map((rating) => (
              <View key={rating} style={styles.ratingRow}>
                <View style={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Entypo key={i} name="star" size={24} color="#6d8b89" />
                  ))}
                  <Text style={[styles.text, { marginLeft: 16, fontSize: 18 }]}>{rating}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => setSelectedValue(rating)}
                  style={{
                    height: 28,
                    width: 28,
                    borderRadius: 14,
                    borderWidth: 2,
                    borderColor: selectedValue === rating ? '#a8c9a3' : '#999',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selectedValue === rating && (
                    <View style={{
                        height: 14,
                        width: 14,
                        borderRadius: 7,
                        backgroundColor: '#a8c9a3',
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} 
            onPress={() => navigation.navigate('TelasUsuario', { screen: 'Loja' })}
          >
            <Text style={styles.buttonText}>
              Concluir
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  btnVoltar: {
    marginRight: 15,
  },
  imgVoltar: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 28,
    textAlign: 'center',
    flex: 1,
    color: '#000',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    paddingVertical: 30,
  },
  sectionContainer: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  sectionLabel: {
    fontSize: 22,
    color: '#000',
    marginBottom: 10,
  },
  sectionLabel2: {
    fontSize: 22,
    color: '#000',
    marginBottom: 10,
  },
  genderButton: {
    marginRight: 15,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipoButton: {
    marginRight: 15,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verde: {
    backgroundColor: '#a5c3a7',
  },
  brancoScroll: {
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: 'Alice-Regular',
    fontSize: 20,
  },
  textBranco: {
    color: 'white',
  },
  priceRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
    marginBottom: 35,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#a5c3a7',
    width: '100%',
    borderRadius: 100,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'Alice-Regular',
    color: '#000',
    fontSize: 20,
  },
  horizontalScroll: {
    paddingVertical: 10,
  },
});
