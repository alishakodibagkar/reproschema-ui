import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Survey/';
import Landing from '@/components/Landing/';
import StudyIntroduction from '@/components/StudyIntroduction/';
import config from '../config';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
      props: {
        startButton: config.startButton,
      },
    },
    {
      path: '/study/intro',
      name: StudyIntroduction,
      component: StudyIntroduction,
    },
    {
      path: '/activities/:id',
      name: 'Home',
      component: Home,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (from.query.token && !to.query.token) {
    if (to.path === from.path) {
      // console.log('Identical routes detected')
      return // This is a no-no via the documentation, but a bug in routing to identical routes strips query params, and this prevents that
    }
    next({path: to.path, query: {token: from.query.token}})
  }

  next()
})

export default router
