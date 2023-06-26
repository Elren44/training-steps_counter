import { View } from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '../config/colors';
import Svg, { Circle, CircleProps } from 'react-native-svg';
import Animated, {
	useAnimatedProps,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type RingProgressProps = {
	radius?: number;
	strokeWidth?: number;
	progress: number;
};

const RingProgress = ({
	radius = 100,
	strokeWidth = 35,
	progress,
}: RingProgressProps) => {
	const innerRadius = radius - strokeWidth / 2;
	const circumference = 2 * Math.PI * innerRadius;

	const fill = useSharedValue(0);

	useEffect(() => {
		fill.value = withSpring(progress, {
			overshootClamping: true,
			stiffness: 30,
		});
	}, [progress]);

	const animatedProps = useAnimatedProps(() => ({
		strokeDasharray: [circumference * fill.value, circumference],
	}));

	const circleDefaultProps: CircleProps = {
		cx: radius,
		cy: radius,
		r: innerRadius,
		strokeWidth: strokeWidth,
		stroke: colors.accent,
		origin: radius,
		strokeLinecap: 'round',
		rotation: -90,
	};

	return (
		<View
			style={{
				width: radius * 2,
				height: radius * 2,
				justifyContent: 'center',
				alignItems: 'center',
				// backgroundColor: colors.accent,
				alignSelf: 'center',
			}}
		>
			<Svg>
				{/* Background */}
				<Circle {...circleDefaultProps} opacity={0.2} />
				{/* Foreground */}
				<AnimatedCircle {...circleDefaultProps} animatedProps={animatedProps} />
			</Svg>
			<AntDesign
				name='arrowright'
				size={strokeWidth * 0.8}
				color='black'
				style={{
					position: 'absolute',
					top: strokeWidth * 0.1,
					alignSelf: 'center',
				}}
			/>
		</View>
	);
};

export default RingProgress;
