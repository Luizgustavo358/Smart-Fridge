import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Telas
import Home from '../pages/Home/Home';
import Lista from '../pages/Lista/Lista';
import Produto from '../pages/Produto/Produto';
import CadastroTabs from './CadastroTabs';

const { Navigator, Screen } = createStackNavigator();

function Routes() {
    return(
        <NavigationContainer>
            <Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#414af2'
                    },
                    headerTintColor: '#FFF'
                }}>
                <Screen
                    name="Home"
                    component={ Home }
                    options={{
                        title: 'Smart Fridge',
                    }}
                />
                <Screen
                    name="Lista"
                    component={ Lista }
                    options={{
                        title: 'Lista de Produtos'
                    }}
                />
                <Screen
                    name="Produto"
                    component={ Produto }
                    options={{
                        title: 'Detalhes do Produto'
                    }}
                />
                <Screen
                    name="Cadastro"
                    component={ CadastroTabs }
                />
            </Navigator>
        </NavigationContainer>
    )
}

export default Routes;
