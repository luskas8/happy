import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanatesMap from './Pages/OrphanatesMap';
import OrphanatesDetails from './Pages/OrphanateDetails';
import OrphanateData from './Pages/CreateOrphanate/OrphanateData';
import SelectMapPosition from './Pages/CreateOrphanate/SelectMapPosition';
import Header from './components/Header';


const { Navigator, Screen } = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: {backgroundColor: '#f2f3f5'} }}>
                <Screen
                    name="OrphanatesMap"
                    component={OrphanatesMap}
                />
                <Screen
                    name="OrphanateDetails"
                    component={OrphanatesDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Orfanato" showCancel={false}/>
                        
                    }}
                />
                <Screen
                    name="SelectMapPosition"
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Adicione um orfanato"/>
                    }}
                />
                <Screen
                    name="OrphanateData"
                    component={OrphanateData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados"/>
                    }}
                />
            </Navigator>
        </NavigationContainer>
    );
}

export default Routes;