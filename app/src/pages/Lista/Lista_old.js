import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Moment from 'moment';
import { ListItem, Avatar, Badge } from 'react-native-elements';

import api from '../../service/api';

function Lista({ navigation }) {
    const [products, setProducts] = useState([]);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [validity, setValidity] = useState('');

    Moment.locale('pt');

    useEffect(() => {
        api.get('products').then(response => {
            const produtos = response.data;

            setProducts(produtos);
        });
    }, [products]);

    function handleToggleFiltersVisible() {
        setIsFilterVisible(!isFilterVisible);
    }

    async function handleFilterSubmit() {
        const response = await api.get('products', {
            params: {
                name,
                type,
                validity
            }
        });
    }

    const excluir = async (_id) => {
        await api.delete(`/products/${_id}`);
    };

    return(
        <ScrollView>
            {
                products.map((l, i) => (
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
                                                excluir(l._id);
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

const styles = StyleSheet.create({

});

export default Lista;
