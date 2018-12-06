import vue from 'vue'
import appCmp from './App'

import store from "./store/index.js";

import mods from "./components/index.js";

vue.config.productionTip = false

appCmp.mpType = 'app'
vue.prototype.$store = store;


const app = new vue({
	store,
    ...appCmp
})
app.$mount()
