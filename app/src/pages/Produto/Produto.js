import React from 'react';
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Image, Badge, Button } from "react-native-elements";

import api from "../../service/api";
import Moment from "moment";

export default function Produto({ route, navigation }) {
    const { _id, name, avatar_url, description, type, validity } = route.params;
    Moment.locale('pt');

    const excluir = async () => {
        await api.delete(`/products/${_id}`);
    };

    return(
        <ScrollView>
            <View style={styles.container}>
                {/* Foto */}
                <Image
                    style={styles.avatar}
                    source={{ uri: avatar_url }}
                />

                {/* Nome */}
                <Text style={styles.title}>
                    {name}
                </Text>

                {/* Tipo */}
                <Badge
                    status="success"
                    value={<Text style={{color: '#FFF'}}>{" " + type + " "} </Text>}
                />

                {/* Descrição */}
                <Text style={styles.descricao}>Descrição</Text>
                <Text style={{ marginBottom: 10 }}>{description}</Text>

                {/* Validade */}
                <Text style={styles.center}>
                    <Text style={{fontWeight: 'bold'}}>Validade:</Text> {Moment(validity).format('DD/MM/YYYY')}
                </Text>

                {/* Botão de Retirar (EXCLUIR) */}
                <Button
                    onPress={ () => {
                        Alert.alert(
                            'Alerta',
                            'Você tem certeza que quer excluir o produto?',
                            [
                                {
                                    text: 'Não'
                                },
                                {
                                    text: 'Sim',
                                    onPress: () => {
                                        excluir();
                                        navigation.goBack('Lista');
                                    }
                                }
                            ],
                            {
                                cancelable: true
                            }
                        );
                    }}
                    buttonStyle={styles.btnExcluir}
                    title="Retirar"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 50,
        paddingLeft: 50,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },

    descricao: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10
    },

    avatar: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 250,
        width: 300
    },

    btnExcluir: {
        backgroundColor: '#F32013',
        borderRadius: 10,
        height: 40,
        width: 200,
        marginTop: 10,
        marginBottom: 20
    },

    center: {
        textAlign: 'center'
    }
});
