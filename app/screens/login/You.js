import React, { useState, useEffect } from "react";
import { View , Text } from "react-native";
//import * as firebase from "firebase";
//import UserLoger from "./UserLoger";
//import UserInvit from "./UserInvit";

//cargando cd

//import Cargando from "../../components/Cargando"


export default function You() {
	return(
		<View>
			<Text>You</Text>
		</View>
		);

	/*

	const [login, setLogin] = useState(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(( user ) =>{			
			!user ? setLogin(false): setLogin(true);
		})

	},[])

	if (login === null )return <Cargando isVisible = {true} text="Cargando.."/>;

	return login ? <UserLoger/> : <UserInvit/>;
	
	*/
}