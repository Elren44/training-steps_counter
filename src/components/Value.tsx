import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../config/colors';

type ValueProps = {
	label: string;
	value: string;
};

const Value = ({ label, value }: ValueProps) => {
	return (
		<View>
			<Text style={styles.label}>{label}</Text>
			<Text style={styles.value}>{value}</Text>
		</View>
	);
};

export default Value;

const styles = StyleSheet.create({
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
