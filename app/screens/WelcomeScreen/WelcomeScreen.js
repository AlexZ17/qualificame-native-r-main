import React, { Component } from 'react';
import { View, ScrollView, ImageBackground, SafeAreaView } from 'react-native';
import styles from './WelcomeScreenStyle';
import HugeText from 'qualificame-native/app/components/HugeText';
import TitleText from 'qualificame-native/app/components/TitleText';
import SubtitleText from 'qualificame-native/app/components/SubtitleText';
import BodyText from 'qualificame-native/app/components/BodyText';
import LabelText from 'qualificame-native/app/components/LabelText';
import TinyText from 'qualificame-native/app/components/TinyText';
import ResizableLogo from 'qualificame-native/app/components/ResizableLogo';
import PrimaryBtn from 'qualificame-native/app/components/PrimaryBtn';
import SecondaryBtn from 'qualificame-native/app/components/SecondaryBtn';
import TextDivider from 'qualificame-native/app/components/TextDivider';
import AlertBtn from 'qualificame-native/app/components/AlertBtn';
import LabeledInput from 'qualificame-native/app/components/LabeledInput';
import HeaderNavbar from 'qualificame-native/app/components/HeaderNavbar';
import LoginBtn from 'qualificame-native/app/components/LoginBtn';
import IconButton from 'qualificame-native/app/components/IconButton';

import AuthTestContainer from 'qualificame-native/app/containers/AuthTestContainer';

export default class WelcomeScreen extends Component {
	static navigationOptions = {
		headerShown: false
	}
	render() {
		return (
			<View class={styles.container}>
				<ImageBackground source={require('qualificame-native/assets/bgblue.png')} style={[styles.fill]}>
					<HeaderNavbar
						center={
							<LoginBtn
								style={styles.buttonstyle}
								stylet={styles.textbuttonstyle}
								onPress={() => this.props.navigation.navigate('LoginScreen')}
							/>
						}
						statusBar="light-content"
					/>
					<SafeAreaView style={[styles.flex1, styles.baseHorizontalMargin, styles.justifyContentFlexEnd]}>
						<View style={[styles.baseVerticalMargin, styles.centerObjects]}>
							<ResizableLogo
								size="large"
							/>
						</View>
						<View style={styles.baseTopPadding, styles.baseBottomPadding}>
							<TitleText
								text="Conoce la experiencia de tus clientes en tiempo real"
								color="white"
								weight="bold"
								align="center"
							/>
						</View>
						<View style={styles.baseTopPadding, styles.baseBottomPadding}>
							<TinyText
								text="Analiza, pondera y toma decisiones, lleva a tu negocio al siguiente nivel de satisfacción."
								color="white"
								weight="light"
								align="center"
							/>
						</View>
						<View style={styles.baseTopMargin}>
							<AuthTestContainer>
								{(test) => (
									<PrimaryBtn
										text="Comenzar"
										onPress={() => {
											this.props.navigation.navigate('SignUpScreen');
										}}
									/>
								)}
							</AuthTestContainer>
						</View>
						<View style={[styles.centerObjects, styles.smallVerticalMargin]}>
							{/*<IconButton
								iconName= 'play-circle'
								color= 'white'
								text= 'Ver Introducción'
								status= {true}
							/>*/}
						</View>
					</SafeAreaView>
				</ImageBackground>
			</View>
		);
	}
}
