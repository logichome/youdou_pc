import conversation from '@/modules/conversation/components/conversation'
import conversationContent from '@/modules/conversation/components/conversation_content'
import conversationDetail from '@/modules/conversation/components/conversation_detail'
import store from '@/vuex/store'
import { GET_CONVERSATION_LIST } from '@/vuex/actions_types'

let beforeEnter = (to, from, next) => {
  let route = to.path.split('/')[3]
  let status = 0
  switch(route){
    case 'all':
      status = 0
      break
    case 'new':
      status = 1
      break
    case 'talking':
      status = 2
      break
    case 'suitable':
      status = 3
      break
    case 'unsuitable':
      status = 4
      break
  }
  store.dispatch(GET_CONVERSATION_LIST,{status})
  next()
}


export default [
  {
    path: 'conversation',
    component: conversation,
    children:[
      {
        path:'',
        redirect:'all'
      },
      {
        path:'all',
        component:conversationContent,
        beforeEnter
      },
      {
        path:'new',
        component:conversationContent,
        beforeEnter
      },
      {
        path:'talking',
        component:conversationContent,
        beforeEnter
      },
      {
        path:'suitable',
        component:conversationContent,
        beforeEnter
      },
      {
        path:'unsuitable',
        component:conversationContent,
        beforeEnter
      }
    ]
  },
  {
    path:'conversation/:id',
    component:conversationDetail
  }
]