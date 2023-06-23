import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '../config/colors';
import Svg, { Circle, CircleProps, Rect } from 'react-native-svg';
import Animated, {
	useAnimatedProps,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';

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
				<AnimatedCircle
					{...circleDefaultProps}
					animatedProps={animatedProps}
					rotation={-90}
				/>
			</Svg>
		</View>
	);
};

export default RingProgress;
