import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { api } from '../../api/api';

export default function FotosResponsavel({ navigation, route }) {
    const [atividades, setAtividades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noAtividades, setNoAtividades] = useState(false);

    const { codigo } = route.params || {};

    useEffect(() => {
        api.get(`/api/responsavel/${codigo}/fotos`)
            .then((response) => {
                if (response.status === 200 && response.data.length > 0) {
                    setAtividades(response.data);
                    setNoAtividades(false);
                } else {
                    setNoAtividades(true);
                }
                setLoading(false);
            })
            .catch(() => {
                setNoAtividades(true);
                setLoading(false);
            });
    }, [codigo]);

    return (
        <View style={styles.container}>
            {/* Barra superior */}
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeResponsavel', { codigo })}>
                    <AntDesign name="caretleft" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.topBarTxt}>Fotos das Atividades</Text>
            </View>

            {/* Verificações de carregamento e estado */}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : noAtividades ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>
                        Não há atividades registradas para este responsável ainda.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={atividades}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => (
                        <View style={styles.atividadeContainer}>
                            <Text style={styles.turmaText}>Turma: {item.codturma}</Text>
                            <Text style={styles.descricaoText}>Descrição: {item.descricao}</Text>
                            <Text style={styles.dataText}>Data: {item.datahora}</Text>
                            <View style={styles.imageContainer}>
                                {item.foto ? (
                                    <Image
                                        source={{ uri: `data:image/jpeg;base64,${item.foto}` }}
                                        style={styles.image}
                                    />
                                ) : (
                                    <Text style={styles.emptyText}>Sem foto disponível</Text>
                                )}
                            </View>
                        </View>
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
        paddingHorizontal: 10,
    },
    atividadeContainer: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    turmaText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    descricaoText: {
        fontSize: 14,
        marginVertical: 5,
    },
    dataText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    imageContainer: {
        backgroundColor: '#D3D3D3',
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        resizeMode: 'contain',
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
});
