import React, { useState } 									from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions, PermissionsAndroid }  from "react-native";
import {Icon, Avatar, Image, Input, Button  } 				from "react-native-elements";
import { map, size, filter } from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";


// detectar el ancho del m
const widthScreen = Dimensions.get("window").width;

export default function AddItemFrom( props ){

	const { toastRef, setCargando, navigation } = props;

	const [ itemName, setItemName ] 		= useState("");
	const [ itemDireccion, setDireccions ] 		= useState("");
	const [ itemDescrip, setItemDescrip ] 	= useState("");

	const [ imagesSelect, setimagesSelect]   = useState([]);

	const addItem = () =>{
		console.log("Ok");
		console.log(itemName);
		console.log(itemDescrip);
	}


	

	return(
		<ScrollView style= {styles.scrollView} >
		<ImagesItem 
			imagesItems = { imagesSelect[0] }
		/>
			<FromAdd
				setItemName 	= { setItemName }
				setItemDescrip  = { setItemDescrip }

			/>
			<UploadImg 
				toastRef = { toastRef }
				setimagesSelect = { setimagesSelect }
				imagesSelect = { imagesSelect }
			/>
			<Button
				title 		= "Crear Item"
				onPress 	= {addItem}
				buttonStyle = {styles.btnAddItem}
			/>
		</ScrollView>
		)
}

function ImagesItem(props){
	const { imagesItems } = props

	return(
		<View style = { styles.viewPhotos }>
			 <Image
			 		source = {imagesItems ? { uri: imagesItems } : require("../../../assets/img/no-image.png")}
			 		style = {{ width: widthScreen , height: 200 }}
			 />
		</View>
		)
}

function FromAdd(props){
	const { setItemName, setItemDescrip } = props;
	return(
			<View style = { styles.viewFrom }>
				<Input
					placeholder 	= "Nombre de la propuesta.."
					containerStyle  = { styles.btnContainer }
					onChange		= { e => setItemName( e.nativeEvent.text ) }
				/>
				<Input
					placeholder 	= "Direccion"
					containerStyle  = { styles.btnContainer }
					onChange		= { e => setDireccion( e.nativeEvent.text ) }
					rightIcon = {{
						type: "material-comunity",
						name: "maps",
						color: "#c2c2c2"
					}}
				/>
				<Input
					placeholder 	= "Descriocion de la propuesta"
					multiline 		= {true}
					containerStyle  = { styles.btnTexArea }
					onChange		= { e => setItemDescrip( e.nativeEvent.text ) }
				/>
			</View>
		);
}

function UploadImg(props){

	const { toastRef, setimagesSelect, imagesSelect } = props;

	const imageSelect = async () =>{
		 const  resulPermission = await Permissions.askAsync(Permissions.CAMERA);

		 if (resulPermission === 'denied') {
		 		toastRef.current.show("Es necesario aceptar los permisos de la galeria",3000);
		 }else{
		      const result = await ImagePicker.launchImageLibraryAsync({
		        allowsEditing: true,
		        aspect: [4, 3],
		        quality: 1,
		        base64: true,
		        mediaTypes: ImagePicker.MediaTypeOptions.Images,
		      });
		      if (result.cancelled) {
		        toastRef.current.show("Has Cerrado la seleccion de imagenes");
		      }else{
		      		setimagesSelect([...imagesSelect, result.uri]);
		      }
		 }
	}

	const removeImage = (image) => {
		

		Alert.alert(
			"Eliminar Imagen",
			"¿Estas seguro de que quieres eliminar la imagen",
			[
				{
					text: "Cancelar",
					style: "cancel"
				},
				{
					text: "Eliminar",
					onPress:() => {
							setimagesSelect(
								filter(imagesSelect, (imageUrl) => imageUrl != image )
								);
						
					}
				}
			],
			{ cancelable: false }
			);
	}


	return(
		<View style = {styles.viewimg }>

			 {size(imagesSelect) < 4 && (
					 	<Icon
						 	type = "material-community"
						 	name = "camera"
						 	color = "#a7a7a7"
						 	containerStyle = { styles.containerIcon }
						 	onPress = { imageSelect }
					 />
			 	)}			 

			 {map(imagesSelect,( imagesItems, index ) => (
			 	<Avatar
			 		key = { index }
			 		style = { styles.avatarminiature }
			 		source = {{ uri: imagesItems }}
			 		onPress = {() => removeImage(imagesItems)}
			 	 />
			 	))}
		
			
		</View>

		)
}

const styles = StyleSheet.create({
	scrollView: {
		height: "100%",

	},
	viewFrom:{
		marginLeft: 10,
		marginRight: 10,
	},
	btnContainer:{
		marginBottom: 10,
	},
	btnTexArea: {
		height: 200,
		width: "100%",
		padding: 0,
		margin: 0,
	},
	btnAddItem:{
		backgroundColor: "#00a680",
		margin: 20,
	},
	viewimg:{
		flexDirection: "row",
		marginLeft: 20,
		marginRight: 20,
		marginTop: 30,
	},
	containerIcon:{
		alignItems: "center",
		justifyContent: "center",
		marginRight: 10,
		height: 70,
		width: 70,
		backgroundColor: "#e3e3e3",
	},
	avatarminiature:{
		width: 70,
		height: 70,
		marginRight: 10,
	},
	viewPhotos:{
		alignItems: "center",
		height: 200,
		marginBottom: 20,
	}
});