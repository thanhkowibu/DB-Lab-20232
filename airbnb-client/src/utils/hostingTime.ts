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
    hostingTime = `${years} years on Mikabnb`;
  } else if (months > 0) {
    hostingTime = `${months} months on Mikabnb`;
  } else if (weeks > 0) {
    hostingTime = `${weeks} weeks on Mikabnb`;
  } else if (days > 0) {
    hostingTime = `${days} days on Mikabnb`;
  } else {
    hostingTime = "Mikabnb newcomer";
  }

  return hostingTime;
};
