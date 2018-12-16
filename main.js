import vue from 'vue';
import appCmp from './App';

import socket from "./commons/socket.js";
import config from "./commons/config.js";
import store from "./store/index.js";
import mods from "./components/index.js";
const debug = require("debug");

debug.disable();
//debug.enable('engine.io-client:socket');
//debug.enable('socket.io-client:socket');


vue.config.productionTip = false;

appCmp.mpType = 'app';
vue.prototype.$store = store;

const app = new vue({
	store,
    ...appCmp
});

app.$mount()
