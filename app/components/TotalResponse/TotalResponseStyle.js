import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from 'qualificame-native/app/styles';
//import { ApplicationStyles } from 'qualificame-native/app/styles';

export default StyleSheet.create({
//	 ...ApplicationStyles.screen,
//	 ...ApplicationStyles.flexBox,
//	 ...ApplicationStyles.margins,
	card:{
		marginVertical: Metrics.smallMargin,
		padding: Metrics.smallMargin,
		borderRadius: 5,
	},
	baseHorizontalMargin: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	inactive: {
		opacity: 0.5
	}

});
