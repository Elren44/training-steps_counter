import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from './src/config/colors';
import Value from './src/components/Value';
import RingProgress from './src/components/RingProgress';

export default function App() {
	return (
		<View style={styles.container}>
			<RingProgress progress={0.9} />

			<View style={styles.values}>
				<Value label='Шаги' value='2311' />
				<Value label='Расстояние' value='1.3км' />
				<Value label='Высота подьема' value='0.45км' />
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
