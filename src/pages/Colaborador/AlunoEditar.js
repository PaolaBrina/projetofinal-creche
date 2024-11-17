import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image, Alert, Modal, Platform } from 'react-native';
import { api } from '../../api/api';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import { DatePickerModal, registerTranslation, pt } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { format } from 'date-fns';

registerTranslation('pt', pt);

const RadioButton = ({ selectedOption, setSelectedOption }) => {
  const options = [
    { label: 'Feminino', value: 'feminino' },
    { label: 'Masculino', value: 'masculino' },
    { label: 'Outro', value: 'outro' },
  ];

  return (
    <View>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => setSelectedOption(option.value)}
          style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: '#000',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}
          >
            {selectedOption === option.value && (
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  backgroundColor: '#000',
                }}
              />
            )}
          </View>
          <Text>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function AlunoEditar({ closeModal, codigoAluno }) {
  const [newcodresponsavel, setNewcodresponsavel] = useState('');
  const [newnome, setNewnome] = useState('');
  const [newdatanascimento, setNewdatanascimento] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [newsexo, setNewsexo] = useState('');
  const [newendereco, setNewendereco] = useState('');
  const [newfoto, setNewfoto] = useState('');  // Atualiza estado da foto
  const [base64Image, setBase64Image] = useState('');  // Para enviar base64
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const validateFields = () => {
    return newcodresponsavel && newnome && newdatanascimento && newsexo && newendereco && base64Image;
  };

  const loadAlunoData = async (codigoAluno) => {
    try {
      const response = await api.get(`/aluno/${codigoAluno}`);
      const aluno = response.data;

      if (!aluno) {
        setFeedbackMessage('Aluno não encontrado.');
        return;
      }

      setNewcodresponsavel(aluno.codresponsavel);
      setNewnome(aluno.nome);
      setNewdatanascimento(aluno.datanascimento ? new Date(aluno.datanascimento) : undefined);
      setNewsexo(aluno.sexo);
      setNewendereco(aluno.endereco);
      setNewfoto(aluno.foto); // Atualiza foto do aluno
      setBase64Image(aluno.foto); // Se necessário para envio
      setIsEditing(true);
    } catch (error) {
      console.error('Erro ao carregar os dados do aluno:', error);
      setFeedbackMessage('Erro ao carregar os dados do aluno.');
    }
  };

  useEffect(() => {
    if (codigoAluno) {
      loadAlunoData(codigoAluno);
    }
  }, [codigoAluno]);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão para acessar a galeria é necessária!');
      }
    } else {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão para acessar a câmera é necessária!');
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Para usar base64
    });

    if (!result.canceled) {
      setNewfoto(result.assets[0].uri); // Atualiza o URI da foto
      setBase64Image(result.assets[0].base64); // Atualiza o base64 para envio ao backend
    } else {
      alert('Nenhuma imagem selecionada');
    }
  };

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setNewdatanascimento(params.date);
    },
    [setOpen, setNewdatanascimento]
  );

  const updateAluno = async () => {
    if (!codigoAluno) {
      setFeedbackMessage('Codigo do aluno não encontrado.');
      console.log(codigoAluno);
      return;
    }

    if (!validateFields()) {
      setFeedbackMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const formattedDate = format(new Date(newdatanascimento), 'yyyy-MM-dd');
      const updatedItem = {
        codresponsavel: newcodresponsavel,
        nome: newnome,
        datanascimento: formattedDate,
        sexo: newsexo,
        endereco: newendereco,
        foto: base64Image, // Usando base64 para envio
      };

      await api.put(`/aluno/${codigoAluno}`, updatedItem);
      Alert.alert('Atualização', 'Aluno atualizado com sucesso!', [
        {
          text: 'OK',
          onPress: () => closeModal('Aluno atualizado com sucesso!'),
        },
      ]);
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      setFeedbackMessage('Erro ao atualizar o aluno. Tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.form}>
        {feedbackMessage !== '' && (
          <Text style={styles.feedbackText}>{feedbackMessage}</Text>
        )}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Codigo Responsavel:</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite o codigo do responsavel'
            value={newcodresponsavel}
            onChangeText={setNewcodresponsavel}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite o nome'
            value={newnome}
            onChangeText={setNewnome}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Data de Nascimento:</Text>
          <SafeAreaProvider>
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
              <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                <Text> Escolher data de nascimento </Text>
              </Button>
              <DatePickerModal
                locale="pt"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={newdatanascimento}
                onConfirm={onConfirmSingle}
              />
            </View>
          </SafeAreaProvider>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sexo:</Text>
          <RadioButton selectedOption={newsexo} setSelectedOption={setNewsexo} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Endereco:</Text>
          <TextInput
            style={styles.input}
            placeholder='Digite o endereco'
            value={newendereco}
            onChangeText={setNewendereco}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Foto:</Text>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            <Text style={styles.imagePickerText}>Escolher Foto</Text>
          </TouchableOpacity>
          {newfoto && <Image source={{ uri: newfoto }} style={styles.image} />}
        </View>

        <TouchableOpacity
          style={styles.btnLogin}
          onPress={updateAluno}
          disabled={!validateFields()}
        >
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    padding: 16,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputGroup: {
    marginVertical: 10,
    width: '80%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
  },
  feedbackText: {
    color: 'red',
    marginBottom: 10,
  },
  btnLogin: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePicker: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  imagePickerText: {
    fontSize: 16,
    color: '#333',
  },
  image: {
    marginTop: 20,
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
  },
});
