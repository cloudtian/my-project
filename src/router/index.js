import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
// 注册
import Sign from '@/components/mod-login/sign';
// 登录
import Login from '@/components/mod-login/login';
// 主页
import Main from '@/components/mod-launch/index';
// 首页
import Index from '@/components/mod-index/index';
import Host from '@/components/mod-host/index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/sign',
      name: 'Sign',
      component: Sign
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [{
        path: '/index',
        name: 'Index',
        component: Index
      },
      {
        path: '/host',
        name: 'Host',
        component: Host
      }]
    }
  ],
  linkActiveClass: 'router-active'
});
