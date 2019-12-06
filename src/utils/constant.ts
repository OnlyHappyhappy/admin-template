// 此文件用来定义常量 前后对照表
export const options = [{ value: 1, label: 2 }];
interface IPaginationPage {
  page: number;
  pageSize: number;
  total: number;
}
// 设定文字大小范围
export const minFontSize: number = 8;
export const maxFontSize: number = 80;
export const paginationPage: IPaginationPage = {
  page: 1,
  pageSize: 10,
  total: 0
};

// 文档类型parentId传0，文档等级parentId传1，文档版本（parentId传2），文档主体（parentId传3），文档系列（parentId传4）
export const addDictParams: Object = {
  dirType: 0,
  docLevel: 1,
  dirMain: 3,
  dirSerial: 4,
  version: 2
};
