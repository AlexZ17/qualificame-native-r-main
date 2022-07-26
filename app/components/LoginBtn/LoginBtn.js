import React, { PureComponent } from 'react';
import {
	View,
	TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './LoginBtnStyle';
import BodyText from 'qualificame-native/app/components/BodyText';

export default class LoginBtn extends PureComponent {
	render() {
		return (
			<TouchableOpacity
				onPress={this.props.onPress}
				style={this.props.style}
				activeOpacity={0.6}
			>
				<View	style={{padding: 5}}>
					<BodyText
						text="Iniciar sesión"
						color="white"
						weight="bold"
					/>
				</View>
			</TouchableOpacity>
		);
	}
}

LoginBtn.propTypes = {
	onPress: PropTypes.func
}

LoginBtn.defaultProps = {
	onPress: () => { }
}
