import Vue from 'vue';
import Block from '../src/index';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use(iView);

new Vue({
  render: h => h(Block),
}).$mount('#vue-demo-layout');
