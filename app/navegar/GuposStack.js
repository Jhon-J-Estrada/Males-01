//GuposStack

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import  stackGrupos  from "../screens/Grupos";

const Stack = createStackNavigator();

export default function GuposStack(){
	return(
		<Stack.Navigator>
			<Stack.Screen
			name      = "Grupos"
			component = { stackGrupos }
			options   = {{
				title : "Comunidad"
			}}
			/>
		</Stack.Navigator>
		);
}
