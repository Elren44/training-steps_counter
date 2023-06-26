import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { colors } from './src/config/colors';
import Value from './src/components/Value';
import RingProgress from './src/components/RingProgress';
import {
	HealthInputOptions,
	HealthKitPermissions,
	HealthPermission,
	HealthUnit,
	HealthValue,
} from 'react-native-health';
import AppleHealthKit from 'react-native-health';
import { useEffect, useState } from 'react';
import useHealthData from './src/hooks/useHealthData';

const STEPS_GOAL = 10_000;
export default function App() {
	const { steps, flights, distance } = useHealthData(new Date(2023, 5, 26));

	return (
		<View style={styles.container}>
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
	},
});
