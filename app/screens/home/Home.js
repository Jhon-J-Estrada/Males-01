import React, { useRef, useState, useEffect }					from "react";
import { StyleSheet, View, Text, Image }						from "react-native";
import { Icon } 												from "react-native-elements";
import { KeyboardAwareScrollView } 								from 'react-native-keyboard-aware-scroll-view';
import Toast 													from "react-native-easy-toast";
import { firebaseApp }											from "../../utils/firebase";
import firebase 												from "firebase/app";

//import RegistroForm from "../../components/login/RegistroForm"



export default function Home(props){
	const { navigation } = props;
	const toastRef = useRef();
	 // Estados 
	const [ user, setUser ] = useState(null);

	 // Effecs
	useEffect(()=>{
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUser(userInfo);
		})
	}, [])


	return(
		<View style = { styles.viewBody }>
			<Text>Inicio</Text>
			{ user && (
					<Icon 
						type="material-community" 
						name="plus" 
						color="#00a680" 
						reverse 
						containerStyle = { styles.btnContainer}
						onPress = {()=>navigation.navigate("additem")}
					/>
				)

			}
			
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
	},
	viewBody:{
		flex: 1,
		backgroundColor: "#fff",

	},
	btnContainer:{
		position: "absolute",
		bottom: 10,
		right:10,
		shadowColor: "black",
		shadowOffset: { width: 20, height: 20},
		shadowOpacity: 0.5
	}


})
