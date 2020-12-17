import Vue from "nativescript-vue";

import Home from "./components/Home";
import Add from "./components/Add";

Vue.config.silent = false;

const routes = {
    home: Home,
    add: Add,
}

new Vue({

    render: h => h('frame', [h(routes.home)])

}).$start();
