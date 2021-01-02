import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

export default function Notificacao(props) {
    const [show, setShow] = useState(true);
    const produtos = props.produtos;

    useEffect(() => {
        naoPossuiProdutosVencidos();
    }, [produtos]);

    const naoPossuiProdutosVencidos = () => {
        if(Array.isArray(produtos) && produtos.length === 0) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    const excluir = async (_id) => {
        await api.delete(`/products/${_id}`);
    };

    const criaCards = (p) => {
        return(
            <Card 
                key={p._id} 
                style={styles.card}
            >
                <Card.Title>{p.name}</Card.Title>
                <Card.Divider />
                <Card.Image 
                    style={{ height: 200 }}
                    source={{ uri: p.avatar_url }} 
                />
                <Text style={styles.produtoVencendo}>
                    Produto Vencendo!
                </Text>
                <Button 
                    onPress={() => {
                        Alert.alert(
                            'Alerta',
                            'Você tem certeza que quer tirar o produto?',
                            [
                                {
                                    text: 'Não'
                                },
                                {
                                    text: 'Sim',
                                    onPress: () => {
                                        excluir(p._id);
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
            </Card>
        );
    }

    return (
        <View>
            <Text style={styles.texto}>Notificações</Text>
            <View style={styles.fundo}>
                { show ? (
                    <Text style={styles.semNotificacao}>
                        Nenhum produto esta vencendo!
                    </Text>
                ) : (
                    <ScrollView style={styles.notificacoes}>
                        {criaCards(produtos)}
                    </ScrollView>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    texto: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 5,
    },

    produtoVencendo: {
        color: 'red',
        textAlign: 'center',
    },

    semNotificacao: {
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#000',
        marginTop: 150
    },

    notificacoes: {
        height: 300
    },

    card: {
        borderRadius: 20,
        backgroundColor: 'blue'
    },

    fundo: {
        backgroundColor: '#F4F4F4',
        height: 350,
        marginTop: 7,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 20,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 9,
        shadowColor: '#000',
        shadowOffset: {
            height: 2,
            width: 0
        },
    },

    btnExcluir: {
        backgroundColor: '#F32013',
        borderRadius: 10,
        height: 40,
        marginTop: 10,
    },
});
