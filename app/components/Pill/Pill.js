import React, { PureComponent } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import BodyText from 'qualificame-native/app/components/BodyText';

import { Colors } from 'qualificame-native/app/styles';
import styles from './PillStyle';

export default class Pill extends PureComponent {
	render() {
	let textColor;
	let bgColor;
	let imageSrc;
	switch(this.props.reaction) {
		case 'excelent' :
			imageSrc = require('qualificame-native/assets/excelent.png');
			textColor="green"
			bgColor="lightGreen"
		break;
		case 'good':
			imageSrc = require('qualificame-native/assets/good.png');
			textColor="blue"
			bgColor="lightBlue"
		break;
		case 'bad' :
			imageSrc = require('qualificame-native/assets/bad.png');
			textColor="orange"
			bgColor="lightOrange"
		break;
		case 'horrible' :
			imageSrc = require('qualificame-native/assets/horrible.png');
			textColor="pink"
			bgColor="lightPink"
		break;
	}
		return (
			<TouchableOpacity 
				style={[styles.pillStyle, styles.row, styles.alignItemsCenter, styles.tinyVerticalPadding, this.props.isPill && styles.smallHorizontalPadding, this.props.isPill && {backgroundColor: Colors[bgColor] }]}
				onPress={() => this.props.onPress()}
				disabled={this.props.disabled}
			>
				<View style={styles.smallRightMargin}>
					<Image
						style={{width:32, height:32}}
						source={imageSrc}
					/>
				</View>
				<BodyText 
					text={this.props.amount}
					color={textColor}
				/>
			</TouchableOpacity>

		);
	}
}

	Pill.propTypes = {
		reaction: PropTypes.string,
		amount: PropTypes.string,
		disabled: PropTypes.bool,
		isPill: PropTypes.bool,
		onPress: PropTypes.func
	}

	Pill.defaultProps = {
		reaction: "excelent",
		amount: "",
		disabled: false,
		isPill: true,
		onPress: () => {}
	}
