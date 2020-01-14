import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Secret from '../views/Secret.vue'
import Proizvodi from '../views/Proizvodi.vue'
import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/Secret',
    name: 'Secret',
    component: Secret,
    meta:{requiresAuth: true}
  },
  {
    path: '/Proizvodi',
    name: 'Proizvodi',
    component: Proizvodi
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  const requiresAuth=to.matched.some(record=>record.meta.requiresAuth);
  const isAuthenticated=firebase.auth().currentUser;
  if (requiresAuth && !isAuthenticated){
    next("/Login");
  }else{
    next();
  }
})

export default router
