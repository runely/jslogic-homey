'use strict';

const getDate = require('./get-date');
const getTime = require('./get-time');
const getDateTime = require('./get-date-time');

module.exports = (app, itemOne, itemTwo, descOne, descTwo, func) => {
    let parsedOne, parsedTwo;

    if (descOne.indexOf('DateTime') > -1 && descTwo.indexOf('DateTime') > -1) {
        parsedOne = getDateTime(itemOne);
        parsedTwo = getDateTime(itemTwo);
    }
    else if (descOne.indexOf('Date') > -1 && descTwo.indexOf('Date') > -1) {
        parsedOne = getDate(itemOne);
        parsedTwo = getDate(itemTwo);
    }
    else if (descOne.indexOf('Time') > -1 && descTwo.indexOf('Time') > -1) {
        parsedOne = getTime(itemOne);
        parsedTwo = getTime(itemTwo);
    }
    
    if (parsedOne == 'Invalid Date') {
        app.log(`${func}/check-date-time: ${descOne} '${itemOne}' is in invalid format`);
        return Promise.reject(false);
    }
    else if (parsedTwo == 'Invalid Date') {
        app.log(`${func}/check-date-time: ${descTwo} '${itemTwo}' is in invalid format`);
        return Promise.reject(false);
    }
    else {
        app.log(`${func}/check-date-time: ${descOne}: '${parsedOne}'`);
        app.log(`${func}/check-date-time: ${descTwo}: '${parsedTwo}'`);
        let result = (parsedOne < parsedTwo)
        app.log(`${func}/check-date-time: Is ${descOne} before ${descTwo}:`, result);
        return Promise.resolve(result);
    }
}