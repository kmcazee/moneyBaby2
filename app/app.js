import Vue from "nativescript-vue";

import Home from "./components/Home";
import Add from "./components/Add";

Vue.config.silent = false;

new Vue({

    render: h => h('frame', [h(Add)])

}).$start();
