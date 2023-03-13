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

  var query_dict = {};

  if (from.query.auth_token && !to.query.auth_token) {
    query_dict["auth_token"] = from.query.auth_token;
  }

  if (from.query.expiry_time && !to.query.expiry_time) {
    query_dict["expiry_time"] = from.query.expiry_time;
  }
  
  if (from.query.uid && !to.query.uid) {
    query_dict["uid"] = from.query.uid;
  }
  
  if (from.query.lang && !to.query.lang) {
    query_dict["lang"] = from.query.lang;
  }
  
  if (from.query.questions && !to.query.questions) {
    query_dict["questions"] = from.query.questions;
  }
  
  if (from.query.branch && !to.query.branch) {
    query_dict["branch"] = from.query.branch;
  }
  
  if (from.query.day && !to.query.day) {
    query_dict["day"] = from.query.day;
  }
  

  if ((from.query.auth_token && !to.query.auth_token) 
      || (from.query.expiry_time && !to.query.expiry_time) 
      || (from.query.uid && !to.query.uid)
      || (from.query.lang && !to.query.lang)
      || (from.query.questions && !to.query.questions)
      || (from.query.branch && !to.query.branch)
      || (from.query.day && !to.query.day)){
    if (from.path === to.path) {
      next(false);
    } else {
      next({
        path: to.path,
        query: from.query,
      });
    }
  } else {
    next();
  }


})

export default router
