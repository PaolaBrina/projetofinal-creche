import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { api } from '../../api/api';

export default function HorarioProfessor({ navigation, route }) {
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAluno, setSelectedAluno] = useState(null);
    const [noMaterials, setNoMaterials] = useState(false);
    const [nomeTurma, setNomeTurma] = useState('');

    const { codigo } = route.params || {};

    useEffect(() => {
        api.get(`/api/responsavel/${codigo}/horario`)
            .then((response) => {
                if (response.status === 200 && response.data.length > 0) {
                    setHorarios(response.data);
                    const turma = response.data[0]?.nome_turma || 'Não Disponível';
                    setNomeTurma(turma);
                    setNoMaterials(false);
    
                    // Console.log para verificar a base64 truncada em cada item
                    response.data.forEach((item) => {
                        if (item.foto) {
                            console.log('Base64 Foto (limitada):', item.foto.substring(0, 10)); // Exibe apenas os primeiros 10 caracteres da base64
                        } else {
                            console.log('Foto não disponível para este item');
                        }
                    });
    
                } else {
                    setNoMaterials(true);
                    setNomeTurma('Nome da Turma Não Disponível');
                }
                setLoading(false);
            })
            .catch(() => {
                setNoMaterials(true);
                setLoading(false);
            });
    }, [codigo]);
    


// Função para alternar o estado de expansão
const toggleAlunoDetails = (item) => {
    setSelectedAluno((prevAluno) => (prevAluno && prevAluno.codigo === item.codigo ? null : item));
};

return (
    <View style={styles.container}>
        {/* Barra superior */}
        <View style={styles.topBar}>
            <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeProfessor', { codigo })}>
                <AntDesign name="caretleft" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.topBarTxt}>Horários</Text>
        </View>

        {/* Verificações de carregamento e estado */}
        {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
        ) : noMaterials ? (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                     Horários não cadastrada para a turma {nomeTurma} ainda.
                </Text>
            </View>
        ) : (
            <FlatList
                data={horarios}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
    <TouchableOpacity onPress={() => toggleAlunoDetails(item)}>
        <View
            style={[
                styles.alunoItemContainer,
                selectedAluno?.codigo === item.codigo && styles.alunoItemExpanded, // Expande o item ao clicar
            ]}
        >
            <View style={styles.alunoRow}>
                <MaterialIcons name="person" size={24} color="black" />
                <Text style={styles.alunoName}>Horários da turma {item.nome_turma}</Text>
            </View>
            {selectedAluno?.codigo === item.codigo && (
                <View style={styles.alunoDetails}>
                    <View style={styles.imageContainer}>
                        {item.foto ? (
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${item.foto}` }}
                                style={styles.alunoImage}
                            />
                        ) : (
                            <Text style={styles.emptyText}>Sem foto disponível</Text>
                        )}
                    </View>
                </View>
            )}
        </View>
    </TouchableOpacity>
)}
            />
        )}

        {/* Código do responsável */}
        <View style={styles.codeContainer}>
            <Text style={styles.codeText}>Código do Responsável: {codigo}</Text>
        </View>
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
    btnseta: {
        width: 30,
        height: 30,
        justifyContent: 'center',
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
    listContainer: {
        marginTop: 20, // Afasta a lista do topo
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
    alunoItemExpanded: {
        padding: 15, // Aumenta o padding ao clicar
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
    imageContainer: {
        backgroundColor: '#D3D3D3',
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    alunoImage: {
        width: '90%',
        height: '90%',
        borderRadius: 10,
        resizeMode: 'contain',
    },
});
