import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import MainMenu from '../views/MainMenu.vue';
import GameMenu from '../views/GameMenu.vue';
import GameSite from '../views/GameSite.vue';
import QuestionSite from '../views/QuestionSite.vue';

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
  {
    path: '/gamesite',
    name: 'GameSite',
    component: GameSite,
  },
  {
    path: '/questionsite',
    name: 'QuestionSite',
    component: QuestionSite,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
