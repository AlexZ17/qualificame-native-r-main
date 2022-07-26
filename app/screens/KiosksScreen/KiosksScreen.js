import React, { useEffect } from 'react';
import {
	View,
	Image,
	FlatList,
} from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import styles from './KiosksScreenStyle';

import { getKiosks, getIsLoadingKiosks } from "qualificame-native/app/reducers";
import { registerNotificationHandler } from 'qualificame-native/app/services/NotificationService';
import { fetchKiosks } from 'qualificame-native/app/actions/KiosksActions';
import { fetchAlerts } from 'qualificame-native/app/actions/AlertsActions';

import AlertBtn from 'qualificame-native/app/components/AlertBtn';
import TitleText from 'qualificame-native/app/components/TitleText';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';
import KiosksListContainer from 'qualificame-native/app/containers/KiosksListContainer';
import AlertsNotificationContainer from 'qualificame-native/app/containers/AlertsNotificationContainer';
import ApiService from 'qualificame-native/app/services/ApiService';

import { getUserData } from "qualificame-native/app/reducers";
import UserData from 'qualificame-native/app/components/UserData';


export default function KiosksScreen(props) {
	let { userData } = useSelector(getUserData);

	let dispatch =  useDispatch();

	useEffect(() => {
		//myFunction(userData.email)
		registerNotificationHandler((notification) => {
			if (notification.data){
				if (notification.origin === 'received') {
					dispatch(fetchKiosks());
					dispatch(fetchAlerts());
				}
				if (notification.origin === 'selected') {
	  				props.navigation.navigate('AlertsScreen');
				}
			}
	  	})

	}
	, []);

	const myFunction = async function myFunction(data) {
		try{
			let buscar = await ApiService.getVentas(data);
			console.log(buscar.error);
			console.log("++++++")
			console.log(userData.email);
			console.log("-----");
			var emailCliente = buscar.autos[0].emailCliente;
			var fechaFinal = buscar.autos[0].fechaFinal;
			var numExtraKiosk = buscar.autos[0].numExtraKiosk;
			var numKiosk = buscar.autos[0].numKiosk;
			var planComprado = buscar.autos[0].planComprado;
			var mensajeVigencia = '';
			console.log(emailCliente);
			//////////////
			var currentDate2 = new Date();
			var twoDigitMonth=((currentDate2.getMonth()+1)>=10)? (currentDate2.getMonth()+1) : '0' + (currentDate2.getMonth()+1);
			var twoDigitDate=((currentDate2.getDate())>=10)? (currentDate2.getDate()) : '0' + (currentDate2.getDate());
			var createdDateTo = currentDate2.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate;
			/////////////////
			if(fechaFinal >= createdDateTo){
				//console.log("fechaFinal");
				mensajeVigencia = "Licencia Vigente";
				console.log(mensajeVigencia);
				console.log(currentDate2);
			}else{
				//console.log("createdDateTo");
				mensajeVigencia = "Licencia CADUCADA";
				console.log(mensajeVigencia);
				console.log(currentDate2);
				console.log("FechaFinal: ");
				console.log(fechaFinal);
				props.navigation.navigate('SelectPlanScreen');
			}
			console.log("--------------");
			console.log("+++++++++++++++");
		}catch (e) {
      alert('¡Oops! Ocurrió un error JAJA POR MENSO');
      console.log('error ' + e);
			props.navigation.navigate('SelectPlanScreen');
    }
}
	let allkiosks = useSelector(getKiosks);
	let isLoadingKiosks = useSelector(getIsLoadingKiosks);
	return (
		<View style={styles.container}>
			<Image
				style={[styles.absolute, styles.behind, styles.headerImage, {backgroundColor:"transparent"}]}
				source={require('qualificame-native/assets/green-waves-top.png')}
			/>
			<HeaderNavbar
				center={
					<ResizableLogo
						size="small"
					/>
				}
				right={
					<AlertsNotificationContainer>
						{ (unreadAlerts) => (
							<AlertBtn
							 	alertsAmount={unreadAlerts}
								onPress={()=>  props.navigation.navigate('AlertsScreen')}
							/>
						)}
					</AlertsNotificationContainer>
				}
				statusBar="light-content"
			/>
			<View style={[styles.flex1]}>
				<View style={styles.baseHorizontalMargin}>
					<TitleText
						text="Mis Kioskos"
						color="white"
						weight="bold"
					/>
				</View>
				<View style={styles.customSpacer}/>
				<View style={[styles.flex1, (allkiosks.length == 0 && styles.justifyContentCenter)]}>
					<View style={((allkiosks.length != 0 && styles.flex1) || (isLoadingKiosks && styles.flex1))}>
						<KiosksListContainer
							footer={<View style={(allkiosks.length != 0 ? styles.bottomViewHeight : styles.baseBottomMargin)}/>}
						/>
					</View>
					<View style={(allkiosks.length != 0 && styles.bottomView)}>
						<View style={[styles.baseBottomMargin, styles.baseHorizontalMargin]}>
							<PrimaryBtn
								onPress={ () => props.navigation.navigate('CreateKioskScreen')}
								text='Agregar Kiosko'
								bgColor="green"
							/>

							<PrimaryBtn
								onPress={ () => myFunction(userData.email)}
								text='SOLICITUD API'
								bgColor="blue"
							/>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}
KiosksScreen.navigationOptions = {
		headerShown: false
	}
