import Vue from 'vue'
import './styte-test.sass'
import App from "./App.vue";

Vue.config.devtools = true
new Vue({
    render: h => h(App),
}).$mount('#app')
