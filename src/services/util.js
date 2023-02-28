export function getElapsedTime(date) {
  const dateNow = new Date();
  const time = date.getTime() / 1000;
  const timeNow = dateNow.getTime() / 1000;
  const elapsed = timeNow - time;
  let display = "";
  if (elapsed < 60) {
    // less than a minute
    display = "now";
  } else if (elapsed < 3600) {
    // less than an hour
    display = `${Math.floor(elapsed / 60)}m`;
  } else if (elapsed < 86400) {
    // less than a day
    display = `${Math.floor(elapsed / 3600)}h`;
  } else if (elapsed < 604800) {
    // less than a week
    display = `${Math.floor(elapsed / 86400)}d`;
  } else if (date.getFullYear() === dateNow.getFullYear()) {
    const options = {
      month: "long",
      day: "numeric",
    };
    display = new Intl.DateTimeFormat("en-US", options).format(date);
  } else {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    display = new Intl.DateTimeFormat("en-US", options).format(date);
  }
  return display;
}

/**
 *
 * items must have a date property
 */
export function compareByDate(itemA, itemB) {
  const timeA = new Date(itemA.date).getTime();
  const timeB = new Date(itemB.date).getTime();
  return (timeA - timeB) * -1;
}
