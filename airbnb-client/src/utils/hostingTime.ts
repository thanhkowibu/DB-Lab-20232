import {
  differenceInYears,
  differenceInMonths,
  differenceInWeeks,
  differenceInDays,
} from "date-fns";

export const getHostingTime = (hostCreatedAt: Date) => {
  const years = differenceInYears(new Date(), new Date(hostCreatedAt));
  const months = differenceInMonths(new Date(), new Date(hostCreatedAt));
  const weeks = differenceInWeeks(new Date(), new Date(hostCreatedAt));
  const days = differenceInDays(new Date(), new Date(hostCreatedAt));

  let hostingTime;

  if (years > 0) {
    hostingTime = `${years} years on Airbnb`;
  } else if (months > 0) {
    hostingTime = `${months} months on Airbnb`;
  } else if (weeks > 0) {
    hostingTime = `${weeks} weeks on Airbnb`;
  } else if (days > 0) {
    hostingTime = `${days} days on Airbnb`;
  } else {
    hostingTime = "Airbnb newcomer";
  }

  return hostingTime;
};
