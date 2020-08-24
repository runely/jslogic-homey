'use strict';

const Homey = require('homey');

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
	}
	
}

module.exports = MyApp;