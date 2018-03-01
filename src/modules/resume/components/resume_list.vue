<template>
  <div class="resume-list">
    <div class="filter">
      <el-form label-width="80px" :model="filter">
        <el-form-item label="关键字">
          <el-input class="search-input" v-model="filter.search">
            <el-button slot="append" icon="search" @click="filterSubmit">搜索</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="filter.sex">
            <el-radio label="">不限</el-radio>
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工作经验">
          <el-radio-group v-model="filter.job_age">
            <el-radio class="radio" label="">不限</el-radio>
            <el-radio class="radio" label="1">1年以下</el-radio>
            <el-radio class="radio" label="2">1-3年</el-radio>
            <el-radio class="radio" label="3">3-5年</el-radio>
            <el-radio class="radio" label="4">5-10年</el-radio>
            <el-radio class="radio" label="5">10年以上</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学历">
          <el-radio-group v-model="filter.educationRadio">
              <el-radio class="radio" :label="0">不限</el-radio>
              <el-radio class="radio" :label="1">指定</el-radio>
          </el-radio-group>
          <el-checkbox-group v-show="filter.educationRadio == 1" v-model="filter.education">
            <el-checkbox label="初中"></el-checkbox>
            <el-checkbox label="高中"></el-checkbox>
            <el-checkbox label="中专"></el-checkbox>
            <el-checkbox label="大专" ></el-checkbox>
            <el-checkbox label="本科"></el-checkbox>
            <el-checkbox label="硕士"></el-checkbox>
            <el-checkbox label="博士"></el-checkbox>
            <el-checkbox label="博士后"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="年龄范围">
          <el-radio-group v-model="filter.ageOption">
            <el-radio :label="false">不限</el-radio>
            <el-radio :label="true">指定</el-radio>
          </el-radio-group>
          <el-slider
            v-show="filter.ageOption"
            v-model="filter.age"
            range
            show-stops
            :step="5"
            :min="10"
            :max="65">
          </el-slider>
        </el-form-item>
        <el-form-item label="城市">
            <el-radio-group v-model="filter.cityRadio">
                <el-radio class="radio" :label="0">不限</el-radio>
                <el-radio class="radio" :label="1">选择</el-radio>
                <el-radio class="radio" :label="2">自定义</el-radio>
            </el-radio-group>
            <el-cascader
                    class="mgl10"
                    placeholder="请选择城市"
                    v-model="filter.city"
                    :options="addressOptions"
                    :props="cascaderProps"
                    v-show="filter.cityRadio === 1"
            ></el-cascader>
            <el-input v-model="filter.customCity" v-show="filter.cityRadio === 2" placeholder="请输入城市名称" class="mgl10 city-input"></el-input>
        </el-form-item>
      </el-form>
      <div class="submit-box">
        <button @click="filterSubmit">确定</button>
      </div>
      
    </div>
    <div class="table" v-loading="tableLoading">
      <el-table
        :data="resumeList"
        style="width: 100%">
        <el-table-column
          label="姓名"
          prop="name"
          width="100">
        </el-table-column>
        <el-table-column
          label="性别"
          prop="sex"
          width="70">
        </el-table-column>
        <el-table-column
          label="年龄"
          prop="age"
          width="70">
        </el-table-column>
        <el-table-column
          label="学历"
          prop="education"
          width="70">
        </el-table-column>
        <el-table-column
          label="所在地"
          prop="address"
          width="120">
        </el-table-column>
        <el-table-column
          label="工作年限"
          prop="job_age"
          width="100">
        </el-table-column>
        <el-table-column
          label="期望薪资"
          prop="intent_salary"
          width="150">
        </el-table-column>
        <el-table-column
          label="期望职位"
          prop="intent_job">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="专业">
                <span>{{ props.row.professional }}</span>
              </el-form-item>
              <el-form-item label="现在单位">
                <span>{{ props.row.current_unit }}</span>
              </el-form-item>
              <el-form-item label="院校">
                <span>{{ props.row.school }}</span>
              </el-form-item>
              <el-form-item label="期望工作地">
                <span>{{ props.row.intent_address }}</span>
              </el-form-item>
              <el-form-item label="户口">
                <span>{{ props.row.residence }}</span>
              </el-form-item>
              <button @click="showJobList(props.row)" class="invite-button">邀约</button>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog title="选择岗位" :visible.sync="jobListShow">
      <el-table :data="jobList" @row-click="inviteSubmit">
        <el-table-column property="job_name" label="职位名称" width="200"></el-table-column>
        <el-table-column property="create_at" label="创建日期"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import addressOptions from "@/assets/js/cityList";
export default {
  data() {
    return {
      filter: {
        search: "",
        sex: "",
        age: [10, 65],
        job_age: "",
        educationRadio: 0,
        education: [
          "初中",
          "高中",
          "中专",
          "大专",
          "本科",
          "硕士",
          "博士",
          "博士后"
        ],
        ageOption: false,
        cityRadio: 0,
        customCity: "",
        city: []
      },
      cascaderProps: {
        value: "area_name",
        label: "area_name",
        children: "sub"
      },
      addressOptions,
      resumeList: [],
      tableLoading: false,
      total:0,
      currentPage:1,
      currentResume:{},
      jobListShow:false,
      jobList:[]
    };
  },
  computed: {
    ...mapState({
      // addressOptions: state => state.option.addressOptions,
    })
  },
  methods: {
    filterSubmit(){
      this.currentPage = 1
      this.getList()
    },
    getList() {
      this.tableLoading = true
      let filter = {
        sex: this.filter.sex,
        job_age: this.filter.job_age,
        education:
          this.filter.educationRadio == 0
            ? ""
            : JSON.stringify(this.filter.education),
        min_age: this.filter.age[0],
        max_age: this.filter.age[1],
        city:
          this.filter.cityRadio == 0
            ? ""
            : this.filter.cityRadio == 1
              ? this.filter.city[this.filter.city.length - 1]
              : this.filter.customCity,
        job: this.filter.search,
        pagesize:20,
        page:this.currentPage
      }
      switch(this.filter.job_age){
          case '1':
              filter.min_job_age = 0;
              filter.max_job_age = 1;
              break;
          case '2':
              filter.min_job_age = 1;
              filter.max_job_age = 3;
              break;
          case '3':
              filter.min_job_age = 3;
              filter.max_job_age = 5;
              break;
          case '4':
              filter.min_job_age = 5;
              filter.max_job_age = 10;
              break;
          case '5':
              filter.min_job_age = 10;
              break;
      }
      this.$api.resume.getResumeList(filter)
        .then(res => {
          this.tableLoading =false
          if(res.data.error == 0){
            this.resumeList = res.data.data.list
            this.total = +res.data.data.count
          }
        })
        .catch(err => {
          this.tableLoading = false
        })
    },
    getOptions() {
      if (!this.addressOptions.length) {
        this.$api.resume.getCityOptions().then(res => {
          if (res.data.error == "0") {
            this.$store.commit("UPDATE_CITY_OPTION", res.data.data);
          }
        });
      }
    },
    handleCurrentChange(page){
      this.currentPage = page
      this.getList()
    },
    inviteSubmit(job){
      let info = this.currentResume
      this.$api.resume.inviteSubmit({
        jober_id:info.jober_id,
        resume_id:info.id,
        job_id:job.job_id,
        status:2
      })
        .then(res => {
          if(res.data.error == 0){
            this.jobListShow = false
            let theme = res.data.data
            this.$router.push({
              path:'/main/conversation/'+theme.chatTheme.theme_id,
              query:{
                user_id:theme.chatTheme.user_id,
                job_id:theme.chatTheme.job_id,
                resume_id:this.currentResume.id
              }
            })
          }
        })
    },
    showJobList(resume){
      this.currentResume = resume
      this.jobListShow = true
      this.getAllJob()
    },
    getAllJob(){
      this.jobLoading = true
      this.$api.resume.getAllJobList({status:1})
        .then(res => {
          this.jobLoading = false
          if(res.data.error == 0) {
            this.jobList = res.data.data
          }
        })
        .catch(err => {
          this.jobLoading = false
        })
    }
  },
  activated() {
    this.getList();
    // this.getOptions()
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.resume-list 
  height 100%
  overflow-y auto
  .filter 
    box-sizing: border-box
    padding: 40px 40px 0
    .search-input 
      width: 360px
    .city-input 
      width: 200px
    .el-form-item
      margin-bottom 8px
    .submit-box
      padding 20px
      button
        display block
        cursor: pointer
        width: 100px
        height: 30px
        font-size 16px
        line-height 30px
        background-color: #e75f15
        color: #fff
        border-radius: 4px
  .table
    padding 0 40px
    margin 0 auto
    .table-expand label 
      width: 90px
      color: #99a9bf
    .table-expand .el-form-item
      margin-right: 0
      margin-bottom: 0
      width: 40%
    .table-expand
      position relative
      .invite-button
        position absolute
        right 10px
        bottom 10px
        cursor: pointer
        width: 100px
        height: 30px
        margin: 10px auto
        font-size 16px
        line-height 30px
        background-color: #e75f15
        color: #fff
        border-radius: 4px
  .page-box
    padding 10px 0 30px 
    text-align right
</style>