import moment from "moment";

// 全局filter
const formateTime = function(value: any) {
  if (arguments.length > 1) {
    return moment(value).format(`${arguments[1]}`);
  }
  return moment(value).format("YYYY-MM-DD");
};

export { formateTime };
