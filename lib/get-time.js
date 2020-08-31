'use strict';

module.exports = (time) => {
    let timeSplit = time.split(/[:.]/);
    let now = new Date();
    let newDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), timeSplit[0], timeSplit[1], '00');
    //console.log(`get-time: New date: ${newDate}`);
    return newDate;
}