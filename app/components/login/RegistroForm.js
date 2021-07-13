import React, { useState }   	from "react";
import { View, StyleSheet } 	from "react-native";
import { Input, Icon, Button} 	from "react-native-elements";
import { validateEmail } 		from "../../utils/validar";
import Cargando					from "../Cargando"
import { size, isEmpty } 	    from "lodash";
import * as firebase        	from "firebase";
import { useNavigation }		from "@react-navigation/native";



export default function RegistroForm(props){
	const { toastRef } = props;

	const [ showPassword, setShowPassword ] 		= useState( false );
	const [ showRepiPassword, setShowRepiPassword ] = useState( false );
	const [ showCargando, setCargando ]				= useState( false );
	const [ formData, setformData ]					= useState(  defaulFormValue() );

	const navigation = useNavigation();

	const onSubmit = () => {
		console.log(validateEmail(formData.email));
		if( isEmpty(formData.email) || isEmpty(formData.passwor) || isEmpty(formData.repiPasswor)){
			toastRef.current.show('Todos los compos son abligatorios');
		}else if(!validateEmail(formData.email)){
				toastRef.current.show('Email no es correcto');
		}else if( formData.passwor !== formData.repiPasswor){
				toastRef.current.show("Contraseñas tienen que se iguales ");
		}else if( size(formData.passwor) < 6){
				toastRef.current.show('La contraseña mayor a 6 caracteres');
		}else{
			setCargando( true );
				firebase
					.auth()
					.createUserWithEmailAndPassword(formData.email, formData.passwor)
					.then((response) => {
						setCargando( false );
						navigation.navigate("you");

					})

					.catch((err) => {
						setCargando( false );
						toastRef.current.show("El email ya esta en uso, prueba con otro");
					});
			}
		

	}

	const onChange = (e, type) => {
		setformData({ ...formData, [type]: e.nativeEvent.text});
	}

	return(
		<View  style = { styles.formContainer }>
			<Input
				placeholder     = 	"Correo Electronico"
				containerStyle  = 	{ styles.inputForm }
				onChange		=	{(e) => onChange(e,"email")}
				rightIcon		= 	{
									    <Icon
									    	type	  =	"material-community"
									    	name 	  = "at"
									    	iconStyle = { styles.iconRight }
									    	
									    />
									}
		    />

		    <Input 
		    	placeholder     = 	"Contraseña"
		    	containerStyle  = 	{styles.inputForm }
		    	onChange		=	{(e) => onChange(e,"passwor")}
		    	password        = 	{ true }
		    	secureTextEntry = 	{showPassword ? false : true }
		    	rightIcon		= 	{
									    <Icon
									    	type	  =	"material-community"
									    	name 	  = {showPassword ? "eye-off-outline" : "eye-outline"}
									    	iconStyle = { styles.iconRight }
									    	onPress   = {() => setShowPassword(!showPassword)}
									    />

		    					    }
		    />

		    <Input 
		    	placeholder     =  "Repetir Contraseña"
		    	containerStyle  =  { styles.inputForm }
		    	onChange		=	{(e) => onChange(e,"repiPasswor")}
		    	password        =  { true }
		    	secureTextEntry =  { showRepiPassword ? false : true }
		    	rightIcon		=  {
									    <Icon
									    	type	  =	"material-community"
									    	name 	  = { showRepiPassword ? "eye-off-outline": "eye-outline"}
									    	iconStyle = { styles.iconRight }
									    	onPress   = {() => setShowRepiPassword(!showRepiPassword)}
									    />
							    	}
		    />
				
			<Button
				title  =  "Unirse"
				containerStyle 	= { styles.btncontainerunirse }
				buttonStyle 	= { styles.btnButton }
				onPress			= { () => onSubmit() }
				
			/>

			<Cargando isVisible = { showCargando } text="Creando cuenta" />
		</View>
		)
}

function defaulFormValue(){
	return{
		email:       "",
		passwor:     "",
		repiPasswor: ""
	}
}

const styles = StyleSheet.create({
	formContainer:{
		flex: 1,
		alignItems:"center",
		justifyContent: "center",
		marginTop: 30,
	},
	inputForm:{
		width:"100%",
		marginTop: 20,
	},
	btncontainerunirse:{
		marginTop: 20,
		width: "90%",

	},
	btnButton:{
		backgroundColor: "#00a680",
	},

	iconRight:{
		color: "#c1c1c1",
	}
})