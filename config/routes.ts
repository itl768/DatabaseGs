

export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'Dashboard',
    icon: 'crown',
    path: '/list',
    component: './Children',
  },
  {
    name: 'People data',
    icon: 'table',
    path: '/head',
    component: './Head',
  },
  
  {
    path: '/',
    redirect: '/head',
  },
  {
    component: './404',
  },
];
