import Vue from "vue";


import 'normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon';

import App from "./App.vue";
import router from './router';
import store from "./store";


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(SvgIcon,{
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em',
});

new Vue({
  router,
  store,
  render: (h: any) => h(App)
}).$mount('#app');