'use strict';

module.exports = (dateTime) => {
    //console.log(`get-date-time: Before: '${dateTime}'`);
    dateTime = dateTime.trim();
    //console.log(`get-date-time: After:  '${dateTime}'`);
    let dateTimeSplit = dateTime.split(' ');
    let dateSplit = dateTimeSplit[0].split(/[/.-]/);
    let timeSplit = dateTimeSplit[(dateTimeSplit.length - 1)].split(/[:.]/);
    //console.log('get-date-time: Date:', dateSplit);
    //console.log('get-date-time: Time:', timeSplit);

    let newDate = new Date(dateSplit[2], (parseInt(dateSplit[1]) - 1), dateSplit[0], timeSplit[0], timeSplit[1], '00');
    //console.log(`get-date-time: New date: ${newDate}`);
    return newDate;
}