import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import { Container } from "./styles/appStyles";

// async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading'

export default function App() {

  // initial todos
  const initialTodos = []

  const [todos, setTodos] = useState(initialTodos)
  const [ready, setReady] = useState(false)

  const loadTodos = () => {
    AsyncStorage.getItem('storedTodos').then(data => {
      if(data !== null){
        setTodos(JSON.parse(data))
      }
    }).catch(err => console.log(err))
  }

    if(!ready){
      return (
        <AppLoading
          startAsync={loadTodos}
          onFinish={() => setReady(true)}
          onError={console.warn}
        />
      )
    }
  
  return (
    <Container>
      <Home todos={todos} setTodos={setTodos} />
      <StatusBar style="light" />
    </Container>
  );
}
