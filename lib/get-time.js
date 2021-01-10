'use strict';

module.exports = time => {
  const timeSplit = time.split(/[:.]/);
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), timeSplit[0], timeSplit[1], '00');
};
