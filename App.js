import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { firebaseApp } from "./app/utils/firebase";
import { YellowBox } from 'react-native';
import * as firebase from "firebase";
import Navegation from "./app/navegar/Navegation";

//--- Comentando mensajes de Warning
YellowBox.ignoreWarnings(['YellowBox', 'It appears']);


export default function App() {

  useEffect(()=> {
    firebase.auth().onAuthStateChanged( (user) => {
      console.log(user);
    })
  },[])

  return (
    <Navegation />
  );
}
