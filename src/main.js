import Vue from 'vue';
import App from './App';
import router from './router';

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

import ElRow from '@/components/common/layout/row/index';
import ElCol from '@/components/common/layout/col/index';

import '@/components/common/theme-default/row.css';
import '@/components/common/theme-default/col.css';

Vue.config.productionTip = false;

// 注册组件
let componets = [
  ElRow,
  ElCol
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
