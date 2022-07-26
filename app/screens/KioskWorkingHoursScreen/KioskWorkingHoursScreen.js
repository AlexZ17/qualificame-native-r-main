import React, { 
	// useEffect, 
	useState
} from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';

import styles from './KioskWorkingHoursScreenStyle';
import { Colors } from 'qualificame-native/app/styles';

import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import BackBtn from 'qualificame-native/app/components/BackBtn';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';
import CloseBtn from 'qualificame-native/app/components/CloseBtn';
import HugeText from 'qualificame-native/app/components/HugeText';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import LabeledInput from 'qualificame-native/app/components/LabeledInput';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';

import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import { useDispatch } from "react-redux";
import { updateKiosk } from 'qualificame-native/app/actions/KiosksActions';

export default function KioskWorkingHoursScreen (props) {
	let [kiosk] = useState(props.navigation.state.params.kiosk)
	let [showTimePicker, setShowTimePicker] = useState(false)
	let [startTime, setStartTime] = useState(kiosk.beginning_of_day && moment(kiosk.beginning_of_day).toDate())
	let [endTime, setEndTime] = useState(kiosk.end_of_day && moment(kiosk.end_of_day).toDate())
	let [fieldname, setFieldname] = useState()
	const dispatch = useDispatch()

	let showPicker = (field) => {
		setShowTimePicker(true);
		setFieldname(field)
	}

	let handleShowTime = () => {
		if(fieldname === 'startTime')
			return startTime ? startTime : new Date;
		else if(fieldname === 'endTime')
			return endTime ? endTime : new Date;
	}

	let handleTimePicked = date => {
		let start;
		let end = moment(moment(date).toISOString(true)).toDate();

		if(fieldname === 'endTime')
			start = moment(startTime).toISOString(true);
		if(start) {
			if(moment(start).isAfter(moment(end).toISOString(true))) {
				end = moment(moment(end).add(1, 'days').toISOString(true)).toDate();
			}
		}

		if(fieldname === 'startTime')
			setStartTime(end)
		else if(fieldname === 'endTime')
			setEndTime(end)

		hideDateTimePicker();
	}

	let hideDateTimePicker = () => {
		setShowTimePicker(false);
		setFieldname(null)
	}

	let handleSaveData = () => {
		let start = moment(startTime);
		let end = moment(endTime);
		dispatch(updateKiosk({kiosk : { id: kiosk.id, beginning_of_day: start, end_of_day: end }}));
		props.navigation.navigate('KiosksScreen');
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
			<View style={[styles.flex1, styles.baseHorizontalMargin]}>	
				<HugeText 
					text={`Horario laboral\n${kiosk.name}`}
					weight="bold"
					color="dark"
				/>
				<View style={[styles.doubleBaseTopMargin, styles.smallBottomMargin]}>
					
						<TouchableOpacity 
							onPress={() => showPicker('startTime')}
							activeOpacity={1}
							style={styles.elevation}
						>
							<LabeledInput
								color='green'
								label="Hora de apertura"
							>
								<View style={[styles.inputContent]}>
									<TextInput
										editable={false} 
										value={startTime ? moment(startTime).format('HH:mm') : startTime }
										placeholder="00:00"
										placeholderTextColor={Colors.gray}
										style={startTime ? { color:Colors.green } : { color:Colors.subdued }}
										selectionColor={Colors.green}
									/>
								</View>
							</LabeledInput>
						</TouchableOpacity>
						<TouchableOpacity 
							disabled={!startTime}
							onPress={() => showPicker('endTime')}
							activeOpacity={1}
							style={styles.elevation}
						>
							<LabeledInput
								color={!startTime ? 'subdued': 'green'}
								label="Hora de cierre"
							>
								<View style={[styles.inputContent]}>
									<TextInput
										editable={false} 
										value={endTime ? moment(endTime).format('HH:mm') : endTime }
										placeholder="00:00"
										placeholderTextColor={Colors.gray}
										style={endTime ? { color:Colors.green } : { color:Colors.subdued }}
										selectionColor={Colors.green}
									/>
								</View>
							</LabeledInput>
						</TouchableOpacity>
				</View>
				<View style={[styles.baseHorizontalMargin, styles.baseVerticalMargin]}>
					<PrimaryBtn
						disabled={!startTime && !endTime}
						onPress={() => handleSaveData()} 
						text="Guardar"
						bgColor="green"
					/>
				</View>
			</View>
			<DateTimePicker
				mode='time'
				date={handleShowTime()}
				isVisible={showTimePicker}
				onConfirm={handleTimePicked}
				onCancel={hideDateTimePicker}
			/>
		</View>
	);
}