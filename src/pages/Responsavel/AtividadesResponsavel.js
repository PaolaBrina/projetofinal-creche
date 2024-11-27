import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { api } from '../../api/api';

export default function AtividadesResponsavel({ navigation, route }) {
    const [atividades, setAtividades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAtividade, setSelectedAtividade] = useState(null);
    const [noActivities, setNoActivities] = useState(false);
    const [nomeTurma, setNomeTurma] = useState('');
    const [selectedTab, setSelectedTab] = useState('pendentes'); // Aba selecionada

    const { codigo } = route.params || {};

    const currentDate = new Date();

    useEffect(() => {
        api.get(`/api/responsavel/${codigo}/atividades`)
            .then((response) => {
                if (response.status === 200 && response.data.length > 0) {
                    setAtividades(response.data);
                    const turma = response.data[0]?.nome_turma || 'Não Disponível';
                    setNomeTurma(turma);
                    setNoActivities(false);
                } else {
                    setNoActivities(true);
                    setNomeTurma('Nome da Turma Não Disponível');
                }
                setLoading(false);
            })
            .catch(() => {
                setNoActivities(true);
                setLoading(false);
            });
    }, [codigo]);

    const toggleAtividadeDetails = (item) => {
        setSelectedAtividade((prevAtividade) =>
            prevAtividade && prevAtividade.codturma === item.codturma ? null : item
        );
    };

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const filteredAtividades = atividades.filter((item) => {
        const atividadeDate = new Date(item.datahora);
        return selectedTab === 'pendentes'
            ? atividadeDate >= currentDate
            : atividadeDate < currentDate;
    });

    return (
        <View style={styles.container}>
            {/* Barra superior */}
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeResponsavel', { codigo })}>
                    <AntDesign name="caretleft" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.topBarTxt}>Lista de Atividades</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'pendentes' && styles.activeTab]}
                    onPress={() => handleTabChange('pendentes')}
                >
                    <Text style={[styles.tabText, selectedTab === 'pendentes' && styles.activeTabText]}>Pendentes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'feitas' && styles.activeTab]}
                    onPress={() => handleTabChange('feitas')}
                >
                    <Text style={[styles.tabText, selectedTab === 'feitas' && styles.activeTabText]}>Feitas</Text>
                </TouchableOpacity>
            </View>

            {/* Verificações de carregamento e estado */}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : noActivities ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        Lista de atividades não cadastrada para a turma {nomeTurma} ainda.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filteredAtividades}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => toggleAtividadeDetails(item)}>
                            <View
                                style={[
                                    styles.atividadeItemContainer,
                                    selectedAtividade?.codturma === item.codturma && styles.atividadeItemExpanded,
                                ]}
                            >
                                <View style={styles.atividadeRow}>
                                    <MaterialIcons name="event" size={24} color="black" />
                                    <Text style={styles.atividadeName}>
                                        Atividades da turma {item.nome_turma}
                                    </Text>
                                </View>
                                {selectedAtividade?.codturma === item.codturma && (
                                    <View style={styles.atividadeDetails}>
                                        <Text style={styles.atividadeDate}>
                                            {item.datahora} - {item.descricao}
                                        </Text>
                                        <View style={styles.imageContainer}>
                                            {item.foto ? (
                                                <Image
                                                    source={{ uri: `data:image/jpeg;base64,${item.foto}` }}
                                                    style={styles.atividadeImage}
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
    atividadeItemContainer: {
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
    atividadeItemExpanded: {
        padding: 15, // Aumenta o padding ao clicar
    },
    atividadeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    atividadeName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    atividadeDetails: {
        marginTop: 10,
    },
    atividadeDate: {
        fontSize: 14,
        marginBottom: 10,
        color: '#555',
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
    atividadeImage: {
        width: '90%',
        height: '90%',
        borderRadius: 10,
        resizeMode: 'contain',
    },
    tabsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
        height: 50,
        backgroundColor: '#ffffff',
        elevation: 4, // Sombra para destacar
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 3,
        borderBottomColor: 'transparent', // Transição suave entre Tabs
    },
    activeTab: {
        backgroundColor: '#ffffff', // Fundo branco para a aba ativa
        borderBottomColor: '#3b5998', // Destaque com uma linha
    },
    tabText: {
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#3b5998',
        fontWeight: 'bold',
    },
});
