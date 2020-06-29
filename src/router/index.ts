import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../views/Login.vue";
import Layout from "@/views/Layout.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Home.vue")
      },
      {
        path: "/config",
        name: "about",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
