import React from "react";
import {PermissionsAndroid} from 'react-native';
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";




export default function InfoUser(props){

	const { userInfo:{ uid, photoURL, displayName, email }
					,toastRef
					,setCargando
					,setCargandoTex }	= props;

	console.log(props.userInfo);


	// FUNCTION......

	const changeAvatar = async() => {

		  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [4,3],
			});

			if(result.cancelled){
					toastRef.current.show("Has Cerrado la seleccion de imagenes");
			}else{
				uploadImage(result.uri).then(()=>{
					toastRef.current.show("Imagen subida");
					updatePhotoUrl();
					
				}).catch(()=>{
					toastRef.current.show("Error al actualizar Avatar..");
				});
			}

			
    } else {
      toastRef.current.show("Es necesario aceptar los permisos de la galeria");
    }
  } catch (err) {
    console.warn(err);
  }

	


		

	};

	// subir imagen a firebase 

	const uploadImage = async (uri) =>{
		setCargandoTex("Actualizando Avatar");
		setCargando(true);

		const response = await fetch(uri);
		const blob		 = await response.blob();

		const ref 		 = firebase.storage().ref().child(`Avatar/${uid}`);
		return ref.put(blob);	

	}

	//actualizar foto 

	const updatePhotoUrl = () =>{
		firebase
			.storage()
			.ref(`Avatar/${uid}`)
			.getDownloadURL()
			.then( async (response)=>{

				const update = {
					photoURL: response
				};

				await firebase.auth().currentUser.updateProfile(update);
				setCargando(false);
				
			})
			.catch(()=>{
				toastRef.current.show("Error al actualizar Avatar...");
			});
			

	};


	return(
		<View style = { styles.viewContain }>
			<Avatar
				rounded
				size = "large"	
				showEditButton
				onEditPress = { changeAvatar }
				containerStyle = { styles.userInfoAvatar }
				source	= {
					photoURL ? { uri: photoURL } : require("../../../assets/img/avatar-default.jpg")
				}
			/>
			<View>
				<Text style ={ styles.displayNames }>
					{ displayName ? displayName : "Anonimo" }
				</Text>
				<Text>
					{ email ? email : "Anonimo" }
				</Text>
			</View>
				
			
		</View>
		);
}

const styles = StyleSheet.create({

	viewContain:{
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		backgroundColor: "#f2f2f2",
		paddingTop: 30,
		paddingBottom: 30,

	},

	userInfoAvatar:{
		marginRight:20
	},

	displayNames:{
		fontWeight: "bold",
		paddingBottom:10
	}
	
});