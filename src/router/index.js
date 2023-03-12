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
  
  const query_dict = {};
  
  if (from.query.auth_token && !to.query.auth_token) {
    if (from.path === to.path) {
      next(false);
    } else {
//       next({
//         path: to.path,
//         query: {...from.query, auth_token: from.query.auth_token},
//       });
      query_dict[auth_token] = from.query.auth_token;
    }
  } 
  
    if (from.query.expiry_time && !to.query.expiry_time) {
    if (from.path === to.path) {
      next(false);
    } else {
//       next({
//         path: to.path,
//         query: {...from.query, auth_token: from.query.auth_token},
//       });
      query_dict[expiry_time] = from.query.expiry_time;
    }
  } 
  
  if (!to.query.auth_token && !to.query.expiry_time) {
    next();
  } else {
    console.log(query_dict)
    next({
      path: to.path,
      query: query_dict,
    });
  }


})

export default router
