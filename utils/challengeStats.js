// calculate challenge progress including: posted count, progress %, status couts and streaks

// one day broken down to miliseconds
const MS_PER_DAY = 24 * 60 * 60 * 1000;

//  status from Post schema
const STATUSES = ['idea', 'writing', 'filming', 'editing', 'scheduled', 'posted']

// function to get todays date
function getToday(todayParam) {
  // check date format
  if (todayParam && /^\d{4}-\d{2}-\{2}$/.test(todayParam)) {
    return new Date(`${todayParam}T00:00:00.000Z`);
  }

  return new Date();
}

// function for the specific day of challenge it is
function getDayNumber(startDate, today) {
  const start = new Date(startDate);

  // use Date.UTC it gives each date as a number of milliseconds
  const startMs = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());

  const todayMs = Date.UTC(start.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());

  // days beteen the two dates +1 (start day = Day 1)
  return Math.floor((todayMs - startMs) / MS_PER_DAY) + 1;
}


// function to calculate challenge stats (challenge, posts, todayParam)
function calculateChallengeStats(challenge, posts, todayParam) {

  const { lengthInDays, postPerDay } = challenge;
  const totalPostGoal = lengthInDays * postPerDay;

  // status counts
  const statusCounts = {}; // start at 0
  STATUSES.forEach((status) => {
    statusCounts[status] = 0;
  });

  // posted per day
  const postedPerDay = {};

  // count each post once
  posts.forEach((post) => {
    // count this post's status
    if (statusCounts[post.status] !== undefined) {
      statusCounts[post.status] += 1;
    }

    // if it's posted add 1 to posted count
    if (post.status === 'posted') {
      postedPerDay[post.getDayNumber] = (postedPerDay[post.daynumer] || 0) + 1;
    } 
  });

  const postedCount = statusCounts.posted;

  // Progress %
  const progressPercent = totalPostGoal > 0
    ? Math.min(100, Math.round((postedCount / totalPostGoal) * 100))
    : 0;

  // function for if the user met their goal for the day
  function dayMetGoal(day) {
    return (postPerDay[day] || 0) >= postPerDay;

  }  

  // todays and challenge
  const today = getToday(todayParam);
  const todayDayNumber = getDayNumber(challenge.startDate, today);

  let challengeStatus = 'active';
  if (todayDayNumber < 1) challengeStatus = 'upcoming';
  if (todayDayNumber > lengthInDays) challengeStatus = 'completed';

  // challenge
  const lastDay = Math.min(todayDayNumber, lengthInDays);

  // Current Streak
  let currentStreak = 0;

  if (lastDay >= 1) {
    let day = lastDay;

    // if today is still in progress and goal not met start  count from yesterday
    if (day === todayDayNumber && !dayMetGoal(day)) {
      day -= 1;
    }

    while (day >= 1 && dayMetGoal(day)) {
      currentStreak += 1;
      day -= 1;

    }
  }

   //

    // best streak and days completed
    let bestStreak = 0;
    let runningStreak = 0;
    let daysCompleted = 0;

    for (let day = 1; day <= lastDay; day += 1) {
      if (dayMetGoal(day)) {
        daysCompleted += 1;
        runningStreak += 1;

        bestStreak = Math.max(bestStreak, runningStreak);
      } else {
        runningStreak = 0;
      }
    }

    return {
      totalPostGoal,
      postedCount,
      progressPercent,
      statusCounts,
      currentStreak,
      bestStreak,
      daysCompleted,
      todayDayNumber,
      challengeStatus,
    };
} 



// export
module.exports = { calculateChallengeStats } ;