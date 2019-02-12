import Vue from 'vue'
import Router from 'vue-router'
const TableResults = () => import('../src/components/TableResults')
const QuestionImport = () => import('../src/components/QuestionImport')

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/results/:id',
      name: 'Results',
      component: TableResults,
      props: true
    },
    {
      path: '/import',
      name: 'QuestionImport',
      component: QuestionImport
    }
  ]
})
