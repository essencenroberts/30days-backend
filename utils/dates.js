// date helpers

// challenge schedule date and day function

function calculateScheduledDate(startDate, dayNumber) {
  const date = new Date(startDate);

  // update date by dayNumber - 1
  date.setUTCDate(date.getUTCDate() + dayNumber - 1);

  return date;
}

module.exports = { calculateScheduledDate };