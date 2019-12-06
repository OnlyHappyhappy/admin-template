/**
 * 用于Vuex
 * @param path 模块命名空间
 * @param action actionTypes
 */
import Vue from "vue";
import Cache from "@/utils/storage";
import CryptoJS from 'crypto-js';

export const join = (path: any, action: any) => `${path}/${action}`;

/**
 * 判断是不是String;
 * @param val
 */
export function isString(val: any) {
  return typeof val === "string";
}

export function isNumber(val: any) {
  return typeof val === "number";
}

// File raw data
export function getFileData(url: any, options: any = { method: "get" }) {
  const xhr: any = new XMLHttpRequest();
  xhr.open(options.method, url);
  xhr.responseType = "blob";
  xhr.withCredentials = true;
  return new Promise((resolve: any, reject: any) => {
    xhr.onload = () => {
      const url = URL.createObjectURL(xhr.response);
      resolve(url);
    };
    xhr.onerror = () => reject(new Error("error"));
    xhr.send();
  });
}

/**
 * 点击下载
 * @param param 参数
 */
export const clickDownload = (param: {
  download: string;
  href: string;
  target?: string;
}) => {
  const { download, href, target } = param;
  if (download && href) {
    const a = document.createElement("a");
    a.href = href;
    a.download = download;
    a.target = target || "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    console.error("缺少参数");
  }
};

export const download = (param: any) => {
  if (param.href) {
    const a = document.createElement("a");
    a.href = param.href;
    a.target = param.target || "_blank";
    if (param.download) {
      a.download = param.download;
    }
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    console.error("缺少href参数");
  }
};

/**
 * 防抖：一段时间 只触发第一次，
 * @param {String} key key的定义 要根据当前的组件的路径 + 名称 + 用途的方式进行设置 防止重复
 * @param {Function} func 执行函数
 * @param {Number} timeout 时间
 */
const debounceTimer: any = {};
export function debounceByKey(key: string, func: () => void, timeout: number) {
  const str = `${key}#p6478==`;
  if (!debounceTimer[str]) {
    debounceTimer[str] = setTimeout(() => {
      func();
      clearTimeout(debounceTimer[str]);
      delete debounceTimer[str];
    }, timeout);
  }
}

/*********************************************************
 * await try catch
 * @param
 * @return [err:{} , data:{}] 报错和后台返回信息
 */

export const awaitGrace = (promise: any) => {
  return promise // 这个return  已经要加上 否则值无法返回
    .then((data: any) => [null, data])
    .catch((err: any) => [err, null]);
};

/* fixed  router3.0+ catch promise underfined */
export function fixVueRouterPromise(Router: any) {
  const originalPush: any = Router.prototype.push;
  Router.prototype.push = function push(location: any) {
    return (originalPush.call(this, location) as any).catch((err: any) => err);
  };
}

export function forceExit() {
  window.addEventListener("storage", e => {
    if (e.key === "pisaConUserInfoCurrent") {
      if (e.newValue === e.oldValue) {
        // 用户登陆第二个账户判断第一次和第二次的数据是否一致, 不一致则刷新页面
      } else {
        if (e.oldValue === null) {
          return;
        }
        if (e.newValue !== "undefined" && e.newValue !== null) {
          // 新旧账户不一样且newValue有数据时
          Vue.prototype.$alert("登录超时,请重新登陆", "提示", {
            confirmButtonText: "确定",
            callback: function(action: any) {
              window.location.assign(`${window.location.origin}/#/login`); // 强制退出
            }
          });
        }
      }
    }
    //  多个账号登陆强制退出
    if (e.key === "pisaConUserInfoCurrent") {
      // 当前登录账户被删
      // console.log(e.newValue, e.oldValue)  // null  "undefined"
      if (e.newValue === e.oldValue) {
        // 用户登陆第二个账户判断第一次和第二次的数据是否一致, 不一致则刷新页面
      } else {
        if (e.oldValue === null) {
          return;
        }
        if (e.newValue !== "undefined" && e.newValue !== null) {
          // 新旧账户不一样且newValue有数据时
          Cache.localSetCustom(
            "pisaConUserInfoCurrent",
            JSON.parse(e.newValue)
          );
          Vue.prototype.$alert("登录超时,请重新登陆", "提示", {
            confirmButtonText: "确定",
            callback: function(action: any) {
              window.location.assign(`${window.location.origin}/#/login`); // 强制退出
            }
          });
        } else if (e.oldValue === "undefined") {
          Vue.prototype.$alert("登录超时,请重新登陆", "提示", {
            confirmButtonText: "确定",
            callback: function(action: any) {
              window.location.assign(`${window.location.origin}/#/login`); // 强制退出
            }
          });
        } else if (e.newValue === null) {
          Vue.prototype.$alert("登录超时,请重新登陆", "提示", {
            confirmButtonText: "确定",
            callback: function(action: any) {
              window.location.assign(`${window.location.origin}/#/login`); // 强制退出
            }
          });
        }
      }
    }
  });
}

const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF"); // 16位 十六位进制数作为秘钥
const iv = CryptoJS.enc.Utf8.parse("ABCDEF1234123412"); // 16位 十六位进制数作为秘钥偏移量
// 加密方法
export function Encrypt(data: any) {
  let srcs: any = CryptoJS.enc.Utf8.parse(data);
  let encrypted: any = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString().toUpperCase();
}

// 解密方法
export function Decrypt(data: any) {
  let encryptedHexStr: any = CryptoJS.enc.Hex.parse(data);
  let srcs: any = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt: any = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedStr: any = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
