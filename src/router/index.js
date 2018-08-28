import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Common from '@/components/common'
import Group from '@/components/Group'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Common,
      children: [
        {
          path: '',
          name: 'home',
          component: HelloWorld
        },
        {
          path: 'group',
          name: 'group',
          component: Group
        }
      ]
    }

  ]
})
