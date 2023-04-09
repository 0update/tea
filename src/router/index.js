 import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    redirect:'/home'
  },
  {
    path: "/list",
    name: "List",
    component: () =>
      import("../views/List.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import("../views/Cart.vue"),
  },
  {
    path: "/recovery",
    name: "Recovery",
  	children:[
  		{
  			path: "/",
  			name: "index",
  			component: () =>
  			  import("../views/recovery/RecoveryIndex.vue"),
  		},
  		{
  			path: "/btn",
  			name: "btn",
  			component: () =>
  			  import("../views/recovery/RecoveryBtn.vue"),
  		}
  	],
    component: () =>
      import("@/views/recovery/Recovery.vue"),
  },
  {
    path: "/search",
    name: "Search",
	children:[
		{
			path: "/",
			name: "index",
			component: () =>
			  import("../views/search/Search-index.vue"),
		},
		{
			path: "Searchlist",
			name: "Searchlist",
			component: () =>
			  import("../views/search/Search-list.vue"),
		}
	],
    component: () =>
      import("@/views/Search.vue"),
  },
  {
    path: "/detail",
    name: "Detail",
    component: () =>
      import("../views/Detail.vue"),
  },
  {
    path: "/my",
    name: "My",
    component: () =>
      import("../views/My.vue"),
  },
  
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/login/Login.vue"),
  },
  {
    path: "/userLogin",
    name: "UserLogin",
    component: () =>
      import("../views/login/UserLogin.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import("../views/login/Register.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
