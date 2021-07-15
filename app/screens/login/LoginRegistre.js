import React, { useRef }					from "react";
import { StyleSheet, View, Text, Image }	from "react-native";
import { KeyboardAwareScrollView } 			from 'react-native-keyboard-aware-scroll-view';
import Toast 								from "react-native-easy-toast";

import RegistroForm from "../../components/login/RegistroForm"



export default function LoginRegistre(){
	
	const toastRef = useRef();

	return(
		<KeyboardAwareScrollView>
			<Image
				source = { require("../../../assets/img/user-guest.png")}
				resizeMode = "contain"
				style      = { styles.logo }
			/>
			<View style = { styles.viewFrom }>
				<RegistroForm toastRef = {toastRef}/>
			</View>
			<Toast ref={toastRef} position="center" opacity={0.9}/>
			
		</KeyboardAwareScrollView>
		)
	
}





const styles = StyleSheet.create({
	logo:{
		width: "100%",
		height: 150,
		marginTop: 20,
	},
	viewFrom:{
		marginRight: 40,
		marginLeft:  40,
	}


})
