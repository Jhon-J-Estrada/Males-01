import React from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";

export default function ListItem(props){
	const { listItem } = props;

	//const listItem = [];

	return(
			<View >
				{size(listItem) > 0 ? (
					
					<FlatList
						data = {listItem}
						renderItem={(item)=> <Item item={item}/>}
						keyExtractor={(item, index ) => index.toString()}
					/>

					) : (
						<View style = { styles.lodasItems }>
							<ActivityIndicator size="large" color="#c2c2c2"/>
							 
							<Text>Cargando Items</Text>
						</View>
					)}
			</View>
		);
}

function Item(props){
	const { item } = props;


	const { images } = item.item;
	const imagenItem = images[0];



	const goItem = () =>{

	}

	return(
		<TouchableOpacity onPress = {goItem}>
			<View style = {styles.viewItem}>
				<View style = {styles.viewItemImage}>
					<Image
						resizeMode = "cover"
						placeholderContent = {<ActivityIndicator size="large" color="#c2c2c2"/>}
						source={
							imagenItem ? {uri: imagenItem}:  require("../../../assets/img/no-image.png")
						}
						style = {styles.imagesItems}
					/>

				</View>
				
			</View>
		</TouchableOpacity>
		);
}


const styles = StyleSheet.create({
	lodasItems:{
		marginTop: 10,
		marginBottom:10,
		alignItems: "center",
	},
	viewItem:{
		flexDirection: "row",
		margin:10
	},
	viewItemImage:{
		marginRight: 15
	},
	imagesItems:{
		width:80,
		height:80
	}


	
});