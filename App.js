import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import { MotiImage } from 'moti';
import Wifi from './assets/Wifi.png';

const App = () => {
  // Declaração dos estados do componente App
  const [informacoesRede, setInformacoesRede] = useState('');
  const [isModalVisivel, setIsModalVisivel] = useState(false);

  // Função que é executada quando o botão é pressionado
  const obterInformacoesRede = () => {
    // Para obter o estado da rede uma vez
    NetInfo.fetch().then((state) => {
      setIsModalVisivel(true);
      setInformacoesRede(
        `${state.type === 'wifi' ? '📶' : state.type === 'cellular' ? '📱' : ''} Tipo de conexão: ${state.type}  \n\n` +
        `${state.isConnected ? '🟢' : '🔴'} Está conectada?: ${state.isConnected ? 'Sim' : 'Não'} \n\n` +
        ` ${state.type === 'wifi' ? '🌐' : state.type === 'cellular' ? '📶' : ''} Endereço de IP: ${state.details.ipAddress}\n\n`
      );
    });
  };

  //Não conseguimos fazer a imagem funcionar após clicar no botão "Mais detalhes da rede"
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MotiImage
          source={Wifi}
          from={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            type: 'timing',
            duration: 2000,
            loop: true,
          }}
        />
        <Text style={styles.header}>
          React Native NetInfo
          {'\n'}
          Obtendo informações do NetInfo
        </Text>
        <TouchableOpacity style={styles.botao} onPress={obterInformacoesRede}>
          <Text style={styles.corTexto}>Mais detalhes da rede</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModalVisivel}
        onRequestClose={() => setIsModalVisivel(false)}
        animationType="slide"
      >
        <View style={[styles.modalContainer, { borderColor: '#00b4cc', borderWidth: 2 }]}>
          <Text style={[styles.modalTitulo, { color: '#0f4571' }]}>Informação da internet</Text>
          <Text style={[styles.modalTexto, { color: '#386dbd' }]}>{informacoesRede}</Text>
          <TouchableOpacity style={styles.botao} onPress={() => setIsModalVisivel(false)}>
            <Text style={styles.corTexto}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Estilos dos componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00b4cc',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 20,
  },
  botao: {
    backgroundColor: '#343838',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  corTexto: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  modalTexto: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default App;