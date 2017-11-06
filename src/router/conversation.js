import conversation from '@/modules/conversation/components/conversation'
import conversationContent from '@/modules/conversation/components/conversation_content'

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
        component:conversationContent
      },
      {
        path:'new',
        component:conversationContent
      },
      {
        path:'talking',
        component:conversationContent
      },
      {
        path:'suitable',
        component:conversationContent
      },
      {
        path:'unsuitable',
        component:conversationContent
      }
    ]
  }
]