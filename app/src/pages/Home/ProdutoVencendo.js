import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card} from "react-native-elements";

export default function ProdutoVencendo(props) {
    const produtosVencendo = props.produto;
    const tamanhoMaior = produtosVencendo.length;

    return(
        <View>
            { 
                produtosVencendo.map((p, index) => {
                    return (
                        <Card key={index}>
                            <Card.Title>{ p.name }</Card.Title>
                            <Card.Divider/>
                            <Card.Image source={{ uri: p.avatar_url }}/>
                            <Text style={{ color: 'red' }}>Produto vencendo</Text>
                        </Card>
                    )
                })
            }
        </View>
    );
}

const styles = StyleSheet.create({

});
