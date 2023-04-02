<template>
    <div class="land-form">
        <el-page-header @back="$router.back()" content="编辑居民信息">
        </el-page-header>
        <!--//再一个组件上写ref就是为了获取组件实例
        //model是为了绑定数据ruleform
        rules指定校验规则
    -->
    <el-form ref="form" :model="ruleform" :rules="rules" label-width="140px" style="width:520px;margin-top: 20px;">
        <!--prop中的name是指rule中的name-->
          <el-form-item label="家庭地址" prop="address">
            <el-input v-model="ruleform.address"></el-input>
          </el-form-item>
          <el-form-item label="户主" prop="head">
            <el-radio v-model="ruleform.head" label="1">是</el-radio>
            <el-radio v-model="ruleform.head" label="2">否</el-radio>
          </el-form-item>
          <el-form-item label="家庭编号" prop="homeNumber">
            <el-input v-model="ruleform.homeNumber"></el-input>
          </el-form-item>
          <el-form-item label="与户主关系" prop="relation">
            <el-input v-model="ruleform.relation" :precision="2" :step="1" :min="0"></el-input>
          </el-form-item>
          <el-form-item label="学历" prop="education">
            <el-input v-model="ruleform.education"> </el-input>
          </el-form-item>
          <el-form-item label="出生地址" prop="birthAddress" >
           <el-input v-model="ruleform.birthAddress"></el-input>
          </el-form-item>
          <el-form-item label="婚姻状况" prop="maritalStatus ">
            <el-radio v-model="ruleform.maritalStatus" label="1">是</el-radio>
            <el-radio v-model="ruleform.maritalStatus" label="2">否</el-radio>
            <!-- <el-input v-model="ruleform.maritalStatus "></el-input> -->
          </el-form-item>
          <el-form-item label="职业" prop="work ">
            <el-input v-model="ruleform.work "></el-input>
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
   // import {submitGood} from "@/api/goods"
    export default{
        name:"LandForm",
        props:[],
        components:{
            //CateSelect,
            ImgUpload
        },
        data(){
            return {
                ruleform:{                
                    // desc:"",
                    // price:0,
                    // hot:true,                 
                    id:1,
                    address:"",
                    head:'1',
                    homeNumber:"",
                    relation:"",
                    education:"",
                    birthAddress:"",
                    maritalStatus:'1',
                    work:"",
  
  
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
        methods:{
            submitForm(formName) {
              this.$refs.form.validate((valid) => {
                if (valid) {
                 // alert('submit!');
                  let data={...this.ruleform};
                  submitGood(data).then(res=>{
                    //console.log(res);
                    if(res.data.info){
                      this.$message({
                        message:`恭喜你，提交成功`,
                        type:"success",
                        duration:1500, //持续多少秒
                        onClose:()=>{
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
            resetForm(formName) {
              this.$refs[formName].resetFields();
            }
              },
    };
  </script>
  <style lang="scss" scoped>
    .good-form{
        padding: 20px;
        box-sizing:border-box;
    }
  </style>