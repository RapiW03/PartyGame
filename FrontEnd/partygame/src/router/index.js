import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import MainMenu from '../views/MainMenu.vue';
import GameMenu from '../views/GameMenu.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/mainmenu',
    name: 'MainMenu',
    component: MainMenu,
  },
  {
    path: '/gamemenu/:game_id',
    name: 'GameMenu',
    component: GameMenu,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
