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
    name: 'Head of family',
    icon: 'table',
    path: '/head',
    component: './Head',
  },
  {
    name: 'Dependants',
    icon: 'table',
    path: '/list',
    component: './Children',
  },
  {
    path: '/',
    redirect: '/head',
  },
  {
    component: './404',
  },
];
