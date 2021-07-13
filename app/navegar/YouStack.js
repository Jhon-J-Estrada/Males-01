
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import  stackYou  from "../screens/login/You";
import  Login  from "../screens/login/Login";
import  LoginRegistre  from "../screens/login/LoginRegistre";


const Stack = createStackNavigator();

export default function YouStack(){
	return(
		<Stack.Navigator>
			<Stack.Screen
			name      = "you"
			component = { stackYou }
			options   = {{
				title : "Yo"
			}}
			/>
			<Stack.Screen
			name      = "login"
			component = { Login }
			options   = {{
				title : "Iniciar Sesión"
			}}
			/>
			<Stack.Screen
			name      = "registro"
			component = { LoginRegistre }
			options   = {{
				title : "Registrar"
			}}
			/>
		</Stack.Navigator>
		);
}
