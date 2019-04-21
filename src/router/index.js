import Vue from 'vue'
import Router from 'vue-router'
import BattleGrid from '@/components/BattleGrid';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BattleGrid',
      component: BattleGrid
    }
  ]
})