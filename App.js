import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import SignUpSreen from './screens/SignUp';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            header: () => null
          }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Icon
                name="home"
                size={25}
                color="black"
                style={{ marginLeft: 15 }}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUpSreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Icon
                name="home"
                size={25}
                color="black"
                style={{ marginLeft: 15 }}
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;