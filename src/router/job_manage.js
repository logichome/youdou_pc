import jobManage from '@/modules/job_manage/components/job_manage'
import interview from '@/modules/job_manage/components/job_manage_interview'
import offer from '@/modules/job_manage/components/job_manage_offer'


export default [
  {
    path: 'job_manage',
    component: jobManage,
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