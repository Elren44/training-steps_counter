import { Platform } from 'react-native';
import { useEffect, useState } from 'react';
import {
	HealthInputOptions,
	HealthKitPermissions,
	HealthUnit,
} from 'react-native-health';
import AppleHealthKit from 'react-native-health';
import {
	initialize,
	requestPermission,
	readRecords,
} from 'react-native-health-connect';
import { TimeRangeFilter } from 'react-native-health-connect/lib/typescript/types/base.types';

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

	// IOS
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

	//android

	const readSampleData = async () => {
		const isInitialized = await initialize();
		if (!isInitialized) return;

		const grantedPermissions = await requestPermission([
			{ accessType: 'read', recordType: 'Steps' },
			{ accessType: 'read', recordType: 'Distance' },
			{ accessType: 'read', recordType: 'FloorsClimbed' },
		]);

		const timeRangeFilter: TimeRangeFilter = {
			operator: 'between',
			startTime: new Date(date.setHours(0, 0, 0, 0)).toISOString(),
			endTime: new Date(date.setHours(23, 59, 59, 999)).toISOString(),
		};

		// Steps
		const steps = await readRecords('Steps', { timeRangeFilter });
		const totalSteps = steps.reduce((sum, cur) => sum + cur.count, 0);
		setSteps(totalSteps);
		// console.log(steps);

		// Distance
		const distance = await readRecords('Distance', { timeRangeFilter });
		const totalDistance = distance.reduce(
			(sum, cur) => sum + cur.distance.inMeters,
			0
		);
		const fixedDistance = Math.floor((totalDistance * 100) / 100);
		setDistance(fixedDistance);

		// Floors climbed
		const floorsClimbed = await readRecords('FloorsClimbed', {
			timeRangeFilter,
		});
		const totalFloors = floorsClimbed.reduce((sum, cur) => sum + cur.floors, 0);

		setFlights(totalFloors);
		// console.log(floorsClimbed);
	};

	useEffect(() => {
		if (Platform.OS !== 'android') {
			return;
		}
		readSampleData();
	}, [date]);

	return {
		steps,
		flights,
		distance,
	};
};

export default useHealthData;
