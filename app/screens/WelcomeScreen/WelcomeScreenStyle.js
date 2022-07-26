import { StyleSheet } from 'react-native';
import { Fonts, Colors, ApplicationStyles } from 'qualificame-native/app/styles';

export default StyleSheet.create({
	...ApplicationStyles.screen,
	...ApplicationStyles.margins,
	...ApplicationStyles.flexBox,
	
	buttonstyle:{
		borderWidth: 1,
		borderColor: '#FFFFFF',
		borderRadius: 5,
		backgroundColor: '#0190DF',
	}
});
