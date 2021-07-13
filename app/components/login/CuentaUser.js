import React, { useState }    	from "react";
import { View, StyleSheet }		from "react-native";
import { Input, Icon, Button }  from "react-native-elements";
import { isEmpty }				from "lodash";
import { validateEmail }		from "../../utils/validar";
import * as firebase			from "firebase";
import { useNavigation }		from "@react-navigation/native";
import Cargando					from "../Cargando";


export default function CuentaUser(props){

	const { toastRef } = props;
	

	const [showPassword, setshowPassword] = useState( false );
	const [formData, setformData ]		  = useState(dafaulFromValue());
	const [showCargando, setshowCargando ]= useState(false);

	const navigation = useNavigation();

	const onChange = (e, type) => {
		setformData({ ...formData, [type]: e.nativeEvent.text});
		
	};

	const onSubmit = () => {
		
		if(isEmpty(formData.email) || isEmpty(formData.password)){			
			toastRef.current.show("Todos los compos son abligatorios");
		}else if( !validateEmail( formData.email ) ){
			toastRef.current.show("El email no es correcto");
		}else{
			setshowCargando(true);
			firebase
				.auth()
				.signInWithEmailAndPassword( formData.email, formData.password )
				.then(()=>{
					setshowCargando(false);
					navigation.navigate("you")
					
				})
				.catch(()=>{
					setshowCargando(false);
					toastRef.current.show("Contraseña incorrecta");
				})
			
		}
	};


	return(
		<View style = { styles.formContainer }>
			<Input
				placeholder 	= "Correo Electronico"
				containerStyle  = { styles.inputForm }
				onChange		= { (e) => onChange(e, "email") }
				rightIcon		= {
									<Icon
									 	type	= "material-community"
									 	name 	= "at"
									 	iconStyle = { styles.iconRight }
									/>

								  }

			/>

			<Input 
				placeholder 	= "Contraseña"
				containerStyle  = { styles.inputForm }
				password		= { true }
				onChange		= { (e) => onChange(e, "password") }
				secureTextEntry = { showPassword ? false : true }
				rightIcon		= {
									<Icon
									 	type	= "material-community"
									 	name 	= { showPassword ? "eye-off-outline" : "eye-outline"}
									 	iconStyle = { styles.iconRight }
									 	onPress = {() => setshowPassword(!showPassword)}
									/>

								  }
			/>

			<Button 
				title 			= "Inicio de sesión"
				containerStyle  = { styles.btnContainerLogin }
				buttonStyle		= { styles.btnButton }
				onPress			= { onSubmit }

			/>
			<Cargando isVisible= {showCargando} text="Iniciando sesión "/>
			
		</View>
		)
}


function dafaulFromValue(){
	return{
		email:"",
		password:""
	}
}


const styles = StyleSheet.create({

	formContainer:{
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 30,

	},
	inputForm:{
		width: "100%",
		marginTop: 20,

	},
	btnContainerLogin:{
		marginTop:20,
	},
	btnButton:{
		backgroundColor:"#00a680",
	},
	iconRight:{
		color: "#c1c1c1"
	}
});