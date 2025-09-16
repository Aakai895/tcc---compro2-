import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,
  SafeAreaView, ScrollView, Dimensions, ActivityIndicator,
} from 'react-native';
import { useFonts } from 'expo-font';
import Checkbox from 'expo-checkbox';

const screenWidth = Dimensions.get('window').width;

export default function CarrinhoScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [selecionados, setSelecionados] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Alice: require('../../fonts/Alice-Regular.ttf'),
    Findel: require('../../fonts/Findel-Display-Regular.otf'),
  });

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('https://minha-api-ochre.vercel.app/');
        const data = await response.json();
        setProdutos(data);

        const quantInit = {};
        data.forEach((item) => {
          quantInit[item.id] = 1;
        });
        setQuantidades(quantInit);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProdutos();
  }, []);

  if (!fontsLoaded || loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#3b5b82" />
      </SafeAreaView>
    );
  }

  const toggleSelecionar = (id) => {
    if (selecionados.includes(id)) {
      setSelecionados(selecionados.filter((item) => item !== id));
    } else {
      setSelecionados([...selecionados, id]);
    }
  };

  const alterarQuantidade = (id, tipo) => {
    setQuantidades((prev) => {
      const atual = prev[id] || 1;
      if (tipo === 'mais') return { ...prev, [id]: atual + 1 };
      if (tipo === 'menos' && atual > 1) return { ...prev, [id]: atual - 1 };
      return prev;
    });
  };

  const calcularTotal = () => {
    return selecionados.reduce((acc, id) => {
      const produto = produtos.find((p) => p.id === id);
      const valor = produto?.informacoesCompraGarantia?.valor ?? 0;
      return produto ? acc + valor * quantidades[id] : acc;
    }, 0);
  };

  const fila1 = produtos.slice(0, Math.ceil(produtos.length / 3));
  const fila2 = produtos.slice(Math.ceil(produtos.length / 3), Math.ceil((produtos.length * 2) / 3));
  const fila3 = produtos.slice(Math.ceil((produtos.length * 2) / 3));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btnVoltar}
          onPress={() => navigation.navigate('TelasUsuario')}
        >
          <Image source={require('../../assets/icones/SetaVoltar.png')}
            style={styles.imgVoltar}
          />
        </TouchableOpacity>

        <Text style={styles.tituloHeader}>
          Carrinho ({selecionados.length})
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {selecionados.length === 0 ? (
          <View style={styles.vazioInfo}>
            <Image source={require('../../assets/icones/iconProtese.png')}
              style={styles.vazioImagem}
              resizeMode="contain"
            />
            <Text style={styles.vazioTextoInfo}>
              Não há pedidos selecionados.
            </Text>
          </View>
        ) : (

          <View style={styles.selecionadosContainer}>
            {selecionados.map((id) => {
              const produto = produtos.find((p) => p.id === id);
              if (!produto) return null;
              const valor = produto.informacoesCompraGarantia?.valor ?? 0;
              const valorFormatado = valor.toLocaleString('pt-BR', {
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 }
              );
              const imagemUri = produto.imagem?.startsWith('http') ? 
              produto.imagem : 'https://picsum.photos/200/300';

              return (
                <View key={id} style={[styles.card, styles.cardSelecionado]}>
                  <Checkbox style={styles.checkbox}
                    value={selecionados.includes(id)}
                    onValueChange={() => toggleSelecionar(id)}
                    color={selecionados.includes(id) ? "#f8f4c4" : undefined}
                  />

                  <Image source={{ uri: imagemUri }} 
                    style={styles.imagemSelecionado} 
                  />

                  <View style={styles.infoContainer}>
                    <Text style={styles.nome}>{produto.tipo}</Text>
                    <Text style={styles.fabricante}>
                      Fabricante: {produto.fabricante?.nome || "Não informado"}
                    </Text>

                    <Text style={styles.entrega}>
                      Entrega: {produto.informacoesCompraGarantia?.entrega || "Não informado"}
                    </Text>

                    <TouchableOpacity style={styles.btnPersonalizar}>
                      <Text style={styles.btnPersonalizarText}>
                        Visualizar personalização
                      </Text>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.sideInfo}>
                    <Text style={styles.preco}>R$ {valorFormatado}</Text>
                    <View style={styles.quantidade}>
                      <TouchableOpacity style={styles.qtdBtn} onPress={() => alterarQuantidade(id, 'menos')}>
                        <Text style={styles.qtdTexto}>-</Text>
                      </TouchableOpacity>

                      <Text style={styles.qtdValor}>{quantidades[id]}</Text>
                      <TouchableOpacity style={styles.qtdBtn} onPress={() => alterarQuantidade(id, 'mais')}>
                        <Text style={styles.qtdTexto}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <View style={styles.produtosContainer}>
          <Text style={styles.titulo}>
            --- Produtos Diversos ---
          </Text>

          {[fila1, fila2, fila3].map((fila, index) => (
            <ScrollView
              key={`fila-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {fila.map((item) => {
                const imagemUri = item.imagem?.startsWith('http') ?
                item.imagem : 'https://picsum.photos/200/300';
                const valor = item.informacoesCompraGarantia?.valor ?? 0;
                const valorFormatado = valor.toLocaleString('pt-BR', { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: 2 }
                );
                const vendidos = item.quantidadeVendida ?? 0;

                return (
                  <View key={`item-${item.id}`} style={styles.cardWrapper}>
                    <Image source={require('../../assets/icones/BordaCardCima.png')} 
                      style={styles.outsideTopIcon}
                    />

                    <TouchableOpacity
                      style={[styles.featuredCard, selecionados.includes(item.id) && styles.cardSelecionado]}
                      onPress={() => toggleSelecionar(item.id)}
                      activeOpacity={0.8}
                    >
                      <Image source={{ uri: imagemUri }} 
                        style={styles.featuredImage} 
                      />

                      <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{item.tipo}</Text>
                        <View style={styles.priceSoldContainer}>
                          <Text style={styles.cardPricePink}>R${valorFormatado}</Text>
                          <Text style={styles.cardSub}>{vendidos} vendidos</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <Image source={require('../../assets/icones/BordaCardBaixo.png')} 
                      style={styles.outsideBottomIcon} 
                    />
                  </View>
                );
              })}
            </ScrollView>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.leftSection}>
          <Checkbox
            style={styles.checkbox}
            value={selecionados.length > 0}
            color="#3b5b82"
          />
          <Text style={styles.checkboxLabel}>
            Tudo
          </Text>
        </View>
        
        <View style={styles.rightSection}>
          <Text style={styles.total}>
            R$ {calcularTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Text>

          <TouchableOpacity style={styles.btn} activeOpacity={0.7} 
            onPress={() => navigation.navigate('FormasCompra')}
          >
            <Text style={styles.btnText}>
              Continuar
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
    backgroundColor: '#f5f5f5' 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  btnVoltar: {
    marginRight: 10,
    marginTop: 33,
  },
  imgVoltar: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  tituloHeader: {
    fontSize: 20,
    fontFamily: 'Findel',
    marginTop: 33,
    color: '#545454',
  },
  produtosContainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingBottom: 20,
  },
  horizontalScroll: {
    paddingLeft: 10,
    paddingBottom: 20,
  },
  featuredImage: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: screenWidth * 0.035,
    marginBottom: 4,
    color: '#333',
  },
  priceSoldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPricePink: {
    fontSize: screenWidth * 0.035,
    fontWeight: 'bold',
    color: '#e91e63',
  },
  cardSub: {
    fontSize: screenWidth * 0.03,
    color: '#666',
  },
  titulo: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    fontStyle: 'italic',
    fontSize: 20,
    padding: 5,
    marginTop: 15,
  },
  vazioInfo: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingTop: 10,
    textAlign: 'center',
  },
  vazioImagem: {
    width: 80,
    height: 80,
    tintColor: '#bfbaba',
  },
  vazioTextoInfo: {
    marginTop: 8,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#bfbaba',
  },
  selecionadosContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    maxHeight: 120,
    overflow: 'hidden',
  },
  cardSelecionado: {
    borderWidth: 1.5,
    borderColor: '#3b5b82',
  },
  imagemSelecionado: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  fabricante: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
  },
  entrega: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
  },
  btnPersonalizar: {
    backgroundColor: '#f8f4c4',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  btnPersonalizarText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 12,
  },
  sideInfo: {
    alignItems: 'flex-end',
  },
  preco: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ff788a',
    marginBottom: 6,
  },
  quantidade: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtdBtn: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    width: 22,
    height: 22,
  },
  qtdValor: {
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  qtdTexto:{
    fontSize: 16,      
    fontWeight: 'bold',
    color: '#000',
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    alignSelf: 'flex-start',
    marginTop: 5,
    marginRight: 10, 
  },
  checkboxLabel: {
    fontSize: 16,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff788a",
    marginRight: 16,
  },
  btn: {
    backgroundColor: "#47667b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  featuredCard: {
    width: screenWidth * 0.4,
    aspectRatio: 3 / 4,
    borderRadius: 12,
    marginRight: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e1e1e1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'visible',
  },
  cardWrapper: {
    position: 'relative',
    marginRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  outsideTopIcon: {
    position: 'absolute',
    top: 10,
    left: -10,
    width: 100,
    height: 100,
    zIndex: 10,
    resizeMode: 'contain',
  },
  outsideBottomIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 100,
    height: 100,
    zIndex: 10,
    resizeMode: 'contain',
  },
});
