import Vue from "vue";
import Vuex from "vuex";
import user from './modules/user.js'
import cart from './modules/cart.js'
import path from './modules/path.js'
Vue.use(Vuex);

export default new Vuex.Store({
 modules:{
	 user,
	 cart,
	 path
 },
});
