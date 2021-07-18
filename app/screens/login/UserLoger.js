import React, { useRef, useState, useEffect }	from "react";
import { StyleSheet, View , Text }  from "react-native";
import { Button } 					from "react-native-elements";
import Toast 						from "react-native-easy-toast";
import * as firebase 				from "firebase";

import Cargando from "../../components/Cargando";
import InfoUser	from "../../components/login/InfoUser";
import CuentaOpciones	from "../../components/login/CuentaOpciones";

export default function UserLoger() {


	const [ userInfo, setUserInfo ]		  = useState({});
	const [ showCargando, setCargando ]   = useState( false );
	const [ cargandoTex, setCargandoTex ] = useState("ddd");
	const [ reloadUserInfo, setReloadUserInfo ] = useState(false);
	const toastRef 						  = useRef();


	useEffect( () => {
		(async () => {
			const user = await firebase.auth().currentUser;
			setUserInfo(user);
		})();

		setReloadUserInfo(false);
	}, [reloadUserInfo]);

	

	return(
		<View style = { styles. viewUserInfo }>
			<InfoUser 
					userInfo 		= { userInfo }  
					toastRef		= {toastRef}
					setCargando     = {setCargando}
					setCargandoTex  = {setCargandoTex}


					/>

				<CuentaOpciones
				userInfo 		= { userInfo } 
				toastRef		= {toastRef} 
				setReloadUserInfo = { setReloadUserInfo }
			/>
		
		
			<Button 
				title       = "Cerrar sesión-"
				buttonStyle = { styles.btnCloseSecion }
				titleStyle  = { styles.btnCloseSecionTex }
				onPress     = {() => firebase.auth().signOut()}
			/>
			
			<Toast ref={ toastRef } position="center" opacity={ 0.9 } />
			<Cargando text={ cargandoTex } isVisible={ showCargando } />
			
		</View>

		)
		
}

const styles = StyleSheet.create({
	viewUserInfo: {
		minHeight: 		 "100%",
		backgroundColor: "#f2f2f2",
	},


	btnCloseSecion:{
		marginTop: 30,
		borderRadius: 0,
		backgroundColor:"#fff",
		borderTopWidth: 1,
		borderTopColor:"#e3e3e3",
		borderBottomWidth: 1,
		borderBottomColor: "#e3e3e3",
		paddingTop: 10,
		paddingBottom: 10

	},

	btnCloseSecionTex:{
		color: "#00a680",
	}
});

