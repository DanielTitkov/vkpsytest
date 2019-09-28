import moment from "moment";

export const getAgeFromBDate = bdate => {
  let date = moment(bdate, "DD.MM.YYYY");
  return moment().diff(date, "years", false);
};