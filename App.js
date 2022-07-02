import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View,
  ScrollView,
  Button,
  Alert, 
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Import screens that we will be navigating between
import Chat from './components/Chat';
import Start from './components/Start';

//This is needed to be able use navigation options.
// IE - <Stack.Navigator> is using this variable
const Stack = createStackNavigator();

export default class App extends Component {

  render() {
    return (
      <NavigationContainer>
        {/* We want the app to open up and render the <Start /> component by default */}
        <Stack.Navigator
          initialRouteName="Start"
        >
          {/* <Start /> Component */}
          <Stack.Screen
            name="Chat App"
            component={Start}
          />
          {/* <Chat /> Component */}
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});