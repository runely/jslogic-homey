'use strict';

const Homey = require('homey');

const getDate = require('./lib/get-date');
const getTime = require('./lib/get-time');
const getDateTime = require('./lib/get-date-time');

class MyApp extends Homey.App {
	
	onInit() {
		this.log(Homey.manifest.name.en + " v" + Homey.manifest.version + " is running...");

		new Homey.FlowCardCondition('value_in_array')
            .register()
            .registerRunListener((args, state) => {
				//this.log("--------------------------------------------------------------");
				if (args.array) {
					let array = args.array.split(';');
					//this.log('condition: Array items:', array);

					if (args.value) {
						let caseSensitive = (args.casesenitive === 'true');
						//this.log('condition: Case sensitive:', caseSensitive);

						let value;
						if (typeof args.value == 'string') {
							value = args.value.trim();
						}
						else {
							value = args.value;
						}

						if (!caseSensitive) {
							value = value.toLowerCase();
						}

						//this.log('condition: Value:', value);
						let result = array.some(item => {
							let fixedIted;
							if (!caseSensitive) {
								fixedIted = item.toLowerCase();
							}
							else {
								fixedIted = item;
							}
							//this.log(`'${fixedIted}' == '${value}' :: ( (${typeof fixedIted}) == (${typeof value}) )`);
							return (fixedIted == value);
						});
						//this.log('condition: Is value in array:', result);
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
				//this.log("--------------------------------------------------------------");
				if (args.value) {
					//this.log(`condition: Value: '${args.value}'`);
					let result = (args.value == undefined || args.value === '' || args.value === ' ')
					//this.log('condition: Is value undefined or empty:', result);
					return Promise.resolve(result);
				}
				else {
					return Promise.resolve(true);
				}
			});
		
		new Homey.FlowCardCondition('value_too_long')
			.register()
			.registerRunListener((args, state) => {
				//this.log("--------------------------------------------------------------");
				if (args.maxLength) {
					if (args.value) {
						let value = args.value.trim();
						//this.log(`condition: Value: '${value}' (${value.length})`);
						//this.log(`condition: MaxLength: '${args.maxLength}'`);
						let result = (value.length < args.maxLength)
						//this.log(`condition: Is value length less than:`, result);
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
				//this.log("--------------------------------------------------------------");
				if (args.array) {
					let array = args.array.split(';');
					//this.log('condition: Array items:', array);

					if (args.value) {
						let caseSensitive = (args.casesenitive === 'true');
						//this.log('condition: Case sensitive:', caseSensitive);

						let value;
						if (typeof args.value == 'string') {
							value = args.value.trim();
						}
						else {
							value = args.value;
						}

						if (!caseSensitive) {
							value = value.toLowerCase();
						}

						//this.log('condition: Value:', value);
						let result = array.some(item => {
							let fixedIted;
							if (!caseSensitive) {
								fixedIted = item.toLowerCase();
							}
							else {
								fixedIted = item;
							}
							//this.log(`'${value}'.includes('${fixedIted}') :: ( (${typeof value}) == (${typeof fixedIted}) )`);
							return (value.includes(fixedIted));
						});
						//this.log('condition: Value contains one of:', result);
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
				//this.log("--------------------------------------------------------------");
				if (args.dateOne) {
					let dateOne = getDate(args.dateOne);
					if (args.dateTwo) {
						let dateTwo = getDate(args.dateTwo);
						return this.checkDateTime({ parsed: dateOne, raw: args.dateOne }, { parsed: dateTwo, raw: args.dateTwo }, 'DateOne', 'DateTwo');
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
				//this.log("--------------------------------------------------------------");
				if (args.timeOne) {
					let timeOne = getTime(args.timeOne);
					if (args.timeTwo) {
						let timeTwo = getTime(args.timeTwo);
						return this.checkDateTime({ parsed: timeOne, raw: args.timeOne }, { parsed: timeTwo, raw: args.timeTwo }, 'TimeOne', 'TimeTwo');
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
				//this.log("--------------------------------------------------------------");
				if (args.dateTimeOne) {
					let dateTimeOne = getDateTime(args.dateTimeOne);
					if (args.dateTimeTwo) {
						let dateTimeTwo = getDateTime(args.dateTimeTwo);
						return this.checkDateTime({ parsed: dateTimeOne, raw: args.dateTimeOne }, { parsed: dateTimeTwo, raw: args.dateTimeTwo }, 'DateTimeOne', 'DateTimeTwo');
					}
					else {
						return Promise.resolve(false);
					}
				}
				else {
					return Promise.resolve(false);
				}
			});
	}

	checkDateTime(itemOne, itemTwo, descOne, descTwo) {
		if (itemOne.parsed == 'Invalid Date') {
			this.log(`condition: ${descOne} '${itemOne.raw}' is in invalid format`);
			return Promise.reject(false);
		}
		else if (itemTwo.parsed == 'Invalid Date') {
			this.log(`condition: ${descTwo} '${itemTwo.raw}' is in invalid format`);
			return Promise.reject(false);
		}
		else {
			//this.log(`condition: ${descOne}: '${itemOne.parsed}' (${typeof itemOne.parsed})`);
			//this.log(`condition: ${descTwo}: '${itemTwo.parsed}' (${typeof itemTwo.parsed})`);
			let result = (itemOne.parsed < itemTwo.parsed)
			//this.log(`condition: Is ${descOne} before ${descTwo}:`, result);
			return Promise.resolve(result);
		}
	}
	
}

module.exports = MyApp;