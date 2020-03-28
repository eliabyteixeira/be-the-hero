import React from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity, Linking, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import LogoImg from '../assets/logo.png';
import styles from './styles';


export default function Incidents() {

    const route = useRoute();

    const incident = route.params.incident; // parametro recebido da outra rota
    console.log();

    const navigation = useNavigation();
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso Nº "${incident.id}, ${incident.title}"`;

    function navigateTo() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.id} • ${incident.title}`,
            recipients: [incident.email],
            body: message,
        });
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=5598981230393&text=${message}`);
    }
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={LogoImg} />
                <TouchableOpacity style={styles.detailsButton} onPress={navigateTo}>
                    <Text style={styles.detailsButtonText}></Text>
                    <Feather name="arrow-left" size={28} color="#e02041"></Feather>
                </TouchableOpacity>
            </View>

            <FlatList
                data={[1]}
                style={[styles.incident, { paddingTop: 0 }]}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                    <View style={styles.incident}>

                        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

                        <Text style={styles.incidentProperty}>DETALHES:</Text>
                        <Text style={styles.incidentValue}>{incident.description}</Text>

                    </View>
                )}
            />

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}
{/* <Text style={styles.title}>Bem-vindo!</Text>
<Text style={styles.description}>Escolha um dos casos abaixo e salve um animalzinho!</Text> */}