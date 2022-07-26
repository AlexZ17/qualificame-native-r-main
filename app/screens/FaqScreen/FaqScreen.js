import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView
} from 'react-native';

import styles from './FaqScreenStyle';
import { Colors, ApplicationStyles } from 'qualificame-native/app/styles';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import TitleText from 'qualificame-native/app/components/TitleText';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import AlertBtn from 'qualificame-native/app/components/AlertBtn';
import ListItem from 'qualificame-native/app/components/ListItem';
import IconAndText from 'qualificame-native/app/components/IconAndText';
import BackBtn from 'qualificame-native/app/components/BackBtn';
import Divider from 'qualificame-native/app/components/Divider';

export default class FaqScreen extends Component {
	static navigationOptions = {
		headerShown: false
	}
	render() {
		return (
			<View style={styles.container}>
				<HeaderNavbar
					left={ <BackBtn color='white'/> }
					center={
						<TitleText
							text="Preguntas"
							color="white"
						/>
					}
					right={
						<AlertBtn
							onPress={()=> this.props.navigation.navigate('AlertsScreen')}
						/>
					}
					bgColor="pink"
				/>
				<ScrollView>
					<View style={[styles.baseHorizontalMargin, styles.baseVerticalMargin]}>
						<TitleText
							text="Preguntas frecuentes"
							color="pink"
						/>
						<View style={styles.baseVerticalMargin}>
							<SubtitleText
								text="¿Puedo tener más de un kiosco?"
							/>
							<View style={styles.smallLeftMargin}>
								<ListItem
									text="Sí, puedes tener tantos kioscos como lo desees."
									color="pink"
								/>
								<ListItem
								text="Para obtener un plan personalizado, contáctanos a nuestro teléfono de atención al cliente: 771-234-56-78"
								color="pink"
								/>
							</View>
						</View>
						<View style={styles.baseVerticalMargin}>
							<SubtitleText
								text="¿Puedo generar estadísticas con las opiniones de los clientes?"
							/>
							<View style={styles.smallLeftMargin}>

							</View>
						</View>
						<View style={styles.baseVerticalMargin}>
							<SubtitleText
								text="¿Existe un número máximo de clientes que puedan participar en la encuesta diaria?"
							/>
							<View style={styles.smallLeftMargin}>
								<ListItem
									text="No, pueden participar tantos como deseen."
									color="pink"
								/>
							</View>
						</View>
						<View style={styles.baseVerticalMargin}>
							<SubtitleText
								text="¿Qué cambios puedo realizar para personalizar la encuesta?"
							/>
							<View style={styles.smallLeftMargin}>

							</View>
						</View>
						<View style={styles.baseTopMargin}/>
						<TitleText
							text="Contáctanos, estamos para servirte"
							color="pink"
						/>
						<View style={[styles.baseVerticalMargin, styles.baseHorizontalMargin]}>
							<IconAndText
								text="771-234-56-78"
								iconColor="pink"
								iconName="phone"
								addVerticalMargin
							/>
							<Divider color="lightGray"/>
							<IconAndText
								text="hola@qualificame.com"
								iconColor="pink"
								iconName="mail"
								addVerticalMargin
							/>
							<Divider color="lightGray"/>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}
