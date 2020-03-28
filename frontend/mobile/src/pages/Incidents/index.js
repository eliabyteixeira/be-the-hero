import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LogoImg from '../assets/logo.png';
import styles from './styles';

import api from './../../services/api';

export default function Incidents() {

    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);    
    const [loading, setLoading] = useState(false);

    function navigateTo(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {

        if (loading) {
            return;
        }

        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);
        
        const resp = await api.get('incidents', { params: { page } });
        
        setLoading(false);

        setIncidents([...incidents, ...resp.data]); // acrescenta os dados retornados ao vetor que ja existe
        setTotal(resp.headers['x-total-count'])
        setPage(page + 1);
        setLoading(false);

    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={LogoImg} />
                <Text style={styles.headerText}>Total de <Text style={styles.headerTextBold}>{total} casos</Text>. </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve um animalzinho!</Text>

            {/* onEndReachedThreshold={0.2} percentual para que inicie o reload para o scroll infinito */}
            <FlatList
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>

                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name} ({incident.city} - {incident.uf})</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigateTo(incident)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041"></Feather>
                        </TouchableOpacity>

                    </View>
                )}
            />
        </View>
    );
}