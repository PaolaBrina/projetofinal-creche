import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Button, TextInput, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { api } from '../../../api/api'; // Importa a instância do Axios

const RadioButtonGroup = ({ title, options, selectedOption, setSelectedOption }) => {
    return (
        <View style={styles.radioGroupContainer}>
            <Text style={styles.radioTitle}>{title}</Text>
            {options.map((option) => (
                <TouchableOpacity
                    key={option.value}
                    style={styles.radioOption}
                    onPress={() => setSelectedOption(option.value)}
                >
                    <View style={styles.radioCircle}>
                        {selectedOption === option.value && <View style={styles.radioSelected} />}
                    </View>
                    <Text style={styles.radioLabel}>{option.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default function MeudiaProfessor({ navigation, route }) {
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        saude: 'Bem',
        medicacao: 'Nenhum',
        recados: '',
    });
    const [noAlunos, setNoAlunos] = useState(false);

    const { codigo } = route.params || {};

    useEffect(() => {
        if (!codigo) {
            console.error("Código do professor não fornecido");
            return;
        }

        api.get(`/api/professor/${codigo}/alunos`)
            .then((response) => {
                if (response.status === 200 && response.data.length > 0) {
                    setAlunos(response.data);
                    setNoAlunos(false);
                } else {
                    setNoAlunos(true);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar alunos: ", error);
                setNoAlunos(true);
                setLoading(false);
            });
    }, [codigo]);

    const handleSave = (item) => {
      const datahora = '2024-11-26T10:30:00Z'; // Data e hora fixas para testar o problema
  
      const dataCompleta = {
          codaluno: item.codigo,
          codturma: item.codturma,
          codprofessor: codigo,
          datahora, // Usando datahora fixa
          recado: formData.recados || '',
          xixi: formData.xixi || '',
          coco: formData.coco || '',
          sono: formData.sono || '',
          saude: formData.saude || '',
          medicacao: formData.medicacao || '',
          cafemanha: formData.cafemanha || '',
          almoco: formData.almoco || '',
      };
  
      // Printar as informações que estão sendo enviadas
      console.log('Informações enviadas para o servidor:', dataCompleta);
  
      api.post(`/meudiamanha`, dataCompleta)
          .then((response) => {
            // Verifica se o status é 200 ou 201
            if (response.status === 200 || response.status === 201) {
                alert(`Meu Dia cadastrado com sucesso para o aluno ${item.nome}!`);
            } else {
                alert(`Erro ao cadastrar o Meu Dia para o aluno ${item.nome}. Status: ${response.status}`);
            }
        })
          .catch((error) => {
              if (error.response) {
                  console.error("Erro no servidor:", error.response.data);
                  console.error("Status HTTP:", error.response.status);
              } else {
                  console.error("Erro inesperado:", error.message);
              }
              alert(`Erro ao cadastrar o Meu Dia para o aluno ${item.nome}.`);
          });
        };
  

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeProfessor', { codigo })}>
                    <AntDesign name="caretleft" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.topBarTxt}>Lista de Alunos</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : noAlunos ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Não há alunos cadastrados para suas turmas.</Text>
                </View>
            ) : (
                <FlatList
                    data={alunos}
                    keyExtractor={(item) => item.codigo.toString()}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => (
                        <View style={styles.alunoItemContainer}>
                            <View style={styles.alunoRow}>
                                <MaterialIcons name="person" size={24} color="black" />
                                <Text style={styles.alunoName}>{item.nome}</Text>
                                <Text style={styles.dateTime}>{new Date().toLocaleString()}</Text>
                            </View>

                            <View style={styles.alunoDetails}>
                                <RadioButtonGroup
                                    title="Café da Manhã"
                                    options={[
                                        { label: '😋 Comeu Bem', value: 'comeu_bem' },
                                        { label: '🍴 Comeu', value: 'comeu' },
                                        { label: '🍴 Comeu Pouco', value: 'comeu_pouco' },
                                    ]}
                                    selectedOption={formData.cafemanha}
                                    setSelectedOption={(value) => setFormData({ ...formData, cafemanha: value })}
                                />

                                <RadioButtonGroup
                                    title="Almoço"
                                    options={[
                                        { label: '😋 Comeu Bem', value: 'comeu_bem' },
                                        { label: '🍴 Comeu', value: 'comeu' },
                                        { label: '🍴 Comeu Pouco', value: 'comeu_pouco' },
                                    ]}
                                    selectedOption={formData.almoco}
                                    setSelectedOption={(value) => setFormData({ ...formData, almoco: value })}
                                />

                                <RadioButtonGroup
                                    title="Xixi"
                                    options={[
                                        { label: 'Sim', value: 'sim' },
                                        { label: 'Não', value: 'nao' },
                                    ]}
                                    selectedOption={formData.xixi}
                                    setSelectedOption={(value) => setFormData({ ...formData, xixi: value })}
                                />

                                <RadioButtonGroup
                                    title="Cocô"
                                    options={[
                                        { label: 'Sim', value: 'sim' },
                                        { label: 'Não', value: 'nao' },
                                    ]}
                                    selectedOption={formData.coco}
                                    setSelectedOption={(value) => setFormData({ ...formData, coco: value })}
                                />

                                <RadioButtonGroup
                                    title="Sono"
                                    options={[
                                        { label: 'Sim', value: 'sim' },
                                        { label: 'Não', value: 'nao' },
                                    ]}
                                    selectedOption={formData.sono}
                                    setSelectedOption={(value) => setFormData({ ...formData, sono: value })}
                                />

                                <Text style={styles.inputLabel}>Saúde</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.saude}
                                    onChangeText={(text) => setFormData({ ...formData, saude: text })}
                                    placeholder="Saúde"
                                />

                                <Text style={styles.inputLabel}>Medicação</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.medicacao}
                                    onChangeText={(text) => setFormData({ ...formData, medicacao: text })}
                                    placeholder="Medicação"
                                />

                                <Text style={styles.inputLabel}>Recados</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.recados}
                                    onChangeText={(text) => setFormData({ ...formData, recados: text })}
                                    placeholder="Recados"
                                />

                                <Button title="Salvar" onPress={() => handleSave(item)} />
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',
        alignItems: 'center',
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
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
    btnseta: {
        width: 30,
        height: 30,
        justifyContent: 'center',
    },
    listContainer: {
        marginTop: 20,
    },
    alunoItemContainer: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    alunoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    alunoName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    alunoDetails: {
        marginTop: 10,
    },
    detailTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    radioGroupContainer: {
        marginBottom: 20,
    },
    radioTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    radioSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#000',
    },
    radioLabel: {
        fontSize: 14,
    },
    codeContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    codeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginHorizontal: 20,
    },
});
