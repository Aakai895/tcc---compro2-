import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,
  SafeAreaView, ScrollView, Dimensions, ActivityIndicator, TextInput
} from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

export default function CarrinhoScreen({ navigation }) {
  const [search, setSearch] = useState('');

  const featuredItems = [
    {
      id: 1,
      title: 'Prótese Transtibial',
      sold: '3.000 vendidas',
      price: '7.000',
      image: require('../../assets/Proteses/DestaqueProtese1.jpg.jpg'),
    },
    {
      id: 2,
      title: 'Prótese Mecânica',
      sold: '2.810 vendidas',
      price: '8.235',
      image: require('../../assets/Proteses/DestaquePrptese2.jpg.jpg'),
    },
    {
      id: 3,
      title: 'Prótese Biônica',
      sold: '1.257 vendidas',
      price: '12.500',
      image: require('../../assets/Proteses/DestaqueProtese3.jpg.jpg'),
    },
  ];

  const [produtos, setProdutos] = useState([]);
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
      <SafeAreaView style={[styles.containerP, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#3b5b82" />
      </SafeAreaView>
    );
  }

  const fila1 = produtos.slice(0, Math.ceil(produtos.length / 3));
  const fila2 = produtos.slice(Math.ceil(produtos.length / 3), Math.ceil((produtos.length * 2) / 3));
  const fila3 = produtos.slice(Math.ceil((produtos.length * 2) / 3));

  return (
    <SafeAreaView style={styles.containerP}>
      <ScrollView style={styles.homeContainer}>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.filterButton} 
            onPress={() => navigation.navigate('FiltroLoja')}
          >
            <Image source={require('../../assets/icones/FiltroIcon.png')}
              style={{ width: 40, height: 40, tintColor: '#fff' }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={styles.searchBox}>
            <TextInput
              style={styles.searchInput}
              placeholder="O que você procura?..."
              placeholderTextColor="#555"
              value={search}
              onChangeText={setSearch}
            />

            <TouchableOpacity style={styles.searchButton}>
              <Image source={require('../../assets/icones/LupaIcon.png')}
                style={{ width: 45, height: 45, }} 
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.titleDestaque}>
          Em Destaque
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {featuredItems.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.featuredCard,
                index === 1 && { marginTop: 60, height: 210, width: 150 },
              ]}
            >
              <Image source={item.image} 
                style={styles.featuredImage} 
                resizeMode="cover" 
              />
              <LinearGradient
                colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0.2)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.overlay}
              />
              <View style={styles.recommendedTag}>
                <Text style={styles.recommendedText}>
                  Recomendado
                </Text>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSub}>{item.sold}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.cardCurrency}>R$</Text>
                  <Text style={styles.cardPrice}>{item.price}</Text>
                </View>
              </View>

              <View style={styles.cardBottom}>
                <Image source={require('../../assets/icones/IconeCard.jpg')}
                  style={styles.cardIcon}
                  resizeMode="contain"
                />
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>
                    Visualizar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.title}>
            Produtos Diversos
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.produtosContainerP}>
            {[fila1, fila2, fila3].map((fila, index) => (
              <ScrollView
                key={`fila-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScrollP}
              >
                {fila.map((item) => {
                  const imagemUri = item.imagem?.startsWith('http')
                    ? item.imagem
                    : 'https://picsum.photos/200/300';
                  const valor = item.informacoesCompraGarantia?.valor ?? 0;
                  const valorFormatado = valor.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  });
                  const vendidos = item.quantidadeVendida ?? 0;

                  return (
                    <View key={`item-${item.id}`} style={styles.produtoCardWrapperP}>
                      <Image source={require('../../assets/icones/BordaCardCima.png')}
                        style={styles.outsideTopIconP}
                      />
                      <TouchableOpacity
                        style={styles.produtoCardP}
                        onPress={() => {
                          navigation.navigate('DetalhesProduto', { produtoId: item.id });
                        }}
                        activeOpacity={0.85}
                      >
                        <Image style={styles.featuredImageP} 
                          source={{ uri: imagemUri }}
                        />
                        <View style={styles.produtoCardContentP}>
                          <Text style={styles.produtoTituloP}>{item.tipo}</Text>
                          <View style={styles.priceSoldContainerP}>
                            <Text style={styles.produtoPrecoP}>R${valorFormatado}</Text>
                            <Text style={styles.produtoVendidosP}>{vendidos} vendidos</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      
                      <Image source={require('../../assets/icones/BordaCardBaixo.png')}
                        style={styles.outsideBottomIconP}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerP: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 25,
  },
  filterButton: {
    backgroundColor: '#6d8b89',
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    marginRight: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',        
    borderRadius: 14,
    borderWidth: 2,                 
    borderColor: '#ccc',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#fff',
    width: 40,                      
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,                 
    marginLeft: 8,
  },
  produtosContainerP: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  horizontalScrollP: {
    paddingLeft: 10,
  },
  featuredImageP: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    resizeMode: 'cover',
  },
  produtoCardContentP: {
    padding: 10,
  },
  produtoTituloP: {
    fontWeight: 'bold',
    fontSize: screenWidth * 0.035,
    marginBottom: 4,
    color: '#333',
  },
  priceSoldContainerP: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  produtoPrecoP: {
    fontSize: screenWidth * 0.035,
    fontWeight: 'bold',
    color: '#004472',
  },
  produtoVendidosP: {
    fontSize: screenWidth * 0.03,
  },
  outsideTopIconP: {
    position: 'absolute',
    top: 10,
    left: -10,
    width: 100,
    height: 100,
    zIndex: 10,
    resizeMode: 'contain',
  },
  outsideBottomIconP: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 100,
    height: 100,
    zIndex: 10,
    resizeMode: 'contain',
  },
  produtoCardP: {
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
  produtoCardWrapperP: {
    position: 'relative',
    marginRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  homeContainer: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 22,
  },
  titleDestaque: {
    fontSize: 35,
    paddingBottom: 15,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  featuredCard: {
    width: 160,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 15,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '100%',
  },
  recommendedTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 5,
  },
  recommendedText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardContent: {
    position: 'absolute',
    left: 10,
    top: 50,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
  },
  cardSub: {
    color: '#ccc',
    fontSize: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  cardCurrency: {
    color: '#fff',
    fontSize: 18,
    marginTop: 2,
    marginRight: 2,
    alignSelf: 'flex-start',
  },
  cardPrice: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardBottom: {
    position: 'absolute',
    bottom: 6,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardIcon: {
    width: 34,
    height: 34,
  },
  viewButton: {
    backgroundColor: '#6d8b89',
    borderRadius: 9,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
