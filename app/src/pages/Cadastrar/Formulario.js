import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import api from '../../service/api';
import Moment from "moment";

function Formulario({ navigation }) {
    const [campoNome, setCampoNome] = useState('');
    const [campoTipo, setCampoTipo] = useState('');
    const [campoData, setCampoData] = useState('');
    const [campoDesc, setCampoDesc] = useState('');
    const [campoMarca, setCampoMarca] = useState('');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setCampoData(Moment(currentDate).format('DD/MM/YYYY'));
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const cadastraProduto = async (nome, marca, tipo, data, descricao) => {
        // data = Moment(data).format('YYYY-MM-DD');

        if(nome.length > 0 && tipo.length > 0 && data.length > 0 && marca.length > 0) {
            const novoProduto = {
                name: nome,
                avatar_url: 'https://source.unsplash.com/NRP0iTFLzPk',
                brand: marca,
                description: descricao,
                type: tipo,
                validity: data
            }

            await api.post('/products', novoProduto);

            setCampoNome('');
            setCampoTipo('');
            setCampoData('');
            setCampoDesc('');
            setCampoMarca('');

            navigation.goBack('Home');
        }
    };

    return(
        <View style={ styles.form }>
            <Text style={ styles.texto }>Cadastre o produto abaixo</Text>

            <Text>Nome do Produto:</Text>
            <TextInput
                style={ styles.textInput }
                defaultValue={ campoNome }
                onChangeText={ (campoNome) => setCampoNome(campoNome) }
                autoCorrect={ false }
                autoFocus
            />

            <Text>Marca do Produto:</Text>
            <TextInput
                style={ styles.textInput }
                defaultValue={ campoMarca }
                onChangeText={ (campoMarca) => setCampoMarca(campoMarca) }
                autoCorrect={ false }
            />

            <Text>Tipo do Produto:</Text>
            <TextInput
                style={ styles.textInput }
                defaultValue={ campoTipo }
                onChangeText={ (campoTipo) => setCampoTipo(campoTipo) }
                autoCorrect={ false }
            />

            <Text>Data de Validade:</Text>
            <TextInput
                style={ styles.textInput }
                defaultValue={ campoData }
                maxLength={ 10 }
                autoCorrect={ false }
                onTouchStart={ showDatepicker }
            />

            <Text>Descrição:</Text>
            <TextInput
                style={ [styles.textInput, styles.descricao] }
                defaultValue={ campoDesc }
                onChangeText={ (campoDesc) => setCampoDesc(campoDesc) }
                multiline={ true }
                autoCorrect={ false }
            />

            <Button
                buttonStyle={ styles.btnSalvar }
                onPress={() => {
                    cadastraProduto(campoNome, campoMarca, campoTipo, campoData, campoDesc)
                }}
                title="Salvar"
            />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={ date }
                    mode={ mode }
                    display="default"
                    onChange={ onChange }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        alignSelf: 'stretch'
    },

    texto: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10
    },

    textInput: {
        backgroundColor: '#FFF',
        borderColor: '#E3E3E3',
        borderRadius: 10,
        height: 35,
        marginBottom: 10
    },

    descricao: {
        height: 100
    },

    btnSalvar: {
        backgroundColor: '#3039E1',
        borderRadius: 10,
        height: 40,
        marginTop: 10
    },

    btnSalvarText: {
        color: '#FFF',
        textAlign: 'center',
    }
});

export default Formulario;
