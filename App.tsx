import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from './src/config/colors';

type ValueProps = {
	label: string;
	value: string;
};

const Value = ({ label, value }: ValueProps) => {
	return (
		<View style={styles.valueContainer}>
			<Text style={styles.label}>{label}</Text>
			<Text style={styles.value}>{value}</Text>
		</View>
	);
};

export default function App() {
	return (
		<View style={styles.container}>
			<Text>Open up App.tsx to start working on your app!</Text>

			<View style={{ flexDirection: 'row', gap: 50 }}>
				{/* <View style={styles.valueContainer}>
					<Text style={styles.label}>Шаги</Text>
					<Text style={styles.value}>2311</Text>
				</View>

				<View style={styles.valueContainer}>
					<Text style={styles.label}>Расстояние</Text>
					<Text style={styles.value}>1.3км</Text>
				</View> */}
				<Value label='Шаги' value='2311' />
				<Value label='Расстояние' value='1.3км' />
			</View>

			<Value label='Высота подьема' value='0.45км' />
			{/* <View style={styles.valueContainer}>
				<Text style={styles.label}>Высота подьема</Text>
				<Text style={styles.value}>0.45км</Text>
			</View> */}
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
	valueContainer: {
		marginVertical: 10,
	},
	label: {
		color: colors.white,
		fontSize: 20,
	},
	value: {
		fontSize: 34,
		color: colors.text,
		fontWeight: '500',
	},
});
