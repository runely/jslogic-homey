'use strict';

module.exports = date => {
  const dateSplit = date.split(/[/.-]/);

  return new Date(`${dateSplit[1]}.${dateSplit[0]}.${dateSplit[2]}`);
};
