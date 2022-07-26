import React, { 
	// useEffect, 
	// useState 
} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './CircleToggleStyle';

import TitleText from 'qualificame-native/app/components/TitleText';

export default function CircleToggle (props) {

	let gradientColors;
	switch(props.bgColor) {
		case 'green':
			gradientColors = ['#0F9F92', '#12B184'];
		break;
		case 'blue':
			gradientColors = ['#154BBA', '#107EC2'];
		break;
		case 'orange':
			gradientColors = ['#E62808', '#FC680A'];
		break;
		case 'pink':
			gradientColors = ['#E31862', '#EB194D'];
		break;
		case 'dark':
			gradientColors = ['#364350', '#364350'];
		break;
		case 'gray':
			gradientColors = ['#ccc', '#ccc'];
		break;
		default:
			gradientColors = ['#fff', '#fff'];
		break;
	}

	return (
		<LinearGradient colors={gradientColors} style={[styles.circle, props.style, props.disabled && { opacity: 0.5 }]} start={[0, 0]} end={[1, 0]}>
			<TouchableOpacity
				onPress={() => props.onPress()}
				activeOpacity={0.6}
			>
				<TitleText
					text={props.text}
					color='white'
				/>
			</TouchableOpacity>
		</LinearGradient>
	);
}


CircleToggle.propTypes = {
	text: PropTypes.string,
	disabled: PropTypes.bool,
	onPress: PropTypes.func
	// data: PropTypes.array
}

CircleToggle.defaultProps = {
	text: '',
	disabled: false,
	onPress: () => {}
	// data: []
}







