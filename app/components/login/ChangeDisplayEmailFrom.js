import React, { useState }from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import validar from "../../utils/validar"
import reauthenticate from "../../utils/api"
import * as firebase from "firebase";



export default function ChangeDisplayEmailFrom(props){

	const { email, setShowModal, toastRef, setReloadUserInfo } = props;

	//estados

	const [ formData, setFormData] = useState(defaultValue());
	const [ showPassword, setShowPassword] = useState(false);
	const [ error, setError ] = useState({});
	const [ cargando, setCargando ] = useState(false);

	const onChange = (e, type) => {
		setFormData({ ...formData, [type]: e.nativeEvent.text});
	}

	
	
	



	const onSubmit = () =>{
		setError(null);
		if(!formData.email || email === formData.email){
			setError({
				email: "El email no ha cambiado",
			});
		}else if(!validateEmail(formData.email)){
			setError({
				email: "Email incorrecto",
			});
		}else if(!formData.password){ 
			setError({
				password: "La contraseña no puede estas vacia",
			});
		}else{
			setCargando(true);

			reauthenticate(formData.password).then(response =>{
				console.log("valida");

				firebase
				.auth()
				.currentUser.updateEmail(formData.email)
				.then(() =>{
					setReloadUserInfo(true);
					setCargando(false);
					
					toastRef.current.show("Email actualizado correctamente ");

					setShowModal(false);

				})
				.catch(() => {
					setError("Error al actualizar el Email..");
					setCargando(false);
				});



					

			}).catch(() =>{
				setError({
				password: "La contraseña no es correcta",
			});
			});
			
			

			
		}

		
	};
	return(
		<View style = {styles.view}>
			<Input
				placeholder = "Correo electronico"
				containerStyle = { styles.input }
				defaultValue = { email || "" }
				rightIcon = {{
					type: "material-comunity",
					name: "alternate-email",
					color: "#c2c2c2",
				}}
				
				onChange = {(e) => onChange(e, "email")}
				errorMessage={error.email}

			/>

			<Input
				placeholder = "Contraseña"
				containerStyle = { styles.input }
				password = { true }
				secureTextEntry = { showPassword ? false: true }
					rightIcon = {{
						type: "material-comunity",
						name: showPassword ? "alternate-email" : "alternate-email",
						color: "#c2c2c2",
						onPress: () => setShowPassword(!showPassword)
				}}
				onChange = {(e) => onChange(e, "password")}
				errorMessage={error.password}
			/>

			<Button
				title  = "Cambiar Email"
				containerStyle = { styles.btnContainer }
				buttonStyle = { styles.btn }
				onPress = { onSubmit }
				loading = { cargando }
			/>
		</View>
		);
}

function defaultValue(){
	return{
		email:"",
		password:""
	}
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

