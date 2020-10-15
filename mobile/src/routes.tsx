import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphantesMap from './Pages/OrphanatesMap';
import OrphantesDetails from './Pages/OrphanateDetails';


const { Navigator, Screen } = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="OrphanateMap" component={OrphantesMap}/>
                <Screen name="OrphanateDetails" component={OrphantesDetails}/>
            </Navigator>
        </NavigationContainer>
    );
}

export default Routes;