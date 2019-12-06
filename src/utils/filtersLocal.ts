import moment from "moment";
// 局部 filter
const formateTime = function(value:any) {
  if (arguments.length > 1) {
    return moment(value).format(`${arguments[1]}`);
  }
  return moment(value).format("YYYY-MM-DD");
};

const formateTimeParams = function(value :any) {
  if (arguments.length > 1) {
    return moment(value).format(`${arguments[1]}`);
  }
  return moment(value).format("YYYY-MM-DD");
};

export { formateTime };
