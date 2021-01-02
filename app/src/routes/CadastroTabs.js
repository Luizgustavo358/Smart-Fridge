import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Cadastrar from "../pages/Cadastrar/Cadastrar";
import CadastroRFID from "../pages/CadastroRFID/CadastroRFID";

const { Navigator, Screen } = createBottomTabNavigator();

function CadastroTabs() {
    return(
        <Navigator
            tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 64
                },
                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: 20
                },
                labelStyle: {
                    fontSize: 13,
                    marginLeft: 16
                },
                inactiveBackgroundColor: '#FAFAFC',
                activeBackgroundColor: '#EBEBF5',
                inactiveTintColor: '#C1BCCC',
                activeTintColor: '#3039E1'
            }}
        >
            <Screen
                name="Cadastro"
                component={ Cadastrar }
                options={{
                    tabBarLabel: 'Cadastro',
                    tabBarIcon: ({ color, size }) => {
                        return(
                            <Icon 
                                name="add"
                                size={size}
                                color={color}
                            />
                        );
                    }
                }}
            />
            <Screen
                name="NFC"
                component={ CadastroRFID }
                options={{
                    tabBarLabel: 'Cadastro com NFC',
                    tabBarIcon: ({ color, size }) => {
                        return(
                            <Icon 
                                name="nfc"
                                size={size}
                                color={color}
                            />
                        );
                    }
                }}
            />
        </Navigator>
    );
}

export default CadastroTabs;
