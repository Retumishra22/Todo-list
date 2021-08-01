import React from 'react'
import { Text } from 'react-native'

import Home from './screens/Home'
import Add from './screens/Add'
import Edit from './screens/Edit'

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName = 'Home'>
        <Stack.Screen
        name = 'Home'
        component = {Home}
        options = {{
          headerStyle : {
            backgroundColor : "#0f4c75",
            height: 120,

          },
          title : 'To-Do List' ,
          headerTitleStyle: {
            textAlign: 'center',
            fontSize: 30,
            color: 'white',
            fontFamily: 'serif',
            fontWeight: 'bold'
          }
        }}
        >

        </Stack.Screen>
        <Stack.Screen
        name = 'Add'
        component = {Add}
        options = {{
          headerStyle : {
            backgroundColor : "#0f4c75",
            height: 120,

          },
          title : 'To-Do List' ,
          headerTitleStyle: {
            textAlign: 'center',
            fontSize: 30,
            color: 'white',
            fontFamily: 'serif',
            fontWeight: 'bold'
          }
        }}
        >

        </Stack.Screen>
        <Stack.Screen
        name = 'Edit'
        component = {Edit}
        options = {{
          headerStyle : {
            backgroundColor : "#0f4c75",
            height: 120,

          },
          title : 'To-Do List' ,
          headerTitleStyle: {
            textAlign: 'center',
            fontSize: 30,
            color: 'white',
            fontFamily: 'serif',
            fontWeight: 'bold'
          }
        }}
        >

        </Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;