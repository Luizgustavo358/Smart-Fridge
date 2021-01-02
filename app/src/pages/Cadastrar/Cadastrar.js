import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Formulario from './Formulario';

export default class Cadastrar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Formulario />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingRight: 50,
        paddingLeft: 50,
    }
});
