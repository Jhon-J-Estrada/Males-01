import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import  Home  from "../screens/home/Home";
import AddItems from "../screens/home/AddItems";

const Stack = createStackNavigator();

export default function HomeStack(){
	return(
		<Stack.Navigator>
			<Stack.Screen
			name      = " home "
			component = { Home }
			options   = {{
				title : "Inicio"
			}}
			/>

			<Stack.Screen
			name      = "additem"
			component = { AddItems }
			options   = {{
				title : "Añadir Nuevo Item"
			}}
			/>
		</Stack.Navigator>
		);
}
