import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.blue}>
        <View style={styles.headerContent}>
          <Image source={require('../../assets/Plano_Fundo/ExploreApp.jpg.png')} style={styles.iconeconversa} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Clínica Maia</Text>
            <Text style={styles.userStatus}>Online</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.white} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.hojeText}>Hoje</Text>

        <View style={styles.mensagemclinica}>
          <Text style={styles.mensagemTexto}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </Text>
          <Text style={styles.horario}>13:33</Text>
        </View>

        <View style={styles.mensagemclinica2}>
          <Text style={styles.mensagemTexto}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
          <Text style={styles.horario}>13:35</Text>
        </View>

        <View style={styles.mensagemusuario}>
          <Text style={styles.mensagemUsuarioTexto}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
          <Text style={styles.horarioUsuario}>14:35</Text>
        </View>
      </ScrollView>

      <View style={styles.suamensagem}>
        <TextInput
          style={styles.formtext}
          placeholder="Digite sua mensagem aqui..."
          placeholderTextColor="#000000"
        />
        <TouchableOpacity style={styles.sendButton}>
          <FontAwesome name="send" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  blue: {
    backgroundColor: '#a1b1bc',
    padding: 20,
    paddingBottom: 30,
  },
  headerContent: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  iconeconversa: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontFamily: 'Finder-Display-Regular',
    fontSize: 16,
    color: 'white',
  },
  userStatus: {
    fontFamily: 'Alice-Regular',
    fontSize: 14,
    color: 'white',
    marginTop: 4,
  },
  white: {
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  hojeText: {
    fontFamily: 'Finder-Display-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  mensagemclinica: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: 'white',
    marginTop: 15,
    marginLeft: 15,
    width: '70%',
  },
  mensagemclinica2: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: 'white',
    marginTop: 10,
    marginLeft: 15,
    width: '70%',
  },
  mensagemusuario: {
    borderWidth: 2,
    borderColor: '#47667b',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#47667b',
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 15,
    width: '70%',
  },
  mensagemTexto: {
    fontFamily: 'Alice-Regular',
    fontSize: 14,
    color: '#000',
  },
  mensagemUsuarioTexto: {
    fontFamily: 'Alice-Regular',
    fontSize: 14,
    color: 'white',
  },
  horario: {
    fontSize: 10,
    marginLeft: 'auto',
    color: '#737373',
    marginRight: 5,
    marginTop: 5,
  },
  horarioUsuario: {
    fontSize: 10,
    marginLeft: 'auto',
    color: 'white',
    marginRight: 5,
    marginTop: 5,
  },
  suamensagem: {
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  formtext: {
    padding: 14,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#d9d9d9',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    fontFamily: 'Alice-Regular',
    fontSize: 16,
    width: '80%',
  },
  sendButton: {
    backgroundColor: '#47667b',
    borderRadius: 15,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
