import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Button } from 'react-native-elements';

import api from '../../service/api';

import Notificacoes from './Notificacao';

export default function Home({ navigation }) {
    const [products, setProducts] = useState([]);
    const [produtosVencidos, setProdutosVencidos] = useState([]);
    const dataHoje = new Date();

    useEffect(() => {
        async function getProducts() {
            api.get('products').then(response => {
                const produtos = response.data;
                setProducts(produtos);
            });
        }

        getProducts();
        verificaValidade(products);
    }, [products]);

    const verificaValidade = (produtos) => {
        let seteDias = new Date();
        seteDias.setDate(dataHoje.getDate() + 7);

        for(let produto in produtos) {
            let numeros = produtos[produto].validity.match(/\d+/g);
            let dataProduto = new Date(numeros[0], numeros[1]-1, numeros[2]);

            if(dataProduto <= seteDias) {
                setProdutosVencidos(produtos[produto]);
            }
        }
    };

    return (
        <ScrollView>
            <Notificacoes produtos={ produtosVencidos } />

            <View style={ styles.buttonsContainer }>
                <Button
                    buttonStyle={[styles.button, styles.buttonPrimary]}
                    onPress={() => navigation.navigate('Cadastro')}
                    icon={
                        <Icon
                            name="add"
                            size={15}
                            color="white"
                        />
                    }
                    title=" Cadastrar"
                />

                <Button
                    buttonStyle={[styles.button, styles.buttonSecondary]}
                    onPress={() => navigation.navigate('Lista')}
                    icon={
                        <Icon
                            name="list"
                            size={15}
                            color="white"
                        />
                    }
                    title=" Lista de Produtos"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    buttonsContainer: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        height: 70,
        backgroundColor: '#999',
        padding: 24,
        justifyContent: 'space-between',
    },

    buttonPrimary: {
        backgroundColor: '#3039E1',
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0
    },

    buttonSecondary: {
        backgroundColor: '#999',
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8
    },

    buttonText: {
        color: '#FFF',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    buttonC: {
        color: '#000',
        padding: 10,
        backgroundColor: '#E9E9E9',
        borderRadius: 4,
        justifyContent: 'space-evenly'
    }
});
