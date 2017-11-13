import workManage from '@/modules/work_manage/components/work_manage'
import interview from '@/modules/work_manage/components/work_manage_interview'
import offer from '@/modules/work_manage/components/work_manage_offer'

export default [
  {
    path: 'work_manage',
    component: workManage,
    children:[
      {
        path:'',
        redirect:'interview'
      },
      {
        path:'interview',
        component:interview
      },
      {
        path:'offer',
        component:offer
      },
    ]
  }
]