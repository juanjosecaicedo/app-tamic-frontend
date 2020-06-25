import 'core-js/es6/promise';
import 'core-js/es6/string';
import 'core-js/es7/array';
import "vue-multiselect/dist/vue-multiselect.min.css";
import "vue-loading-overlay/dist/vue-loading.css";
import "hooper/dist/hooper.css";
import cssVars from 'css-vars-ponyfill';
import Vue from 'vue';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import App from './App';
import router from './router';
import JsonExcel from 'vue-json-excel';
import moment from 'moment';
import Multiselect from 'vue-multiselect';
import axiosApi from 'axios';
import io from 'socket.io-client';
import Vuelidate from 'vuelidate';
import Rate from 'vue-tiny-rate';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import {
  Hooper,
  Slide,
  Navigation as HooperNavigation,
  Pagination as HooperPagination
} from "hooper";

import VueLazyload from 'vue-lazyload';
import CryptoJS from 'crypto-js';
import "hooper/dist/hooper.css";
moment.suppressDeprecationWarnings = true;

import dotenv from 'dotenv'
dotenv.config()

// Axios Configuration
const axios = axiosApi.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  withCredentials: true,
  xsrfCookieName: 'connect.sid',
  xsrfHeaderName: 'X-CSRFToken',
  credentials: 'same-origin' // Could also try 'same-origin' or 'include'
});

// Global Axios
window.axios = axios;
// Global Aex
window.CryptoJS = CryptoJS;
// Global Token
window.token = "Tamic";

// Events that trigger when there is no internet
window.addEventListener('offline', () => {
  console.log("No hay conexion a internet.");
});

// Events that trigger when there is internet
window.addEventListener('online', () => {
  console.log("Conectado a internet.");
});

try {
  const socket = io(process.env.VUE_APP_SOCKET);
  socket.on('notification', (resp) => {
    //console.log('Response: ', resp);
  });

  // setInterval(() => {
  //   // console.log('Enviando notification');
  //   socket.emit('notification', { menssage: "Hola soy camilo" });
  // }, 2000);
  // console.log(socket);

  socket.on("clear_cache", () => {
    //console.log("clear_cache");
    var js = document.querySelectorAll('script');
    for (var i = 0; i < js.length; i++) {
      js[i].src = js[i].src + '?v=' + Date.now();
    }
    var css = document.querySelectorAll('link');
    for (var j = 0; j < css.length; j++) {
      css[i].href = css[j].href + '?v=' + Date.now();
    }
    location.reload();
  });

  socket.on("connect", () => {
    // console.log("Connected");
  });

  socket.on("connecting", () => {
    // console.log("Disconnected from internet");
  });

  socket.on("closeSession", () => {
    // console.log("Disconnected from internet");
  });


  window.addEventListener("beforeunload", function (e) {
    // ejecutar();
    socket.emit('clear_code_invoice');
    // (e || window.event).returnValue = null;
    // return null;
  });

  // function ejecutar() {
  //   socket.emit('clear_code_invoice');
  // }

  window.socket = socket;
} catch (error) {
  // console.log(error);
}

Vue.config.productionTip = false
Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm a')
  }
});

cssVars()
Vue.component('downloadExcel', JsonExcel)
Vue.component('multiselect', Multiselect)
Vue.component('loading', Loading)
Vue.component('rate', Rate)
Vue.component('hooper-pagination', HooperPagination)
Vue.component('hooper', Hooper)
Vue.component('slide', Slide)
Vue.component('hooper-navigation', HooperNavigation)
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(Vuex)
Vue.use(VueLazyload, {
  error: "img/loading.gif",
  loading: "img/loading.gif"
})

const store = new Vuex.Store({
  state: {
    isVisible: false,
    value: "",
    name: "",
    favorite_list: [],
    recently_list: [],
    status: true,
    count: null,
    categories: 0,
    pin: 0,
    stop: false,
    control: null,
    subscription: true,
    data: null,
    isLoading: false,
    change_img: false,
    terms: null,
    payment: false
  }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})