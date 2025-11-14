<template>
    <div class="good-form">
        <el-page-header @back="$router.back()" content="更新基本信息">
        </el-page-header>
        <!--//再一个组件上写ref就是为了获取组件实例
        //model是为了绑定数据ruleform
        rules指定校验规则
    -->
    <el-form ref="form" :model="ruleform" :rules="rules" label-width="80px" style="width:520px;">
        <!--prop中的name是指rule中的name-->
        <el-form-item label="账号" prop="username">
            <el-input v-model="ruleform.username"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="introduce">
            <el-input v-model="ruleform.introduce"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roles">
            <el-input v-model="ruleform.roles"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="truename">
            <el-input v-model="ruleform.truename" ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入密码" v-model="ruleform.password" show-password></el-input>
          </el-form-item>
          <!-- <el-form-item label="是否热销" prop="hot">
            <el-switch v-model="ruleform.hot">
          </el-switch> -->
          </el-form-item>
          <el-form-item prop="">
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
            return {
                ruleform:{
                  id:this.id,
                  username:"",
                  introduce:"",
                  roles:"",
                  password:"",
                  truename:'',
                  url:"",

                },
                rules:{
                    name: [
                        //required: true表示必填项
                        //message提示信息  trigger: 'blur'表示失去焦点时显示提示
                            { required: true, message: '请输入商品名称', trigger: 'blur' },
                            //pattern:/[\u4e00-\u9fa5]{4,8}/为自定义校验规则
                            {pattern:/[\u4e00-\u9fa5]{4,8}/, message: '长度在 4到 8 个中文字符', trigger: 'blur' }
                        ],
                        desc:[
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                        { min: 20, max: 30, message: '长度在 20 到 30 个字符', trigger: 'blur' }
                        ],
                        cate: [
                        { required: true, message: '请选择商品品类', trigger: 'change' },
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
        mounted() {
            //if noticeId值存在就说明进入了编辑界面    
            console.log("id",this.id);      
            if(this.id){
                getAccountInfo(this.id).then(res=>{
                    console.log("res",res);
                    let info=res.data.info;
                    this.ruleform={//给对象赋值可以这么写
                      id:this.id,
                      username:info.username,
                      introduce:info.introduce,
                      roles:info.roles,
                      password:info.password,
                      truename:info.truename,
                      url:info.url,
                    }
                })
            }
        },
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
    .good-form{
        padding: 20px;
        box-sizing:border-box;
    }
</style>