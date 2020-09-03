'use strict';

module.exports = (date) => {
    let dateSplit = date.split(/[/.-]/);
    let newDate = new Date(`${dateSplit[1]}.${dateSplit[0]}.${dateSplit[2]}`);
    return newDate;
}