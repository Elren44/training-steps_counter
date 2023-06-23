import { View, Text, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
	HealthInputOptions,
	HealthKitPermissions,
	HealthPermission,
	HealthUnit,
	HealthValue,
} from 'react-native-health';
import AppleHealthKit from 'react-native-health';

const permissions: HealthKitPermissions = {
	permissions: {
		read: [
			AppleHealthKit.Constants.Permissions.Steps,
			AppleHealthKit.Constants.Permissions.FlightsClimbed,
			AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
		],
		write: [],
	},
};

const useHealthData = (date: Date) => {
	const [hasPermission, setHasPermission] = useState(false);
	const [steps, setSteps] = useState(0);
	const [flights, setFlights] = useState(0);
	const [distance, setDistance] = useState(0);

	useEffect(() => {
		if (Platform.OS !== 'ios') {
			return;
		}

		AppleHealthKit.isAvailable((err, isAvailable) => {
			if (err) {
				console.log('Error checking availability');
				return;
			}
			if (!isAvailable) {
				console.log('Apple Health not available');
				return;
			}
			AppleHealthKit.initHealthKit(permissions, (err) => {
				if (err) {
					console.log('Error getting permissions');
					return;
				}
				setHasPermission(true);
			});
		});
	}, []);

	useEffect(() => {
		if (!hasPermission) {
			return;
		}

		const options: HealthInputOptions = {
			date: date.toISOString(),
			includeManuallyAdded: false,
			unit: HealthUnit.meter,
		};

		AppleHealthKit.getStepCount(options, (err, results) => {
			if (err) {
				console.log('Error getting Steps: ', err);
			}
			setSteps(results.value);
		});

		AppleHealthKit.getFlightsClimbed(options, (err, results) => {
			if (err) {
				console.log('Error getting FlightsClimbed: ', err);
			}
			setFlights(results.value);
		});

		AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
			if (err) {
				console.log('Error getting Distance: ', err);
			}
			setDistance(results.value);
		});
	}, [hasPermission]);

	return {
		steps,
		flights,
		distance,
	};
};

export default useHealthData;
