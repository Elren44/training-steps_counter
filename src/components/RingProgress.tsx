import { View, Text } from 'react-native';
import React from 'react';
import { colors } from '../config/colors';
import Svg, { Circle, Rect } from 'react-native-svg';

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
				<Circle
					cx={radius}
					cy={radius}
					r={innerRadius}
					strokeWidth={strokeWidth}
					stroke={colors.accent}
					opacity={0.2}
				/>
				{/* Foreground */}
				<Circle
					cx={radius}
					cy={radius}
					origin={radius}
					r={innerRadius}
					strokeWidth={strokeWidth}
					stroke={colors.accent}
					strokeDasharray={[circumference * progress, circumference]}
					strokeLinecap='round'
					rotation={-90}
				/>
			</Svg>
		</View>
	);
};

export default RingProgress;
