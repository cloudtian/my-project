import Vue from 'vue';
import App from './App';
import router from './router';

// import ElementUI from 'element-ui';
 import 'element-ui/lib/theme-chalk/index.css';

import ElRow from '@/components/common/layout/row/index';
import ElCol from '@/components/common/layout/col/index';
import ElContainer from '@/components/common/container/container/index';
import ElHeader from '@/components/common/container/header/index';
import ElFooter from '@/components/common/container/footer/index';
import ElMain from '@/components/common/container/main/index';
import ElAside from '@/components/common/container/aside/index';

Vue.config.productionTip = false;

// 注册组件
let componets = [
  ElRow,
  ElCol,
  ElContainer,
  ElHeader,
  ElFooter,
  ElMain,
  ElAside
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
