import React, { useState, useRef }  from "react";
import { View }     				from "react-native";
import Toast 						from "react-native-easy-toast";
import Cargando						from "../../components/Cargando";
import AddItemFrom					from "../../components/items/AddItemFrom";

export default function AddItems(props){
	const { navigation } = props;
	const [ showCargando, setCargando ]				= useState( false );
	const toastRef = useRef();

	 
	return(
		<View>
			<AddItemFrom
				toastRef = { toastRef }
				setCargando = { setCargando }
				navigation = { navigation }
			/>
				
			
			
			<Toast ref={toastRef} position="center" opacity={0.9}/>
			<Cargando isVisible = { showCargando } text = "Creando Item" />


		</View>
		)
}