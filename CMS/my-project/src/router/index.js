import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


import transaction from '@/components/login'
import hello from '@/components/hello'

import Cur from '@/components/Cur/Cur'
import Cur1 from '@/components/Cur/Cur1'
import Cur2 from '@/components/Cur/Cur2'
import Cur3 from '@/components/Cur/Cur3'
import Cur4 from '@/components/Cur/Cur4'
import Cur5 from '@/components/Cur/Cur5'
import Cur6 from '@/components/Cur/Cur6'
import Cur7 from '@/components/Cur/Cur7'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'transaction',
      component: transaction
    },
    {
      path: '/hello',
      name: 'hello',
      component: hello
    },
    {
      path: '/Cur',
      name: 'Cur',
      component: Cur,
      children:[
        {
            path: '/Cur/Customer-1',
            name: 'Cur-1',
            component: Cur1
        },
        {
            path: '/Cur/Customer-2',
            name: 'Cur-2',
            component: Cur2
        },
        {
            path: '/Cur/Customer-3',
            name: 'Cur-3',
            component: Cur3
        },
        {
            path: '/Cur/Customer-4',
            name: 'Cur-4',
            component: Cur4,
            children:[
              {
                path: '/Cur/Customer-4/Customers',
                name: 'Cur-6',
                component: Cur6  
              },
              {
                path: '/Cur/Customer-4/Customerc',
                name: 'Cur-7',
                component: Cur7  
              }
            ]
        },
        {
            path: '/Cur/Customer-5',
            name: 'Cur-5',
            component: Cur5
        }
        ]
    }
  ]
})
