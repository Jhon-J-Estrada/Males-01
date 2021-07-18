import React, { useState }from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeDisplayNameFrom(props){

	const { displayName, setShowModal, toastRef, setReloadUserInfo } = props;

	//estados

	const [ newDisplayName, setNewDisplayName ] = useState(null);
	const [ error, setError ] = useState(null);
	const [ cargando, setCargando ] = useState(false);


	const onSubmit = () =>{

		
		setError(null);
		if(!newDisplayName){
			setError("El nombre no puede estar vacio.");
		}else if(displayName === newDisplayName){
			setError("El nombre no puede ser igual al actual ");
		}else{
			setCargando(true);
			const update = {
				displayName: newDisplayName
			}

			firebase
				.auth()
				.currentUser.updateProfile(update)
				.then(() =>{
					setReloadUserInfo(true);
					setCargando(false);
					setShowModal(false);
				})
				.catch(() => {
					setError("Error al actualizar el nombre..");
					setCargando(false);
				});
		}

		
	};
	return(
		<View style = {styles.view}>
			<Input
				placeholder = "Cambiar Nombre"
				containerStyle = { styles.input }
				rightIcon = {{
					type: "material-comunity",
					name: "account-circle",
					color: "#c2c2c2",
				}}
				defaultValue = { displayName && displayName }
				onChange = {(e) => setNewDisplayName(e.nativeEvent.text)}
				errorMessage={error}

			/>

			<Button
				title  = "Cambiar Nombre"
				containerStyle = { styles.btnContainer }
				buttonStyle = { styles.btn }
				onPress = { onSubmit }
				loading = { cargando }
			/>
		</View>
		);
}

const styles = StyleSheet.create({
	view:{
		alignItems: "center",
		paddingTop: 10,
		paddingBottom: 10,
	},

	input:{
		marginBottom: 10,
	},
	btnContainer:{
		marginTop: 20,
		width: "95%",

	},
	btn:{
		backgroundColor:"#00a680",
	},
});

