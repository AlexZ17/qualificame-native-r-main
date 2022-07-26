import React, { useEffect, useState } from "react";
import styles from "./TotalResponseStyle";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import LabeledInput from 'qualificame-native/app/components/LabeledInput';
import BodyText from 'qualificame-native/app/components/BodyText';
export default function TotalResponse(props) {
	return (
		<View
			style={[
				styles.card,
				styles.row,
				styles.alignItemsCenter,
				styles.justifyContentSpaceBetween,
				props.inactive &&  styles.inactive
			]}
		>
			<LabeledInput 
				label={props.option} 
				color={props.color}
			>
				<View style={[styles.baseHorizontalMargin, styles.justifyContentCenter]}>
					<BodyText
						text={props.question}
					/>
					<BodyText
						color={props.color}
						text={props.numquestion}
					/>
				</View>
			</LabeledInput>
		</View>
	);
}

TotalResponse.propTypes = {
	// data: PropTypes.array
};

TotalResponse.defaultProps = {
	// data: []
};
