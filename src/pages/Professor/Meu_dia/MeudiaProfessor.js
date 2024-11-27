import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Button, TextInput, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { api } from '../../../api/api';

const RadioButtonGroup = ({ title, options, selectedOption, setSelectedOption, horizontal = false }) => {
    return (
        <View style={[styles.radioGroupContainer, horizontal && { flexDirection: 'row', alignItems: 'center' }]}>
            <Text style={styles.radioTitle}>{title}</Text>
            <View style={[horizontal && { flexDirection: 'row' }]}>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        style={[styles.radioOption, horizontal && { flexDirection: 'column', alignItems: 'center', marginHorizontal: 10 }]}
                        onPress={() => setSelectedOption(option.value)}
                    >
                        <View style={styles.radioCircle}>
                            {selectedOption === option.value && <View style={styles.radioSelected} />}
                        </View>
                        <Text style={styles.radioLabel}>{option.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default function MeudiaProfessor({ navigation, route }) {
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(true);
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
                    setAlunos(response.data.map((aluno) => ({
                        ...aluno,
                        formData: {
                            saude: 'Bem',
                            medicacao: 'Nenhum',
                            recados: '',
                            xixi: '',
                            coco: '',
                            sono: '',
                            cafemanha: '',
                            almoco: ''
                        }
                    })));
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
          recado: item.formData.recados || '',
          xixi: item.formData.xixi || '',
          coco: item.formData.coco || '',
          sono: item.formData.sono || '',
          saude: item.formData.saude || '',
          medicacao: item.formData.medicacao || '',
          cafemanha: item.formData.cafemanha || '',
          almoco: item.formData.almoco || '',
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
  


     const handleOptionChange = (alunoCodigo, field, value) => {
        setAlunos((prevAlunos) =>
            prevAlunos.map((aluno) =>
                aluno.codigo === alunoCodigo ? { ...aluno, formData: { ...aluno.formData, [field]: value } } : aluno
            )
        );
    }; 

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeProfessor', { codigo })}>
                    <AntDesign name="caretleft" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.topBarTxt}>Meu Dia</Text>
            </View>

            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        styles.activeTab,
                        { borderBottomColor: '#283673', borderBottomWidth: 3 }, // Aba ativa
                    ]}
                    onPress={() => navigation.navigate('MeudiaProfessor', { codigo })}
                >
                    <Text style={[styles.tabText, { color: '#283673', fontWeight: 'bold' }]}>Cadastro</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        { borderBottomColor: '#f0f0f0', borderBottomWidth: 3 }, // Aba inativa
                    ]}
                    onPress={() => navigation.navigate('MeudiaProfessorBuscar', { codigo })}
                >
                    <Text style={[styles.tabText, { color: '#aaa' }]}>Procurar</Text>
                </TouchableOpacity>
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
                                <Text style={styles.inputLabel}>Recado</Text>
                                <TextInput
                                    style={styles.input}
                                    value={item.formData.recados}
                                    onChangeText={(text) => handleOptionChange(item.codigo, 'recados', text)}
                                    placeholder="Recado"
                                />

                                <RadioButtonGroup
                                    title="Xixi"
                                    options={[
                                        { label: 'Sim', value: 'sim' },
                                        { label: 'Não', value: 'nao' },
                                    ]}
                                    selectedOption={item.formData.xixi}
                                    setSelectedOption={(value) => handleOptionChange(item.codigo, 'xixi', value)}
                                    horizontal={true} // Alinhando as opções horizontalmente
                                />

                                <RadioButtonGroup
                                    title="Cocô"
                                    options={[
                                        { label: 'Sim', value: 'sim' },
                                        { label: 'Não', value: 'nao' },
                                    ]}
                                    selectedOption={item.formData.coco}
                                    setSelectedOption={(value) => handleOptionChange(item.codigo, 'coco', value)}
                                    horizontal={true} // Alinhando as opções horizontalmente
                                />

                                <RadioButtonGroup
                                    title="Sono"
                                    options={[
                                        { label: 'Sim', value: 'sim' },
                                        { label: 'Não', value: 'nao' },
                                    ]}
                                    selectedOption={item.formData.sono}
                                    setSelectedOption={(value) => handleOptionChange(item.codigo, 'sono', value)}
                                    horizontal={true} // Alinhando as opções horizontalmente
                                />

                                <View style={styles.horizontalGroup}>
                                    <RadioButtonGroup
                                        title="Café da Manhã"
                                        options={[
                                            { label: '😋 Comeu Bem', value: 'comeu bem' },
                                            { label: '🍴 Comeu Pouco', value: 'comeu pouco' },
                                            { label: '🍴 Não Comeu', value: 'nao comeu' },
                                        ]}
                                        selectedOption={item.formData.cafemanha}
                                        setSelectedOption={(value) => handleOptionChange(item.codigo, 'cafemanha', value)}
                                    />
                                    <RadioButtonGroup
                                        title="Almoço"
                                        options={[
                                            { label: '😋 Comeu Bem', value: 'comeu bem' },
                                            { label: '🍴 Comeu Pouco', value: 'comeu pouco' },
                                            { label: '🍴 Não Comeu', value: 'nao comeu' },
                                        ]}
                                        selectedOption={item.formData.almoco}
                                        setSelectedOption={(value) => handleOptionChange(item.codigo, 'almoco', value)}
                                    />
                                </View>

                                <Text style={styles.inputLabel}>Saúde</Text>
                                <TextInput
                                    style={styles.input}
                                    value={item.formData.saude}
                                    onChangeText={(text) => handleOptionChange(item.codigo, 'saude', text)}
                                    placeholder="Saúde"
                                />

                                <Text style={styles.inputLabel}>Medicação</Text>
                                <TextInput
                                    style={styles.input}
                                    value={item.formData.medicacao}
                                    onChangeText={(text) => handleOptionChange(item.codigo, 'medicacao', text)}
                                    placeholder="Medicação"
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
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        paddingTop: 50,
        backgroundColor: '#283673',
    },
    topBarTxt: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    btnseta: {
        width: 30,
        height: 30,
    },
    tabsContainer: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#ffffff',
        elevation: 4,
        marginHorizontal: 10,
        borderRadius: 8,
        marginTop: 20, // Espaço entre a TopBar e os botões
        marginBottom: 15, // Espaço entre os botões e o restante do conteúdo
      },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        paddingVertical: 10,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
    },
    activeTab: {
        backgroundColor: '#fff',
        borderBottomColor: '#283673',
    },
    listContainer: {
        padding: 20,
    },
    alunoItemContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: 15,
        padding: 15,
    },
    alunoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    alunoName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    horizontalGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    radioGroupContainer: {
      marginBottom: 20,
    },
    radioTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,  // Adicionando espaço entre as opções
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
    // Estilo para as opções de "Café da Manhã" e "Almoço" ficarem com mais espaçamento
    horizontalGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Mantém os itens alinhados e espaçados
        marginBottom: 20, // Adiciona mais espaço entre as linhas
    },
    sonoContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Garante que "Sono" estará centralizado
        marginBottom: 15,
    },
});