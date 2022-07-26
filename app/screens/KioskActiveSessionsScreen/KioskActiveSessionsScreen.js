import React, { 
	useEffect, 
	useState 
} from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	FlatList,
	Alert
} from 'react-native';

import styles from './KioskActiveSessionsScreenStyle';
import { Colors } from 'qualificame-native/app/styles';

import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import BackBtn from 'qualificame-native/app/components/BackBtn';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';
import CloseBtn from 'qualificame-native/app/components/CloseBtn';
import HugeText from 'qualificame-native/app/components/HugeText';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import DeviceItem from 'qualificame-native/app/components/DeviceItem';
import LabelText from 'qualificame-native/app/components/LabelText';
import ListEmptyState from 'qualificame-native/app/components/ListEmptyState';

import { Feather } from '@expo/vector-icons';
import moment from 'moment';

import ApiService from 'qualificame-native/app/services/ApiService';

export default function KioskActiveSessionsScreen (props) {
	const [state, setState] = useState({
		kiosk: props.navigation.state.params.kiosk
	});

	const [devices, setDevices] = useState([])
	
	useEffect(() => {
		getDevices(state.kiosk.id)
	}, [])	

	const getDevices = async (id) => {
		try {
			let {kiosk_devices} = await ApiService.getKioskDevices({ id })
			setDevices(kiosk_devices.length ? kiosk_devices : [])
		} catch(e) {
			Alert.alert('¡Oops! Ocurrió un error', 'Ocurrió un error al obtener las sesiones activas, inténtalo más tarde')
			throw e
		}
	}

	const logoutDevice = async (id) => {
		try {
			await ApiService.logoutDevices({ ids: id })
			getDevices(state.kiosk.id)
		} catch(e) {
			Alert.alert('¡Oops! Ocurrió un error', 'Ocurrió un error al cerrar la sesión, inténtalo más tarde')
			throw e
		}
	}

	const logoutDevices = async () => {
		try {
			let ids = devices.map(device => device.id)
			await ApiService.logoutDevices({ ids })
			getDevices(state.kiosk.id)
		} catch(e) {
			Alert.alert('¡Oops! Ocurrió un error', 'Ocurrió un error al cerrar las sesiones activas, inténtalo más tarde')
			throw e
		}	
	}

	return (
		<View style={styles.container}>
			<HeaderNavbar
				left={ <BackBtn/> } 
				center={
					<ResizableLogo
						size="small"
					/>
				}
				right={
					<CloseBtn 
						onPress={()=> props.navigation.goBack()}
					/>
				}
				statusBar="light-content"
			/>
			<View style={[styles.baseHorizontalMargin]}>	
				<HugeText 
					text={`Dispositivos\n${state.kiosk.name}`}
					weight="bold"
					color="dark"
				/>
			</View>
			{ devices.length ? (
				<React.Fragment>

					<View style={[styles.doubleBaseTopMargin, styles.baseBottomMargin, styles.baseHorizontalMargin]}>
						<SubtitleText 
							text='Sesiones activas'
							color="dark"
						/>
					</View>
					<FlatList
						style={styles.flex1}
						contentContainerStyle={styles.baseHorizontalPadding}
						data={devices}
						keyExtractor={(item, index) => `${item.name}-${index}`}
						renderItem={({item}) => (
							<DeviceItem
								name={item.name}
								date={item.created_at}
								onPress={() => {
										Alert.alert(
											'Cerrar sesión',
											'¿Estás seguro que deseas cerrar la sesión?',
											[
												{
													text: 'Cancelar',
													style: 'cancel'
												},
												{
													text: 'OK',
													onPress: () => logoutDevice(item.id) 
												}
											]
										);
									}
								}
							/>
						)}
					/>
					{
						devices.length > 1 && (
							<View style={[styles.baseHorizontalMargin, styles.justifyContentFlexStart]}>	
								<TouchableOpacity
									style={[styles.row, styles.justifyContentCenter, styles.alignItemsCenter, styles.baseVerticalMargin]}
									onPress={() => {
										Alert.alert(
											'Cerrar sesión',
											'¿Estás seguro que deseas cerrar las sesiones de todos los dispositivos?',
											[
												{
													text: 'Cancelar',
													style: 'cancel'
												},
												{
													text: 'OK',
													onPress: () => logoutDevices()
												}
											]
										);
										
									}}
									activeOpacity={0.6}
								>
									<View style={styles.smallRightMargin}>
										<Feather name='power' size={24} color={Colors.pink}/>
									</View>
									<LabelText
										color='pink'
										text='Desconectar todos los dispositivos'
									/>
								</TouchableOpacity>
							</View>
						)
					}
				</React.Fragment>
			) : (
				<View style={[styles.flex1, styles.justifyContentCenter, styles.alignItemsCenter]}>
					<ListEmptyState
						text='Parece que no hay sesiones activas'
						color='green'
					/>
				</View>
			)}
		</View>
	);
}




