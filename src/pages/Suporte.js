import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Suporte({ navigation }) {
  const handleVoltar = () => {
    navigation.goBack();
  };

  const handleWhatsApp = () => {
    const phoneNumber = '5511987654321'; // Número com código do país e DDD
    const message = 'Olá, gostaria de falar sobre...'; // Mensagem inicial
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          alert('WhatsApp não está instalado no dispositivo.');
        }
      })
      .catch((err) => console.error('Erro ao abrir WhatsApp', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
                <TouchableOpacity
                    style={styles.btnseta}
                    onPress={handleVoltar}
                >
                    <AntDesign name="caretleft" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.topBarTxt}>Suporte</Text>
            </View>

      <View style={styles.content}>
        <Text style={styles.title}>Precisa de ajuda?</Text>
        <Text style={styles.text}>
          Entre em contato com a escola para dúvidas ou suporte:
        </Text>
        <Text style={styles.contact}>
          📞 Telefone: (11) 1234-5678
        </Text>

        <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name="whatsapp" size={24} color="black" style={{ marginRight: 8 }} />
            <Text style={styles.whatsappText}>Falar no WhatsApp</Text>
          </View>
        </TouchableOpacity>


        <Text style={styles.text}>
          Estamos disponíveis de segunda a sexta, das 7:30h às 18h.
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#283673',
  },
  topBarTxt: {
    color: '#fff',
    fontSize: 20, // Aumentei a fonte do título
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#283673',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  contact: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  whatsappButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  whatsappText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
