'use strict';

const { sentry, init, startTransaction } = require('./lib/sentry-io');

const Homey = require('homey');
const moment = require('moment');

const checkDateTime = require('./lib/check-date-time');

let tokens = [];

class MyApp extends Homey.App {

	onInit() {
		this.log(Homey.manifest.name.en + " v" + Homey.manifest.version + " is running...");

		// initialize sentry.io
		init(Homey);
		this.sentry = sentry;

		// flow tokens
		new Homey.FlowToken("formatted_date", { type: "string", title: Homey.__('flowTokens.formatted_date') })
			.register()
			.then(token => tokens.push(token));

		// actions
		new Homey.FlowCardAction('get_formatted_date')
			.register()
			.registerRunListener(async (args, state) => {
				let day = moment().add(args.daysToAdd, 'days');

				tokens[0].setValue(day.format(args.format));

				return Promise.resolve(true);
			});

		// conditions
		new Homey.FlowCardCondition('value_in_array')
			.register()
			.registerRunListener((args, state) => {
				if (args.array) {
					let array = args.array.split(';');
					this.log('value_in_array: Array items:', array);

					if (args.value) {
						let caseSensitive = (args.casesenitive === 'true');
						this.log('value_in_array: Case sensitive:', caseSensitive);

						let value = (typeof args.value == 'string' ? args.value.trim() : args.value);
						if (!caseSensitive) {
							value = value.toLowerCase();
						}
						this.log('value_in_array: Value:', value);

						let result = array.some(item => {
							let arrayItem = (!caseSensitive ? item.toLowerCase() : item);
							return (arrayItem == value);
						});
						this.log('value_in_array: Is value in array:', result);

						return Promise.resolve(result);
					}
					else {
						return Promise.resolve(false);
					}
				}
				else {
					return Promise.resolve(false);
				}
			});

		new Homey.FlowCardCondition('value_empty')
			.register()
			.registerRunListener((args, state) => {
				if (args.value) {
					this.log('value_empty: Value:', args.value);
					let result = (args.value == undefined || args.value === '' || args.value === ' ');
					this.log('value_empty: Is value undefined, empty or one whitespce:', result);
					return Promise.resolve(result);
				}
				else {
					return Promise.resolve(true);
				}
			});

		new Homey.FlowCardCondition('value_too_long')
			.register()
			.registerRunListener((args, state) => {
				if (args.maxLength) {
					if (args.value) {
						let value = args.value.trim();
						this.log('value_too_long: Value:', value);
						this.log('value_too_long: Length:', value.length);
						this.log('value_too_long: MaxLength:', args.maxLength);
						let result = (value.length < args.maxLength);
						this.log('value_too_long: Is value length too long:', result);
						return Promise.resolve(result);
					}
					else {
						return Promise.resolve(true);
					}
				}
				else {
					return Promise.resolve(false);
				}
			});

		new Homey.FlowCardCondition('value_contains_array')
			.register()
			.registerRunListener((args, state) => {
				if (args.array) {
					let array = args.array.split(';');
					this.log('value_contains_array: Array items:', array);

					if (args.value) {
						let caseSensitive = (args.casesenitive === 'true');
						this.log('value_contains_array: Case sensitive:', caseSensitive);

						let value = (typeof args.value == 'string' ? args.value.trim() : args.value);
						if (!caseSensitive) {
							value = value.toLowerCase();
						}
						this.log('value_contains_array: Value:', value);

						let result = array.some(item => {
							let arrayItem = (!caseSensitive ? item.toLowerCase() : item);
							return (value.includes(arrayItem));
						});
						this.log('value_contains_array: Value contains one of:', result);
						return Promise.resolve(result);
					}
					else {
						return Promise.resolve(false);
					}
				}
				else {
					return Promise.resolve(false);
				}
			});

		new Homey.FlowCardCondition('date_before_date')
			.register()
			.registerRunListener((args, state) => {
				if (args.dateOne) {
					if (args.dateTwo) {
						return checkDateTime(this, args.dateOne, args.dateTwo, 'DateOne', 'DateTwo', 'date_before_date');
					}
					else {
						return Promise.resolve(false);
					}
				}
				else {
					return Promise.resolve(false);
				}
			});

		new Homey.FlowCardCondition('time_before_time')
			.register()
			.registerRunListener((args, state) => {
				if (args.timeOne) {
					if (args.timeTwo) {
						return checkDateTime(this, args.timeOne, args.timeTwo, 'TimeOne', 'TimeTwo', 'time_before_time');
					}
					else {
						return Promise.resolve(false);
					}
				}
				else {
					return Promise.resolve(false);
				}
			});

		new Homey.FlowCardCondition('datetime_before_datetime')
			.register()
			.registerRunListener((args, state) => {
				if (args.dateTimeOne) {
					if (args.dateTimeTwo) {
						return checkDateTime(this, args.dateTimeOne, args.dateTimeTwo, 'DateTimeOne', 'DateTimeTwo', 'datetime_before_datetime');
					}
					else {
						return Promise.resolve(false);
					}
				}
				else {
					return Promise.resolve(false);
				}
			});

		new Homey.FlowCardCondition('is_random_true_false')
			.register()
			.registerRunListener((args, state) => {
				let random = Math.random();
				let result = random > 0.5;
				this.log(`is_random_true_false: ${random} > 0.5 == ${result}`);
				return Promise.resolve(result);
			});

		new Homey.FlowCardCondition('daynum_between_daynum')
			.register()
			.registerRunListener((args, state) => {
				if (args.dayNumOne) {
					if (args.dayNumTwo) {
						const now = moment();
						const first = moment().set('date', args.dayNumOne).startOf('day');
						this.log(`daynum_between_daynum: Now '${now}'`);
						this.log(`daynum_between_daynum: First: '${first}'`);
						let second;
						if (args.dayNumTwo < args.dayNumOne) {
							second = moment().add(1, 'month').set('date', args.dayNumTwo).endOf('day');
							this.log(`daynum_between_daynum: Day number two '${args.dayNumTwo}' is earlier than day number one '${args.dayNumOne}'. Considering it to be next month: '${second}'`);
						}
						else {
							second = moment().set('date', args.dayNumTwo).endOf('day');
							this.log(`daynum_between_daynum: Day number one '${args.dayNumOne}' is earlier than day number two '${args.dayNumTwo}'. This is same month: '${second}'`);
						}

						return Promise.resolve(now.isBetween(first, second));
					}
					else {
						this.log(`daynum_between_daynum: Argument 'dayNumTwo' missing...`);
						return Promise.resolve(false);
					}
				}
				else {
					this.log(`daynum_between_daynum: Argument 'dayNumOne' missing...`);
					return Promise.resolve(false);
				}
			});
		
		new Homey.FlowCardCondition('monthnum_between_monthnum')
			.register()
			.registerRunListener((args, state) => {
				if (args.monthOne) {
					if (args.monthTwo) {
						const now = moment();
						const first = moment().set('month', (args.monthOne - 1)).startOf('day');
						this.log(`monthnum_between_monthnum: Now '${now}'`);
						this.log(`monthnum_between_monthnum: First: '${first}'`);
						let second;
						if (args.monthTwo < args.monthOne) {
							second = moment().add(1, 'year').set('month', (args.monthTwo - 1)).endOf('day');
							this.log(`monthnum_between_monthnum: Month two '${args.monthTwo}' is earlier than month one '${args.monthOne}'. Considering it to be next year: '${second}'`);
						}
						else {
							second = moment().set('month', (args.monthTwo - 1)).endOf('day');
							this.log(`monthnum_between_monthnum: Month one '${args.monthOne}' is earlier than month two '${args.monthTwo}'. This is same year: '${second}'`);
						}

						return Promise.resolve(now.isBetween(first, second));
					}
					else {
						this.log(`monthnum_between_monthnum: Argument 'monthTwo' missing...`);
						return Promise.resolve(false);
					}
				}
				else {
					this.log(`monthnum_between_monthnum: Argument 'monthOne' missing...`);
					return Promise.resolve(false);
				}
			});
	}
}

module.exports = MyApp;