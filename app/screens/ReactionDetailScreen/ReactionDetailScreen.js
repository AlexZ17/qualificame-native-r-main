import React, {
	// useEffect,
	useState,
	useEffect
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, Alert, FlatList, ActivityIndicator } from "react-native";
import HeaderNavbar from "qualificame-native/app/components/HeaderNavbar";
import CloseBtn from "qualificame-native/app/components/CloseBtn";
import ListEmptyState from 'qualificame-native/app/components/ListEmptyState';
import HugeText from 'qualificame-native/app/components/HugeText';
import BodyText from "qualificame-native/app/components/BodyText";
import Pill from "qualificame-native/app/components/Pill";
import moment from "moment";

import styles from "./ReactionDetailScreenStyle";
import { Colors } from 'qualificame-native/app/styles';

import TotalResponse from "qualificame-native/app/components/TotalResponse";
import ApiService from "../../services/ApiService";

export default function ReactionDetailScreen(props) {
	const [state, setState] = useState({
		kiosk: props.navigation.state.params.kiosk,
		total: props.navigation.state.params.total,
		reaction: props.navigation.state.params.reaction,
		screen: props.navigation.state.params.screen
	});

	let value;
	let resptotalcount;
	switch (state.reaction) {
		case "excelent":
			resptotalcount = "green";
			value = 1;
			break;
		case "good":
			resptotalcount = "blue";
			value = 2;
			break;
		case "bad":
			resptotalcount = "orange";
			value = 3;
			break;
		case "horrible":
			resptotalcount = "pink";
			value = 4;
			break;
		default:
			resptotalcount = "gray";
			break;
	}

	useEffect(() => {
		getResponses(state.screen === "reports" ? (state.kiosk.kiosk_id) : state.kiosk.id);
	}, [])

	const [resptotalquest, setResptotalquest] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getResponses = async id => {
		try {
			let events_aggregations = await ApiService.eventsKiosksAggregations(id, value, state.kiosk.start_datetime, state.kiosk.end_datetime)
			setResptotalquest(events_aggregations.events.length ? events_aggregations.events: [])
			setIsLoading(false)
		} catch (e) {
			setIsLoading(false)
			Alert.alert(
				"¡Oops! Ocurrió un error",
				"Ocurrió un error al cargar los datos, refresca la pagina e intenta de nuevo"
			);
			throw e;
		}
	};

	return (
		<View style={styles.container}>
			<HeaderNavbar
				right={<CloseBtn onPress={() => props.navigation.goBack()} />}
			/>
			<View style={[styles.flex1, styles.baseHorizontalMargin]}>
				<HugeText
					text={`Respuestas\n${state.kiosk.name}`}
					weight="bold"
					color="dark"
				/>
				<View style={[styles.row, styles.alignItemsCenter]}>
					{state.kiosk.start_datetime && state.kiosk.end_datetime ? (
						<View style={styles.baseVerticalMargin}>
							<View style={styles.row}>
								<BodyText text="Desde: " color="blue" />
								<BodyText
									text={` ${moment(
										state.kiosk.start_datetime
									).format("D MMMM")} a las ${moment(
										state.kiosk.start_datetime
									).format("HH:mm")} `}
								/>
							</View>
							<View style={styles.row}>
								<BodyText text="Hasta: " color="blue" />
								<BodyText
									text={` ${moment(
										state.kiosk.end_datetime
									).format("D MMMM")} a las ${moment(
										state.kiosk.end_datetime
									).format("HH:mm")} `}
								/>
							</View>
						</View>
					) : (
						<View style={styles.baseVerticalMargin}>
							<BodyText
								text={moment().format("DD [de] MMMM [de] YYYY")}
								weight="light"
								color="lightBlack"
							/>
						</View>
					)}
					<View style={styles.baseHorizontalMargin}>
						<BodyText
							text={`\u2022`}
							weight="light"
							color="lightBlack"
						/>
					</View>
					<Pill
						isPill={false}
						disabled={true}
						amount={state.total}
						reaction={state.reaction}
					/>
				</View>
				{isLoading ? (
					<View style={[styles.flex1, styles.justifyContentCenter]}>
						<ActivityIndicator size='large' color={Colors[resptotalcount]}/>
					</View>
				) : resptotalquest.length ? (
					<React.Fragment>
						<FlatList
							style={styles.flex1}
							contentContainerStyle={styles.baseHorizontalPadding}
							data={resptotalquest}
							keyExtractor={(item, index) => `${item.id}-${index}`}
							renderItem={({item, index}) => (
								<TotalResponse
									option={`Opción ${index + 1}`}
									color={resptotalcount}
									question={`${item.description}`}
									numquestion={`${item.total}`}
									inactive={!item.active}
								/>
							)}
						/>
					</React.Fragment>
				) : (
					<View style={[styles.flex1, styles.justifyContentCenter]}>
						<ListEmptyState
							text="Parece que no hay datos que mostrar. Puede que usted no haya activado la opción de preguntas"
							color={resptotalcount}
						/>
					</View>
				)}
			</View>
		</View>
	);
}
