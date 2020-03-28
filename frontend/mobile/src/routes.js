import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // esse deve sempre ficar envolvendo todas as rotas 
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';


export default function Routes() {
     return (
          <NavigationContainer>
               {/* screenOptions={ { headerShown: false } } para nao mostrar o cabeçalho da pagina por padrao */}
               <AppStack.Navigator screenOptions={ { headerShown: false } }> 
                    <AppStack.Screen name="Incidents" component={Incidents}/>
                    <AppStack.Screen name="Detail" component={Detail}/>
               </AppStack.Navigator>
          </NavigationContainer>
     );
}