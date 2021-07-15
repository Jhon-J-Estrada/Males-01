import React, { useRef } 							 from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";


import { Divider } 									 from "react-native-elements";
import { useNavigation } 							 from "@react-navigation/native";
import Toast 										 from "react-native-easy-toast";
import CuentaUser        							 from "../../components/login/CuentaUser";

export default function Login(){


	const toastRef = useRef();


	
	return(
		<ScrollView>
			<Image
				source = { require("../../../assets/img/tenedores-letras-icono-logo.png")}
				resizeMode  = "contain"
				style 		= {styles.logo}
			 />

			 <Divider style =  { styles.dividerline } />

			 <View style= { styles.viewContain }>
			 
			 	<CreateLogin />
			 	<CuentaUser toastRef = {toastRef}  />
			 </View>

			 
			 <Text>
			 	
			 </Text>
			 <Toast ref={toastRef} position="center" opacity={0.9}/>
		</ScrollView>
		);
	
	
}







function CreateLogin(){
	const navigation = useNavigation();
	return(
		<Text style = { styles.textRegistre }>
			Aún no tienes cuenta...? {" "}
			<Text 
				style = {styles.btnRegis}
				onPress = { () => navigation.navigate("registro") }
			>
				Registrate
			</Text>
		</Text>
		)
}

const styles = StyleSheet.create({
	logo:{
		width: "100%",
		height: 150,
		marginTop: 20,
	},

	viewContain:{
		marginRight: 40,
		marginLeft: 40,
	},

	textRegistre:{
		marginTop: 15,
		marginLeft: 10,
		marginRight: 10,
	},

	btnRegis:{
		color: "#00a680",
		fontWeight: "bold",
	},

	dividerline:{
		backgroundColor: "#00a680",
		margin: 40,
	}
});