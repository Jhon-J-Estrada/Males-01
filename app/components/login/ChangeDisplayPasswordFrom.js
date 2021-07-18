import React, { useState } from "react";
import { StyleSheet, Text , View} from "react-native";
import { Input, Button } from "react-native-elements";
import { size } from "lodash";
import * as firebase from "firebase";

import reauthenticate from "../../utils/api";

export default function ChangeDisplayPasswordFrom( props ){

	const { setShowModal, toastRef } = props;

// Estados 
	const [ showPassword, setShowPassword ] = useState(false);
	const [ formData, setformData ] = useState(defaultValue());
	const [ cargando, setCargando ] = useState(false);
	const [ error, setError ] = useState({});


	const onChange = (e, type) => {
		setformData({ ...formData, [type]: e.nativeEvent.text});
	};

	const onSubmit = async () =>{
		let isSetError = true;
		let errrTemp = {};
		setError({});
		if( !formData.password || !formData.newPassword || !formData.repitPassword){
			errrTemp = {
				password: !formData.password ? "La contraseña no puede estar vacia." : "",
				newPassword: !formData.newPassword ?  "La contraseña no puede estar vacia." : "",
				repitPassword: !formData.repitPassword ? "La contraseña no puede estar vacia." : "" ,
			};
		}else if(formData.newPassword != formData.repitPassword){
			errrTemp = {
				repitPassword: "Las Contraseña no son Iguales ",
				newPassword: "Las Contraseña no son Iguales ",
				
			};
		}else if(size(formData.newPassword) < 6 ){
			errrTemp = {
				repitPassword: "La contraseña tiene que ser mayor a 6 caracteres ",
				newPassword: "La contraseña tiene que ser mayor a 6 caracteres",
				
			};
		}else{
			setCargando(true);
			await reauthenticate(formData.password)
			.then( async () =>{			
				await firebase
				.auth()
				.currentUser.updatePassword(formData.newPassword)
				.then( async () =>{ 					
					setCargando(false);					
					toastRef.current.show("La Contraseña se actualizado correctamente... ");
					setShowModal(false);
					await firebase.auth().signOut();
					isSetError = false;
				})
				.catch(() => {
					errrTemp = {
						other: "Error al actualizar la contraseña ",
				
				
					};
					setCargando(false);
				});

				

				setCargando(false);
					
			}).catch(() =>{
				setCargando(false);
					errrTemp = {
							password: "La contraseña no es correcta",				
							};
			});
			
		}

		isSetError && setError( errrTemp );
		};

	return(
		<View style = { styles.view }>
			<Input
				placeholder = " Contraseña Actual"
				containerStyle = { styles.input }
				password = { true }
				secureTextEntry = {  showPassword ? false : true }
				rightIcon = {{
					type: "material-comunity",
					name: showPassword ? "lock" : "lock-open",
					color: "#c2c2c2",
					onPress: () => setShowPassword(!showPassword)
				}}
				onChange = {(e) => onChange(e, "password")}
				errorMessage={error.password}

			/>

			<Input
				placeholder = " Nueva Contraseña"
				containerStyle = { styles.input }
				password = { true }
				secureTextEntry = {  showPassword ? false : true }
				rightIcon = {{
					type: "material-comunity",
					name: showPassword ? "lock" : "lock-open",
					color: "#c2c2c2",
					onPress: () => setShowPassword(!showPassword)
				}}
				onChange = {(e) => onChange(e, "newPassword")}
				errorMessage={error.newPassword}

			/>

			<Input
				placeholder = " Repetir Contraseña"
				containerStyle = { styles.input }
				password = { true }
				secureTextEntry = {  showPassword ? false : true }
				rightIcon = {{
					type: "material-comunity",
					name: showPassword ? "lock" : "lock-open",
					color: "#c2c2c2",
					onPress: () => setShowPassword(!showPassword)
				}}
				onChange = {(e) => onChange(e, "repitPassword")}
				errorMessage={error.repitPassword}

			/>
			<Text>{error.other}</Text>

			<Button
				title  = "Cambiar Contraseña"
				containerStyle = { styles.btnContainer }
				buttonStyle = { styles.btn }
				onPress = { onSubmit }
				loading = { cargando }
				
			/>
		</View>
		)
};

function defaultValue(){
	return{
		password:"",
		newPassword:"",
		repitPassword:"",
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
})