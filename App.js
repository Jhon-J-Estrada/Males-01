import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { firebaseApp } from "./app/utils/firebase";

import * as firebase from "firebase";

import Navegation from "./app/navegar/Navegation";



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
