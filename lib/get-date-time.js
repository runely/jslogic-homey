'use strict';

module.exports = (dateTime) => {
    dateTime = dateTime.trim();
    let dateTimeSplit = dateTime.split(' ');
    let dateSplit = dateTimeSplit[0].split(/[/.-]/);
    let timeSplit = dateTimeSplit[(dateTimeSplit.length - 1)].split(/[:.]/);
    let newDate = new Date(dateSplit[2], (parseInt(dateSplit[1]) - 1), dateSplit[0], timeSplit[0], timeSplit[1], '00');
    return newDate;
}