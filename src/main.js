import Vue from 'vue'
import Audit from './Audit.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(Audit)
}).$mount('#app')
