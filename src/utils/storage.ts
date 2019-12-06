const formValueObj = (value: any) => ({ value });
const getRealVal = (obj: any) => obj && obj.value;

export const Cache = {
  sessionGet(key: any) {
    try {
      return getRealVal(
        JSON.parse(window.sessionStorage.getItem(key) as string)
      );
    } catch (error) {
      console.error(error);
    }
  },
  sessionSet(key: any, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(formValueObj(value)));
  },
  sessionRemove(key: any) {
    // remove single item
    window.sessionStorage.removeItem(key);
  },
  sessionClear() {
    //  remove all item
    window.sessionStorage.clear();
  },
  localGet(key: any) {
    try {
      return getRealVal(JSON.parse(window.localStorage.getItem(key) as string));
    } catch (error) {
      console.error(error);
    }
  },
  localSet(key: any, value: any) {
    window.localStorage.setItem(key, JSON.stringify(formValueObj(value)));
  },
  localRemove(key: any) {
    window.localStorage.removeItem(key);
  },
  localClear() {
    window.localStorage.clear();
  },
  localGetCustom(key: any) {
    try {
      return (
        window.localStorage.getItem(key) &&
        JSON.parse(window.localStorage.getItem(key) as string)
      );
    } catch (error) {
      console.error(error);
    }
  },
  localSetCustom(key: any, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

export default Cache;
