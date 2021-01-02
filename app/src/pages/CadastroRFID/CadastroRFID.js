import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";
import { Image, Badge, Button } from "react-native-elements";
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import api from '../../service/api';
import Moment from "moment"
import Icon from 'react-native-vector-icons/MaterialIcons';

class CadastroRFID extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rfid: '',
            haveProduct: false,
            name: '',
            avatar_url: '',
            validity: '',
            brand: '',
            description: '',
            type: '',
            aguardaTag: false
        }
    }

    componentDidMount() {
        NfcManager.start();
    }

    componentWillUnmount() {
        this._cleanUp();
    }

    _cleanUp = () => {
        NfcManager.cancelTechnologyRequest().catch(() => 0);
    };

    _test = async () => {
        this.setState({
            aguardaTag: true
        });

        try {
            let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
            let resp = await NfcManager.requestTechnology(tech, {
                alertMessage: 'Ready to do some custom Mifare cmd!'
            });

            // the NFC uid can be found in tag.id
            let tag = await NfcManager.getTag();
            // console.warn(tag.id);

            // if (Platform.OS === 'ios') {
            //     resp = await NfcManager.sendMifareCommandIOS([0x30, 0x00]);
            // } else {
            //     resp = await NfcManager.transceive([0x30, 0x00]);
            // }

            const response = await api.get(`productrfid/${tag.id}`);
            
            this.setState({
                name: response.data[0].name,
                avatar_url: response.data[0].avatar_url,
                validity: response.data[0].validity,
                brand: response.data[0].brand,
                type: response.data[0].type,
                description: response.data[0].description,
                rfid: response.data[0].rfid,
                haveProduct: true
            });

            this._cleanUp();
        } catch (ex) {
            console.warn('ex', ex);
            this._cleanUp();
        }

        this.setState({
            aguardaTag: false
        });
    };

    salvarProduto = async () => {
        const novoProduto = {
            name: this.state.name,
            avatar_url: this.state.avatar_url,
            brand: this.state.brand,
            description: this.state.description,
            type: this.state.type,
            validity: this.state.validity
        }

        await api.post('/products', novoProduto);

        this.setState({
            rfid: '',
            haveProduct: false,
            name: '',
            avatar_url: '',
            validity: '',
            brand: '',
            description: '',
            type: '',
            aguardaTag: false
        });
    };

    render() {
        return (
            <ScrollView>
                {this.state.haveProduct ?
                    (<View style={styles.container}>
                        {/* Foto */}
                        <Image
                            style={ styles.avatar }
                            source={{ uri: this.state.avatar_url }}
                        />

                        {/* Nome */}
                        <Text style={styles.title}>
                            { this.state.name }
                        </Text>

                        {/* Tipo */}
                        <Badge
                            status="success"
                            value={<Text style={{color: '#FFF'}}>{" " + this.state.type + " "} </Text>}
                        />

                        {/* Descrição */}
                        <Text style={styles.descricao}>Descrição</Text>
                        <Text style={{ marginBottom: 10 }}>
                            { this.state.description }
                        </Text>

                        {/* Validade */}
                        <Text style={styles.center}>
                            <Text style={{fontWeight: 'bold', marginBottom: 10 }}>Validade:</Text> {Moment(this.state.validity).format('DD/MM/YYYY')}
                        </Text>

                        <Button
                            buttonStyle={ styles.btnSalvar }
                            onPress={() => {
                                this.salvarProduto()
                            }}
                            title="Salvar"
                        />
                    </View>
                    ) : (
                        <View style={styles.container}>
                            <Text
                                style={styles.title}
                            >
                                Cadastrar por NFC
                            </Text>

                            <Icon 
                                name="nfc"
                                color="#000"
                                style={styles.imgNFC}
                            />

                            {this.state.aguardaTag &&
                                <Text style={{ textAlign: 'center' }}>
                                    Aguardando Tag...
                                </Text>
                            }

                            <Button
                                buttonStyle={styles.btnLerTag}
                                title="Ler Tag"
                                onPress={this._test}
                            />
                        </View>
                    )
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingRight: 50,
        paddingLeft: 50,
    },
    
    btnLerTag: {
        backgroundColor: '#3039E1',
        borderRadius: 10,
        height: 40,
        marginTop: 10
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
        height: 200,
        width: 300
    },

    imgNFC: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: 100,
        fontSize: 100
    },

    btnSalvar: {
        backgroundColor: '#3039E1',
        borderRadius: 10,
        height: 40,
        marginTop: 10,
        marginBottom: 10
    },
})

export default CadastroRFID;
