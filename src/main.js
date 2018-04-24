import Vue from 'vue';
import App from './App';
import router from './router';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Row from '@/components/common/layout/row/index';

Vue.config.productionTip = false;

Vue.use(ElementUI);

// 注册组件
let componets = [
  Row
];

componets.forEach(component => {
  if (typeof component.install === 'function') {
    component.install(Vue);
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
