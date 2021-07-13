import React, { useRef }					from "react";
import { StyleSheet, View, Text, Image }	from "react-native";
//import { KeyboardAwareScrollView } 			from 'react-native-keyboard-aware-scroll-view';
//import Toast 								from "react-native-easy-toast";

//import RegistroForm from "../../components/login/RegistroForm"



export default function LoginRegistre(){
	//const toastRef = useRef();

	return(
		<View>
			<Text>Jhopn </Text>
		</View>

		/*
		<KeyboardAwareScrollView>
			<Image
				source = { require("../../assets/img/Home.png")}
				resizeMode = "contain"
				style      = { styles.logo }
			/>
			<Image
				source = { require("../../assets/img/Home-01.png")}
				resizeMode = "contain"
				style      = { styles.logo }
			/>
			<Toast ref={toastRef} position="center" opacity={0.9}/>
			
		</KeyboardAwareScrollView>
		*/
		)
	
}





const styles = StyleSheet.create({
	logo:{
		width: "100%",
		height: 340,
		marginTop: 20,
		opacity: 0.2,

	},
	viewFrom:{
		marginRight: 40,
		marginLeft:  40,
	}


})
