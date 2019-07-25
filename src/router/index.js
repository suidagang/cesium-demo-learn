import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import Demo1 from '@/components/Demo1'
import Demo2 from '@/components/Demo2'
import Primitive from '@/components/Primitive'
import Primitive2 from '@/components/Primitive2'
import IframeDemo from "@/components/IframeDemo.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect:"/hello"
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/test',
      name: 'test',
      component: Test
    },{
      path: '/demo1',
      name: 'demo1',
      component: Demo1
    },{
      path: '/demo2',
      name: 'demo2',
      component: Demo2
    },{
      path: '/primitive',
      name: 'primitive',
      component: Primitive
    },{
      path: '/primitive2',
      name: 'primitive2',
      component: Primitive2
    },{
      path: '/iframeDemo',
      name: 'iframeDemo',
      component: IframeDemo
    }
  ]
})
