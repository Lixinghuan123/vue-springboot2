<template>
  <div  class="good-form">
      <el-page-header @back="$router.back()" content="用户注册">
      </el-page-header>
      <!--//再一个组件上写ref就是为了获取组件实例
      //model是为了绑定数据ruleform
      rules指定校验规则
  -->
  <el-form ref="form" :model="ruleform" :rules="rules" label-width="80px" style="width:520px;">
      <!--prop中的name是指rule中的name-->
      <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleform.username"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="introduce">
          <el-input v-model="ruleform.introduce"></el-input>
        </el-form-item>
        <el-form-item   placeholder="请输入editor或admin" label="角色" prop="roles">
          <el-input v-model="ruleform.roles"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="truename">
          <el-input v-model="ruleform.truename" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="ruleform.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="请再次输入密码" prop="password2">
          <el-input placeholder="请再次输入密码" v-model="ruleform.password2" show-password></el-input>
        </el-form-item>
        </el-form-item>
        <el-form-item  label="头像" prop="">
          <ImgUpload v-model="ruleform.url"></ImgUpload>
          <!-- v-model可以把子组件传过来的img地址赋值给imgUrl -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
  </el-form>
  </div>
</template>
<script>
//  import CateSelect from "./components/CateSelect.vue"
  import ImgUpload from "../notice/components/ImgUpload.vue"
  import {addAccount,getAccountInfo} from "@/api/account"
  import { mapState }from "vuex"
  export default{
      name:"acountForm",
      props:[],
      components:{
          //CateSelect,
          ImgUpload
      },
      data(){
        var validatePass2 = (rule, value, callback) => {

            if (value === '') {

            callback(new Error('请再次输入密码'));

            } else if (value !== this.ruleform.password) {

            callback(new Error('两次输入密码不一致!'));

            } else {

            callback();

            }

            };

          return {
              ruleform:{
                id:this.id,
                username:"",
                introduce:"",
                roles:"",
                password:"",
                password2:"",
                truename:'',
                url:"",

              },
              rules:{
                  username: [
                      //required: true表示必填项
                      //message提示信息  trigger: 'blur'表示失去焦点时显示提示
                          { required: true, message: '请输入用户名', trigger: 'blur' },
                          //pattern:/[\u4e00-\u9fa5]{4,8}/为自定义校验规则
                          {pattern:/\w{5,8}/, message: '只能输入5-8位小写字母和数字', trigger: 'blur' }
                      ],
                      roles:[
                      { required: true, message: '请输入editor或admin', trigger: 'blur' },
                      {  pattern:/admin|editor/,message: '只能输入editor或admin', trigger: 'blur' }
                      ],
                      password: [
                      { required: true, message: '请输入密码', trigger: 'blur' },
                      ],
                      password2 :[

                      { required: true, message: '请确认密码', trigger: 'blur' },

                      { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },

                      { validator: validatePass2, trigger: 'blur', required: true }

                      ],

                      price: [
                      { required: true, message: '请选择商品价格', trigger: 'change' },
                      ],

              }
          };
      },
      computed:{
          ...mapState("user",["id"])
      },
      // mounted() {
      //     //if noticeId值存在就说明进入了编辑界面    
      //     console.log("id",this.id);      
      //     if(this.id){
      //         getAccountInfo(this.id).then(res=>{
      //             console.log("res",res);
      //             let info=res.data.info;
      //             this.ruleform={//给对象赋值可以这么写
      //               id:this.id,
      //               username:info.username,
      //               introduce:info.introduce,
      //               roles:info.roles,
      //               password:info.password,
      //               truename:info.truename,
      //               url:info.url,
      //             }
      //         })
      //     }
      // },
      methods:{
        submitForm(formName) {//这个地方有什么必要传入formName
              this.$refs.form.validate((valid) => {
                  if (valid) {
                      // alert('submit!');
                      let data = { ...this.ruleform };
                      addAccount(data).then(res => {
                          console.log(res);
                          // console.log(res.success);

                          if (res.success) {//这里好像得对data的数据格式有要求 
                              this.$message({
                                  message: `恭喜你，申请成功提交`,
                                  type: "success",
                                  duration: 1500, //持续多少秒
                                  onClose: () => {
                                      this.$router.back();//返回上一页面
                                  }
                              })
                          }
                      })

                  } else {
                      console.log('error submit!!');
                      return false;
                  }
              });
          },
            },
  };
</script>
<style lang="scss" scoped>
  $bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .good-form .el-input input {
    color: $cursor;
  }
}
  .good-form{
      padding-top: 20px;
      padding-left: 35%;
      box-sizing:border-box;
      
  }
</style>