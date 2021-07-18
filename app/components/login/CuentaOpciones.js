import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { map } from "lodash";

import Modal from "../../components/Modal";
import ChangeDisplayNameFrom from "./ChangeDisplayNameFrom";
import ChangeDisplayEmailFrom from "./ChangeDisplayEmailFrom";
import ChangeDisplayPasswordFrom from "./ChangeDisplayPasswordFrom";

export default function CuentaOpciones(props){
//estados 
    const [ showModal, setShowModal ] = useState(false);
    const [ renderComponent, setrenderComponent ] = useState(null);

	const { userInfo, toastRef, setReloadUserInfo } = props;
	
	

	const selecComponent =(key) =>{
		

		switch(key){
			case "name":
				setrenderComponent(
						<ChangeDisplayNameFrom
							displayName = {userInfo.displayName}
							setShowModal = { setShowModal }
							toastRef = { toastRef }
							setReloadUserInfo = { setReloadUserInfo }
						/>
					);
				setShowModal(true);
				
				break;
			case "email":
				setrenderComponent(
					<ChangeDisplayEmailFrom
							email = {userInfo.email}
							setShowModal = { setShowModal }
							toastRef = { toastRef }
							setReloadUserInfo = { setReloadUserInfo }
						/>
					
					);
				setShowModal(true);
				
				break;
			case "contra":
				setrenderComponent( <ChangeDisplayPasswordFrom
						setShowModal = { setShowModal }
							toastRef = { toastRef }
					/>
				);
				setShowModal(true);
				
				break;
			default:
				setrenderComponent(null);
				setShowModal(false);
				break;


		}	
	}
	const menuOptions = generateOptions(selecComponent);

	return(
		<View>
			{map(menuOptions, (menu, index) =>(
					<ListItem
						key = {index}
						title = {menu.title}
						leftIcon={{
							type: menu.iconType,
							name: menu.iconNameLeft,
							color: menu.iconColorLeft
						}}
						rightIcon={{
							type: menu.iconType,
							name: menu.iconNameRight,
							color: menu.iconColorRight
						}}
						containerStyle = {styles.menuItem}
						onPress = {menu.onPress}
					/>
				))}

			{ renderComponent && (
					<Modal isVisible={showModal} setIsVisible = {setShowModal}>
						{ renderComponent }
					</Modal>
				)}

			
		</View>
		)
}

function generateOptions(selecComponent){
	return[
		{
			title: "Cambiar Nombre y Apellido..",
			iconType: "material-comunity",
			iconNameLeft:"account-circle",
			iconColorLeft:"#ccc",
			iconNameRight:"chevron-right",
			iconColorRight:"#AACC00",
			onPress:() => selecComponent("name")
		},
		{
			title: "Cambiar Email..",
			iconType: "material-comunity",
			iconNameLeft:"alternate-email",
			iconColorLeft:"#ccc",
			iconNameRight:"chevron-right",
			iconColorRight:"#AACC00",			
			onPress:() => selecComponent("email")
		},
		{
			title: "Cambiar Contraseña",
			iconType: "material-comunity",
			iconNameLeft:"lock",
			iconColorLeft:"#ccc",
			iconNameRight:"chevron-right",
			iconColorRight:"#AACC00",
			onPress:() => selecComponent("contra")
		}
	]
}

const styles = StyleSheet.create({
	menuItem:{
		borderBottomWidth: 1,
		borderBottomColor: "#e3e3e3",
	}

});