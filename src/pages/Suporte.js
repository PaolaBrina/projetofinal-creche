import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

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
        <Text style={styles.topBarText}>Suporte</Text>
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
          <Text style={styles.whatsappText}>📱 Falar no WhatsApp</Text>
        </TouchableOpacity>

        <Text style={styles.text}>
          Estamos disponíveis de segunda a sexta, das 8h às 18h.
        </Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={handleVoltar}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
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
    width: '100%',
    padding: 20,
    backgroundColor: '#283673',
    alignItems: 'center',
  },
  topBarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
  backButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#283673',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
