import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Moment from 'moment';
import { ListItem, Avatar, Badge } from 'react-native-elements';

import api from '../../service/api';

class Lista extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
        };

        Moment.locale('pt');
    }

    async componentDidMount() {
        const response = await api.get('products');

        this.setState({
            products: response.data
        });
    }

    excluir = async (_id) => {
        await api.delete(`/products/${_id}`);

        let array = [...this.state.products];
        let index = array.indexOf(_id);

        if(index !== -1) {
            array.splice(index, 1);
            this.setState({
                products: array
            });
        }
    };

    render() {
        const { navigation } = this.props;

        return(
            <ScrollView>
                {
                    this.state.products.map((l, i) => (
                        <ListItem
                            key={i}
                            bottomDivider
                            onPress={() => navigation.navigate('Produto', l)}
                            onLongPress={() => {
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
                                                    this.excluir(l._id);
                                                }
                                            }
                                        ],
                                        {
                                            cancelable: true
                                        }
                                    );
                                }
                            }
                        >
                            <Avatar source={{ uri: l.avatar_url }} />
                            <ListItem.Content>
                                <ListItem.Title>
                                    { l.name } {" "}
                                    <Badge
                                        status="success"
                                        value={
                                            <Text style={{color: '#FFF'} }>
                                                { " " + l.type + " " }
                                            </Text>
                                        }
                                    />
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                    Validade: { Moment(l.validity).format('DD/MM/YYYY') }
                                </ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron color="#000" />
                        </ListItem>
                    ))
                }
            </ScrollView>
        );
    }
}

export default Lista;