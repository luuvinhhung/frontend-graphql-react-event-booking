export const routes = [
  {
    label: 'Login',
    path: '/login',
    component: 'Login'
  },
  {
    label: 'Home',
    path: '/',
    private: true,
    component: 'apps',
    routes: [
      {
        label: 'Events',
        path: '/home',
        exact: true,
        component: 'EventsPage'
      },
      {
        label: 'Events',
        path: '/home/events',
        component: 'EventsPage'
      },
      {
        label: 'Bookings',
        path: '/home/bookings',
        component: 'BookingsPage'
      },
      {
        label: 'EventList',
        path: '/home/eventlist',
        component: 'EventListPage'
      }
    ]
  }
]
export const siderRoutes = [
  {
    label: 'dashboard',
    icon: 'dashboard',
    path: '/home'
  },
  {
    label: 'events',
    icon: 'smile',
    path: '/home/events'
  },
  {
    label: 'bookings',
    icon: 'schedule',
    path: '/home/bookings'
  },
  {
    label: 'EventList',
    icon: 'schedule',
    path: '/home/eventlist'
  }
]
