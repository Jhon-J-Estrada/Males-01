import React from "react";
import { StyleSheet, ScrollView, View , Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function UserInvit() {	
	const navigation = useNavigation();

	return(
		<ScrollView centerContent = { false } style = { styles.viewBody }>		
			<Image
			style = { styles.image }
			source = { require("../../../assets/img/user-guest.png")}
			resizeMode="contain"
			/>
			<View style = { styles.viewBtn }>
				<Button
				title = " Ver tu Perfil "
				buttonStyle = { styles.btnStyles }
				containerStyle = { styles.btnContainer }
				onPress={ () => navigation.navigate("login")}
				 />
				
				
			</View>
			<Text style = { styles.title }> Crea tu cuenta </Text>
			<Text></Text>
		</ScrollView>


		)


		
}

const styles  = StyleSheet.create({
	viewBody:{
		marginLeft:30,
		marginRight:30,


	},
	image:{
		height: 450,
		width: "100%",
		marginBottom:40,
	},

	title:{
		fontWeight: "bold",
		fontSize:19,
		marginBottom:10,
		textAlign:"center",

	},

	viewBtn:{
		flex:1,
		alignItems:"center",
	},

	btnStyles:{
		backgroundColor:"#00a680",

	},
	btnContainer:{
		width:"70%",

	}



});