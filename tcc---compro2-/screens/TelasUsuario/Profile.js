import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, SafeAreaView,
  Image, TouchableOpacity, TextInput, ScrollView,} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Chat({ navigation }) {
  const [abaAtiva, setAbaAtiva] = useState('Meus Dados');

  const renderConteudo = () => {
    if (abaAtiva === 'Meus Dados') {
      return (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.formtext}
            placeholder="Lorena Alvarado"
            placeholderTextColor="#000000"
          />

          <Text style={styles.label}>Data de Nascimento</Text>
          <TextInput
            style={styles.formtext}
            placeholder="00/00/0000"
            placeholderTextColor="#000000"
          />

          <Text style={styles.label}>Sexo</Text>
          <TextInput
            style={styles.formtext}
            placeholder="Feminino"
            placeholderTextColor="#000000"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.formtext}
            placeholder="lorenaalvarado@gmail.com"
            placeholderTextColor="#000000"
          />

          <Text style={styles.label}>Estado</Text>
          <TextInput
            style={styles.formtext}
            placeholder="SP"
            placeholderTextColor="#000000"
          />

          <Text style={styles.label}>Cidade</Text>
          <TextInput
            style={styles.formtext}
            placeholder="SP"
            placeholderTextColor="#000000"
          />

          <Text style={styles.label}>Endereço (Rua, número)</Text>
          <TextInput
            style={styles.formtext}
            placeholder="2015, Rosas Vermelhas"
            placeholderTextColor="#000000"
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('EditarPerfil')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (abaAtiva === 'Dados da Prótese') {
      return (
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Dados Adicionais</Text>

          <Text style={styles.label}>Altura</Text>
          <TextInput
            style={styles.formtext}
            placeholder="1,65"
            placeholderTextColor="#000000"
          />

          <Text style={styles.label}>Peso</Text>
          <TextInput
            style={styles.formtext}
            placeholder="62kg"
            placeholderTextColor="#000000"
          />

          <Text style={styles.label}>Data de Amputação</Text>
          <TextInput
            style={styles.formtext}
            placeholder="12/03/2023"
            placeholderTextColor="#000000"
          />

          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Dados da Prótese</Text>

          <Text style={styles.label}>Tipo</Text>
          <TextInput
            style={styles.formtext}
            placeholder="Prótese Transtibial"
            placeholderTextColor="#000000"
          />

          <Text style={styles.label}>Lado</Text>
          <TextInput
            style={styles.formtext}
            placeholder="Esquerdo"
            placeholderTextColor="#000000"
          />

          <Text style={styles.label}>Modelo</Text>
          <TextInput
            style={styles.formtext}
            placeholder="Ottobock 1C30 Trias"
            placeholderTextColor="#000000"
          />

          <Text style={styles.label}>Material</Text>
          <TextInput
            style={styles.formtext}
            placeholder="Carbono e Titânio"
            placeholderTextColor="#000000"
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('EditarPerfil')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Image source={require('../../assets/Plano_Fundo/ExploreApp.jpg.png')} style={styles.lorena} />

          <Text style={styles.userName}>Lorena Alvarado</Text>

          <View style={styles.nav}>
            <TouchableOpacity onPress={() => setAbaAtiva('Meus Dados')}>
              <Text
                style={[
                  styles.navItem,
                  abaAtiva === 'Meus Dados' && styles.navItemAtivo,
                ]}
              >
                Meus Dados
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAbaAtiva('Dados da Prótese')}>
              <Text
                style={[
                  styles.navItem,
                  abaAtiva === 'Dados da Prótese' && styles.navItemAtivo,
                ]}
              >
                Dados da Prótese
              </Text>
            </TouchableOpacity>
          </View>

          {renderConteudo()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  lorena: {
    height: 180,
    width: 180,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    marginTop: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  userName: {
    textAlign: 'center',
    fontFamily: 'Alice-Regular',
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginHorizontal: 20,
  },
  navItem: {
    fontFamily: 'Alice-Regular',
    fontSize: 16,
    color: '#6d8b89',
    paddingBottom: 8,
  },
  navItemAtivo: {
    color: '#000',
    fontWeight: 'bold',
    borderBottomWidth: 3,
    borderBottomColor: '#000',
  },
  formContainer: {
    marginHorizontal: 25,
    marginTop: 20,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#737373',
    marginTop: 15,
  },
  formtext: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d9d9d9',
    marginTop: 6,
    backgroundColor: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#47667b',
    borderRadius: 18,
    paddingVertical: 14,
    marginTop: 25,
    marginHorizontal: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
});
