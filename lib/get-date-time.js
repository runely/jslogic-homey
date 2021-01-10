'use strict';

module.exports = dateTime => {
  dateTime = dateTime.trim();
  const dateTimeSplit = dateTime.split(' ');
  const dateSplit = dateTimeSplit[0].split(/[/.-]/);
  const timeSplit = dateTimeSplit[(dateTimeSplit.length - 1)].split(/[:.]/);

  return new Date(dateSplit[2], (Number.parseInt(dateSplit[1]) - 1), dateSplit[0], timeSplit[0], timeSplit[1], '00');
};
