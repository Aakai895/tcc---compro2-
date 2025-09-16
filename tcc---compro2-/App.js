import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Loading from './screens/Loading';
import Bem_Vindo3 from './screens/BoasVindas/Bem_Vindo3';
import Bem_Vindo2 from './screens/BoasVindas/Bem_Vindo2';
import Bem_Vindo1 from './screens/BoasVindas/Bem_Vindo1';
import Login from './screens/Cadastro&Login/Login';
import TipoCadastro from './screens/Cadastro&Login/TipoCadastro';
import CadastroUsuario from './screens/Cadastro&Login/CadastroUsuario';
import CadastroUsuario2 from './screens/Cadastro&Login/CadastroUsuario2';
import CadastroEmpresa from './screens/Cadastro&Login/CadastroEmpresa';
import CadastroEmpresa2 from './screens/Cadastro&Login/CadastroEmpresa2';
import EsqueciSenha from './screens/Cadastro&Login/EsqueciSenha';
import CadastroClinica from './screens/Cadastro&Login/CadastroClinica';
import CadastroClinica2 from './screens/Cadastro&Login/CadastroClinica2';
import TelasUsuario from './screens/TelasUsuario/TelasUsuario';
import Home from './screens/TelasUsuario/Home';
import Carrinho from './screens/TelasUsuario/Carrinho';
import FormasCompra from './screens/TelasUsuario/Compra';
import Loja from './screens/TelasUsuario/Loja';
import FiltroLoja from './screens/TelasUsuario/FiltroLoja';
import Consultas from './screens/TelasUsuario/Consultas'
import FiltroConsultas from './screens/TelasUsuario/FiltroConsultas';
import MinhasConsultas from './screens/TelasUsuario/MinhasConsultas';
import CancelarConsulta from './screens/TelasUsuario/CancelarConsulta';
import Perfil from './screens/TelasUsuario/Perfil';
import Seguro from './screens/TelasUsuario/Seguro';
import PoliticaPrivacidade from './screens/TelasUsuario/PoliticaPrivacidade';
import Suporte from './screens/TelasUsuario/Suporte';
import Configuracoes from './screens/TelasUsuario/Configuracoes';
import PerguntasFrequentes from './screens/TelasUsuario/PerguntasFreq';
import SplashEmocoes from './screens/Splash/EmocoesSplash';
import FundoEmocoes from './Style/Backgrounds/Emocoes_Fundo';
import Emocoes from './screens/TelasUsuario/Emocoes';
import Humores from './screens/TelasUsuario/Humores';
import Chat from './screens/TelasUsuario/Chat';
import Conversa from './screens/TelasUsuario/Conversa';
import Profile from './screens/TelasUsuario/Profile';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerScreens() {
  return (
    <Drawer.Navigator initialRouteName="TelasUsuario"screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Bem_Vindo1" component={Bem_Vindo1} />
      <Drawer.Screen name="Bem_Vindo2" component={Bem_Vindo2} />
      <Drawer.Screen name="Bem_Vindo3" component={Bem_Vindo3} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="EsqueciSenha" component={EsqueciSenha} />
      <Drawer.Screen name="TipoCadastro" component={TipoCadastro} />
      <Drawer.Screen name="CadastroUsuario" component={CadastroUsuario} />
      <Drawer.Screen name="CadastroUsuario2" component={CadastroUsuario2} />
      <Drawer.Screen name="CadastroEmpresa" component={CadastroEmpresa} />
      <Drawer.Screen name="CadastroEmpresa2" component={CadastroEmpresa2} />
      <Drawer.Screen name="CadastroClinica" component={CadastroClinica} />
      <Drawer.Screen name="CadastroClinica2" component={CadastroClinica2} />
      <Drawer.Screen name="TelasUsuario" component={TelasUsuario} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Carrinho" component={Carrinho} />
      <Drawer.Screen name="FormasCompra" component={FormasCompra} />
      <Drawer.Screen name="Loja" component={Loja} />
      <Drawer.Screen name="FiltroLoja" component={FiltroLoja} />
      <Drawer.Screen name="Consultas" component={Consultas} />
      <Drawer.Screen name="FiltroConsultas" component={FiltroConsultas} />
      <Drawer.Screen name="MinhasConsultas" component={MinhasConsultas} />
      <Drawer.Screen name="CancelarConsulta" component={CancelarConsulta} />
      <Drawer.Screen name="Perfil" component={Perfil} />
      <Drawer.Screen name="Seguro" component={Seguro} />
      <Drawer.Screen name="PoliticaPrivacidade" component={PoliticaPrivacidade} />
      <Drawer.Screen name="Suporte" component={Suporte} />
      <Drawer.Screen name="Configuracoes" component={Configuracoes} />
      <Drawer.Screen name="PerguntasFrequentes" component={PerguntasFrequentes} />
      <Drawer.Screen name="SplashEmocoes" component={SplashEmocoes} />
      <Drawer.Screen name="FundoEmocoes" component={FundoEmocoes} />
      <Drawer.Screen name="Emocoes" component={Emocoes} />
      <Drawer.Screen name="Humores" component={Humores} />
      <Drawer.Screen name="Chat" component={Chat} />
      <Drawer.Screen name="Conversa" component={Conversa} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default function Rotas() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Main" component={DrawerScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

