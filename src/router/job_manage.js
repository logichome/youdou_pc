import jobManage from '@/modules/job_manage/components/job_manage'
import jobList from '@/modules/job_manage/components/job_list'
import newJob from '@/modules/job_manage/components/new_job'

import store from '@/vuex/store'
import { GET_JOB_MANAGE_LIST } from '@/vuex/actions_types'

let beforeEnter = (to, from, next) => {
  let route = to.path.split('/')[3]
  let status = 0

  switch(route){
    case 'on_job':
      status = 1
      break
    case 'off_job':
      status = 2
      break
  }
  store.dispatch(GET_JOB_MANAGE_LIST,{status})
  next()
}

export default [
  {
    path: 'job_manage',
    component: jobManage,
    children:[
      {
        path:'',
        redirect:'on_job'
      },
      {
        path:'on_job',
        component:jobList,
        beforeEnter
      },
      {
        path:'off_job',
        component:jobList,
        beforeEnter
      },
      {
        path:'new_job',
        component:newJob,
        beforeEnter
      },
    ]
  }
]