import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { api } from '../../api/api';

export default function CalendarioProfessor({ navigation, route }) {
    const [calendarios, setCalendario] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noMaterials, setNoMaterials] = useState(false);
    const [openedItem, setOpenedItem] = useState(null);

    const { codigo } = route.params || {};

    useEffect(() => {
        const fetchCalendarios = async () => {
            setLoading(true);
            try {
                const response = await api.get('/calendario');
                console.log('Resposta completa:', response);
                console.log('Data da resposta:', response.data);  // Verifique a estrutura aqui
    
                if (Array.isArray(response.data.calendario)) {
                    setCalendario(response.data.calendario);  // Acesse 'calendario' em vez de 'calendarios'
                } else {
                    console.error('Formato inesperado dos dados:', response.data);
                    Alert.alert('Erro', 'Formato inesperado dos dados recebidos.');
                }
            } catch (error) {
                console.error('Erro ao buscar calendario:', error);
                Alert.alert('Erro', 'Erro ao buscar calendário, veja o console para mais detalhes.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchCalendarios();  // Chama a função ao carregar a tela
    }, []);

    const toggleItem = (index) => {
        setOpenedItem(openedItem === index ? null : index);
    };

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Calendário não cadastrado para a escola ainda.</Text>
        </View>
    );

    const renderItem = ({ item, index }) => (
        <View style={styles.alunoItemContainer}>
            <TouchableOpacity onPress={() => toggleItem(index)}>
                <View style={styles.alunoRow}>
                    <MaterialIcons name="calendar-today" size={24} color="black" />
                    <Text style={styles.alunoName}>{item.nomeCalendario || 'Calendário da escola'}</Text>
                </View>
            </TouchableOpacity>
            
            {openedItem === index && (
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
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity
                    style={styles.btnseta}
                    onPress={() => navigation.navigate('HomeProfessor', { codigo })}
                >
                    <AntDesign name="caretleft" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.topBarTxt}>Calendário</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : noMaterials ? (
                renderEmptyState()
            ) : (
                <FlatList
                    data={calendarios}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.listContainer}
                    renderItem={renderItem}
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
        fontSize: 20, // Aumentei a fonte do título
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    btnseta: {
        width: 30,
        height: 30,
        justifyContent: 'center',
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
        width: '100%', // A largura agora está em 100% da tela
    },
    alunoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    alunoName: {
        fontSize: 18, // Aumentei o tamanho da fonte
        fontWeight: 'bold',
        marginLeft: 10,
    },
    imageContainer: {
        backgroundColor: '#D3D3D3',
        width: '100%', // Largura 100% para ocupar toda a área do contêiner
        height: 300, // Aumentei a altura do contêiner da imagem
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    alunoImage: {
        width: '100%', // Aumentei a largura para ocupar todo o espaço disponível
        height: '100%',
        borderRadius: 10,
        resizeMode: 'contain',
    },
});

