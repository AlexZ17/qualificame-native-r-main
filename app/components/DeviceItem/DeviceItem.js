import React, { 
	// useEffect, 
	// useState 
} from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './DeviceItemStyle';
import { Colors } from 'qualificame-native/app/styles';

import BodyText from 'qualificame-native/app/components/BodyText';
import LabelText from 'qualificame-native/app/components/LabelText';

import { Feather } from '@expo/vector-icons';
import moment from 'moment';

export default function DeviceItem (props) {
	
	let date = `${moment(props.date).format('DD')} \u2022 ${moment(props.date).format('MMMM')} \u2022 ${moment(props.date).format('YY')}`

	return (
		<View style={[styles.card, styles.row, styles.alignItemsCenter, styles.justifyContentSpaceBetween]}>
			<View style={styles.row}>
				<View style={[styles.baseHorizontalMargin, styles.justifyContentCenter]}>
					<Feather name='tablet' size={50} color={Colors.green}/>
				</View>
				<View style={[styles.justifyContentSpaceEvenly, styles.smallVerticalMargin]}>
					<BodyText
						color='green'
						text={props.name}
					/>
					<LabelText
						color='dark'
						text={date}
					/>
				</View>
			</View>
			<View style={styles.baseHorizontalMargin}>
				<TouchableOpacity
					onPress={() => props.onPress()}
					activeOpacity={0.6}
				>
					<Feather name='power' size={24} color={Colors.pink}/>
				</TouchableOpacity>
			</View>
		</View>
	);
}


DeviceItem.propTypes = {
	name: PropTypes.string,
	onPress: PropTypes.func
	// data: PropTypes.array
}

DeviceItem.defaultProps = {
	name: '',
	onPress: () => {}
	// data: []
}







