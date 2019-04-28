import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import util from './util/utils'
import apis from './apis/api'

Vue.use(Vant)

Vue.config.productionTip = false

Vue.prototype.utils = util;
Vue.prototype.apis = apis;

const app = new Vue({
  router,
  render: h => h(App)
})
app.$mount('#app');

/*const waitForGlobal = async () => {
  if (window.tronWeb) {
    const nodes = await window.tronWeb.isConnected();
    const connected = !Object.entries(nodes).map(([key, value]) => {
      console.log(key, value);
      return value
    }).includes(false)
    if (connected) {
      Vue.prototype.tronWeb = window.tronWeb;
      app.$mount('#app');
    } else {
      setTimeout(async () => {
        await waitForGlobal()
      }, 100)
    }
  } else {
    setTimeout(async () => {
      await waitForGlobal()
    }, 100)
  }
}
waitForGlobal().then()*/
