import React, { useState, useEffect } 									from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions, PermissionsAndroid }  from "react-native";
import {Icon, Avatar, Image, Input, Button  } 				from "react-native-elements";
import { map, size, filter } from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import uuid from "random-uuid-v4";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

import Modal from "../Modal";


// detectar el ancho del m
const widthScreen = Dimensions.get("window").width;

export default function AddItemFrom( props ){

	const { toastRef, setCargando, navigation } = props;

	const [ itemName, setItemName ] 		= useState("");
	const [ itemDireccion, setDireccion] 		= useState("");
	const [ itemDescrip, setItemDescrip ] 	= useState("");

	const [ imagesSelect, setimagesSelect]   = useState([]);
// map estado
	const [ isVisibleMap, setIsVisibleMap ]   = useState(false);

// location de item 

	const [ locatioItem, setLocatioItem ] = useState(null);

	const addItem = () =>{
		if(!itemName || !itemDescrip || !itemDireccion){
			toastRef.current.show("Todos los campos del fromulario son obligatorios");
		}else if(size(imagesSelect) === 0){
			toastRef.current.show("Selecciona almenos una foto");
		}else if(!locatioItem){
			toastRef.current.show("Tienes que seleccionar la localizacion ");
		}else{
			setCargando(true);
			uploadImgStorage().then((response) => {

				db.collection("items")
				.add({
					name: itemName,
					address: itemDireccion,
					description: itemDescrip,
					location: locatioItem,
					images: response,
					rating:0,
					ratingTotal:0,
					contVoting:0,
					createAt:new Date(),
					createBy: firebase.auth().currentUser.uid,
				})
				.then(() => {
					setCargando(false);
					toastRef.current.show(
						"Se creo el Item correctamente"
						);
					navigation.navigate("home");
				})
				.catch(()=>{
					setCargando(false);	
					toastRef.current.show(
						"Error al subir el Item, Intentolo mas tarde"
						);
				})
				
				
				
			});
		}
	}

	// subir imagenes

	const uploadImgStorage = async () => {

		const imageBlob = [];

		await Promise.all(
				map(imagesSelect, async (image) => {
					const respose = await fetch(image);
					const blob = await respose.blob();

					const ref = firebase.storage().ref("ItemImg").child(uuid());

					await ref.put(blob).then( async (result) => {
							await firebase
							.storage()
							.ref(`ItemImg/${result.metadata.name}`)
							.getDownloadURL()
							.then((photoUrl) =>{
								imageBlob.push(photoUrl);
							});
					});
				})	
			);

		
		return imageBlob;
	}


	

	return(
		<ScrollView style= {styles.scrollView} >

			
		<ImagesItem 
			imagesItems = { imagesSelect[0] }
		/>
			<FromAdd
				setItemName 	= { setItemName }
				setItemDescrip  = { setItemDescrip }
				setDireccion  = { setDireccion }
				setIsVisibleMap = { setIsVisibleMap }
				locatioItem = { locatioItem }

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


			<MapModal  
				isVisibleMap = { isVisibleMap } 
				setIsVisibleMap = { setIsVisibleMap }
				setLocatioItem = { setLocatioItem }
				toastRef = { toastRef }
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
	const { setItemName, setItemDescrip, setDireccion, setIsVisibleMap, locatioItem } = props;
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
						name: "navigation",
						color: locatioItem ? "#00a680" : "#c2c2c2",
						onPress: () => setIsVisibleMap(true)
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

function MapModal(props){
	const { isVisibleMap, setIsVisibleMap, toastRef, setLocatioItem } = props;
	const [ location, setLocation ] = useState(null);

	useEffect(()=>{
		(async()=>{
			const resulPermission = await Permissions.askAsync(
				Permissions.LOCATION
				);

			const statusPermission = resulPermission.permissions.location.status;

			if(statusPermission != "granted"){
				toastRef.current.show("Tienes que Aceptar los permisos de localizacion..", 3000);
			}else{
				const loc = await Location.getCurrentPositionAsync({});

				setLocation({
					latitude: loc.coords.latitude,
					longitude: loc.coords.longitude,
					latitudeDelta:0.001,
					longitudeDelta:0.001
				})

				
			}

			
		})();
	},[]);

	const confirLocation = () =>{
		setLocatioItem(location);
		toastRef.current.show("localizacion Guardada correctamente... ");
		setIsVisibleMap(false);
	}



	return(
		<Modal isVisible = { isVisibleMap } setIsVisible = { setIsVisibleMap } >
			<View>
				{location && (
					<MapView
						style = { styles.mapStyle }
						initialRegion = { location }
						showsuserLocation = {true}
						onRegionChange = {(region) => setLocation(region)}
					>
					<MapView.Marker
						coordinate = {{
							latitude: location.latitude,
							longitude: location.longitude,
						}}
						draggable
					/>
					</MapView>
					)}
			</View>

			<View style = {styles.mapBtn}>
				<Button
					title = "Guardar Ubicacion"
					containerStyle = { styles.mapBtnOk }
					buttonStyle = { styles.mapBtnOkStyle }
					onPress = {confirLocation}
				/>
				<Button
					title = "Cancelar"
					containerStyle = { styles.mapBtnCancel }
					buttonStyle = { styles.mapBtnCancelStyle }
					onPress = {() => setIsVisibleMap(false)}

				/>
			</View>
		</Modal>
		)

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
	},
	mapStyle:{
		width:"100%",
		height:550,
	},
	mapBtn:{
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 10
	},
	mapBtnCancel:{
		paddingLeft: 5
	},
	mapBtnCancelStyle:{
		backgroundColor: "#a60d0d"
	},
	mapBtnOk:{
		paddingRight: 5
	},
	mapBtnOkStyle:{
		backgroundColor: "#00a680"
	}

});