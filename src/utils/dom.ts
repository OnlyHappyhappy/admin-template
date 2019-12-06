import { debounce } from 'lodash';

const debounceTimer: any = {};
// 一段时间 只触发第一次，key的定义 要根据当前的组件的路径 + 名称 + 用途的方式进行设置 防止重复
export function debounceByKey(key: any, func: any, timeout: any) {
  const str: any = `${key}#p6478==`;
  if (!debounceTimer[str]) {
    debounceTimer[str] = setTimeout(() => {
      func();
      clearTimeout(debounceTimer[str]);
      delete debounceTimer[str];
    }, timeout);
  }
}

export function resizeWindow(callback: any) {
  window.addEventListener("resize", event => {
    debounceByKey(
      "resizeWindow",
      () => {
        callback(event);
      },
      200
    );
  });
}

export function setHTMLfontSize() {
  // rely on CSS for scale for better performance and more responsive
  // see reset.scss
  const width = window.innerWidth;
  const HTML = document.getElementsByTagName("html")[0];
  if (Number(`${(width / 1920) * 100}`) < 12) {
    HTML.style.fontSize = `12px`;
  } else {
    HTML.style.fontSize = `${(width / 1920) * 100}px`;
  }
}
