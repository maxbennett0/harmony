import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'
import { authSettled } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/song/:songId',
    name: 'ActivePage',
    component: loadPage('ActivePage'),
    beforeEnter: authSettled
  },
  {
    path: '/profiles/:profileId',
    name: 'ProfilePage',
    component: loadPage('ProfilePage')
  },
  {
    path: '/search/',
    name: 'SearchPage',
    component: loadPage('SearchPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
