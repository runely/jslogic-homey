'use strict';

const getDate = require('./get-date');
const getTime = require('./get-time');
const getDateTime = require('./get-date-time');

module.exports = (app, itemOne, itemTwo, descOne, descTwo, func) => {
  let parsedOne;
  let parsedTwo;

  if (descOne.includes('DateTime') && descTwo.includes('DateTime')) {
    parsedOne = getDateTime(itemOne);
    parsedTwo = getDateTime(itemTwo);
  } else if (descOne.includes('Date') && descTwo.includes('Date')) {
    parsedOne = getDate(itemOne);
    parsedTwo = getDate(itemTwo);
  } else if (descOne.includes('Time') && descTwo.includes('Time')) {
    parsedOne = getTime(itemOne);
    parsedTwo = getTime(itemTwo);
  }

  if (parsedOne === 'Invalid Date') {
    app.log(`${func}/check-date-time: ${descOne} '${itemOne}' is in invalid format`);
    return Promise.resolve(false);
  }

  if (parsedTwo === 'Invalid Date') {
    app.log(`${func}/check-date-time: ${descTwo} '${itemTwo}' is in invalid format`);
    return Promise.resolve(false);
  }

  app.log(`${func}/check-date-time: ${descOne}: '${parsedOne}'`);
  app.log(`${func}/check-date-time: ${descTwo}: '${parsedTwo}'`);
  const result = (parsedOne < parsedTwo);
  app.log(`${func}/check-date-time: Is ${descOne} before ${descTwo}:`, result);
  return Promise.resolve(result);
};
