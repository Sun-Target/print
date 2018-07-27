import Vue from 'vue'
import Router from 'vue-router'
/*排号*/
import QueuePrintSetting from '@/components/Queue/QueuePrintSetting'
import QueueBluetooth from '@/components/Queue/QueueBluetooth'
/*排号*/




Vue.use(Router)

export default new Router({
  routes: [
       {
         path: '/',
         name: 'QueuePrintSetting',
         component: QueuePrintSetting
       },
       {
         path: '/queuebluetooth',
         name: 'QueueBluetooth',
         component: QueueBluetooth
         // ,meta: {
         //    keepAlive: true // 需要被缓存
         //  }
       }

  ]
})
