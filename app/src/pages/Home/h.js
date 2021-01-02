import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Button } from 'react-native-elements';

import api from '../../service/api';

import Notificacoes from './Notificacao';

class h extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            produtosVencidos: [],
        };
    }

    componentDidMount() {
        this.getProducts();
        this.verificaValidade();
    }

    getProducts = async () => {
        await api.get('products').then(response => {
            this.setState({
                products: response.data
            });
        });
    };

    verificaValidade = () => {
        let produtos = this.state.products;
        let dataHoje = new Date();
        let seteDias = new Date();
        seteDias.setDate(dataHoje.getDate() + 7);

        for(let p in produtos) {
            let numeros = produtos[p].validity.match(/\d+/g);
            let dataProduto = new Date(numeros[0], numeros[1]-1, numeros[2]);

            if(dataProduto <= seteDias) {
                this.setState({
                    produtosVencidos: produtos[p]
                });
            }
        }
    };

    render() {
        return(
            <ScrollView>
                <Notificacoes produtos={ this.state.produtosVencidos } />

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
    },
});

export default h;
