import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from './src/config/colors';
import Value from './src/components/Value';
import RingProgress from './src/components/RingProgress';
import { useState } from 'react';
import useHealthData from './src/hooks/useHealthData';
import { AntDesign } from '@expo/vector-icons';

const STEPS_GOAL = 10_000;
export default function App() {
	const [date, setDate] = useState(new Date());

	const changeDate = (numDay: number) => {
		const currentDate = new Date(date);
		currentDate.setDate(currentDate.getDate() + numDay);

		setDate(currentDate);
	};

	const { steps, flights, distance } = useHealthData(new Date(date));

	return (
		<View style={styles.container}>
			<View style={styles.datePicker}>
				<AntDesign
					onPress={() => changeDate(-1)}
					name='left'
					size={20}
					color={colors.accent2}
				/>
				<Text style={styles.date}>
					{date.toLocaleDateString('ru', {
						weekday: 'short',
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</Text>
				<AntDesign
					onPress={() => changeDate(1)}
					name='right'
					size={20}
					color={colors.accent2}
				/>
			</View>

			<RingProgress progress={steps / STEPS_GOAL} strokeWidth={35} />

			<View style={styles.values}>
				<Value label='Шаги' value={steps.toString()} />
				<Value label='Расстояние' value={`${(distance / 1000).toString()}км`} />
				<Value label='Высота подьема' value={`${flights.toString()}м`} />
			</View>

			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		justifyContent: 'center',
		padding: 12,
	},
	values: {
		flexDirection: 'row',
		gap: 25,
		flexWrap: 'wrap',
		marginTop: 50,
	},
	datePicker: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		marginBottom: 20,
		flexDirection: 'row',
	},
	date: {
		color: colors.white,
		fontWeight: '500',
		fontSize: 20,
		marginHorizontal: 20,
	},
});
