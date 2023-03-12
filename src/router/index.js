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
  console.log(query_dict);

  if (from.query.auth_token && !to.query.auth_token) {
    query_dict["auth_token"] = from.query.auth_token;
    console.log(query_dict);

  }

  if (from.query.expiry_time && !to.query.expiry_time) {
    query_dict["expiry_time"] = from.query.expiry_time;
    console.log(query_dict);
  }
  
  if (from.query.uid && !to.query.uid) {
    query_dict["uid"] = from.query.uid;
    console.log(query_dict);
  }
  

  if ((from.query.auth_token && !to.query.auth_token) 
      || (from.query.expiry_time && !to.query.expiry_time) 
      || (from.query.uid && !to.query.uid)) {
    if (from.path === to.path) {
      next(false);
    } else {
      next({
        path: to.path,
        query: query_dict,
      });
    }
  } else {
    next();
  }

  if (from.query.expiry_time && !to.query.expiry_time ) {
    if (from.path === to.path) {
      next(false);
    } else {
      next({
        path: to.path,
        query: query_dict
      });
    }
  } else {
    next();
  }
  
// router.beforeEach((to, from, next) => {
  
//   var query_dict = {};
//   console.log(query_dict);
  
//   if (from.query.auth_token && !to.query.auth_token) {
//     if (from.path === to.path) {
//       next(false);
//     } else {
//       query_dict["auth_token"] = from.query.auth_token;
//       console.log(query_dict);
//       next({
//         path: to.path,
//         query: {...to.query, auth_token: from.query.auth_token},
//       });
//     }
//   } else {
//     next();
//   }
  
//   if (from.query.expiry_time && !to.query.expiry_time) {
//     if (from.path === to.path) {
//       next(false);
//     } else {
//       query_dict["expiry_time"] = from.query.expiry_time;
//       console.log(query_dict);
//       next({
//         path: to.path,
//         query: {...to.query, expiry_time: from.query.expiry_time, auth_token: from.query.auth_token}
//       });
//     }
//   } else {
//     next();
//   }


})

export default router
