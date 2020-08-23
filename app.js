'use strict';

const Homey = require('homey');

class MyApp extends Homey.App {
	
	onInit() {
		this.log(Homey.manifest.name.en + " v" + Homey.manifest.version + " is running...");

		new Homey.FlowCardCondition('value_in_array')
            .register()
            .registerRunListener((args, state) => {
				if (args.array) {
					let array = args.array.split(';');
					//this.log('condition: Array items:', array);

					if (args.value) {
						let value;
						if (typeof args.value == 'string') {
							value = args.value.trim();
						}
						else {
							value = args.value;
						}

						//this.log('condition: Value:', value);
						let result = array.some(item => {
							//this.log(`'${item}' == '${value}' :: ( (${typeof item}) == (${typeof value}) )`);
							return (item == value);
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
				if (args.array) {
					let array = args.array.split(';');
					//this.log('condition: Array items:', array);

					if (args.value) {
						let value;
						if (typeof args.value == 'string') {
							value = args.value.trim();
						}
						else {
							value = args.value;
						}

						//this.log('condition: Value:', value);
						let result = array.some(item => {
							//this.log(`'${item}'.includes('${value}') :: ( (${typeof item}) == (${typeof value}) )`);
							return (item.includes(value));
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