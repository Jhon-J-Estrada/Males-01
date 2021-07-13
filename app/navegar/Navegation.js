import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements"

//Stack
import HomeStack from "./HomeStack";
import GuposStack from "./GuposStack";
import YouStack from "./YouStack";








// paginas 


const Tab = createBottomTabNavigator();


export default function Navegation(){
	return(
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName = "home"
				tabBarOptions={{
				inactiveTintColor: "#646464",
				activeTintColor:"#00a680",
			}}

			screenOptions={({ route }) => ({
				tabBarIcon: ({ color }) => screenOptions( route, color),
			})}
			>

			<Tab.Screen
				name="home"
				component={HomeStack}
				options={{
					title: "Inicio"
				}}
				/>
				
				<Tab.Screen
				name="grupos"
				component={GuposStack}
				options={{
					title: "Grupos"
				}}
				/>

				<Tab.Screen
				name="you"
				component={YouStack}
				options={{
					title: "Yo"
				}}				
				/>
			</Tab.Navigator>
		</NavigationContainer>
		)
}

function screenOptions( route, color){
	let iconMane;

	switch (route.name){

		case "home":
			iconMane ="home-circle-outline"
			break;
		case "grupos":
			iconMane ="compass-rose"
			break;	
		case "you":
			iconMane ="account"
			break;

		default:
			break;
	}

	return(
		<Icon type="material-community" name={iconMane} size={22} color={color}/>
		)
}