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
          <el-form-item label="姓名" prop="peopleName">
            <el-input v-model="ruleform.peopleName"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="peopleCardId">
            <el-input v-model="ruleform.peopleCardId" :precision="2" :step="1" :min="0"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="peopleSex">
            <el-switch v-model="ruleform.peopleSex" active-text="男" inactive-text="女">
            </el-switch>
          </el-form-item>
          <el-form-item label="民族" prop="peopleNation">
            <el-input v-model="ruleform.peopleNation"> </el-input>
          </el-form-item>
          <el-form-item label="生日" prop="peopleBrithday">
            <el-date-picker type="date" placeholder="请选择日期" suffix-icon="el-icon-date" v-model="ruleform.peopleBrithday" style="width: 100%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="手机号" prop="peoplePhone" >
           <el-input v-model="ruleform.peoplePhone"></el-input>
          </el-form-item>
          <el-form-item label="家庭电话" prop="peopleHomePhone ">
            <el-input v-model="ruleform.peopleHomePhone "></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="peopleEmail ">
            <el-input v-model="ruleform.peopleEmail "></el-input>
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
      
      import { addResident,getResidentInfo} from "@/api/resident"
   // import {submitGood} from "@/api/goods"
    export default{
        name:"LandForm",
        props:["peopleId"],
        components:{
            //CateSelect,
            ImgUpload
        },
        data(){
            return {
                ruleform:{                
                                  
                  peopleId:"",
                  peopleName:"",
                  peopleCardId: "",
                  peopleSex:'1',
                  peopleNation:"",
                  peopleBrithday:"",
                  peoplePhone:"",
                  peopleHomePhone : "",
                  peopleEmail : "",
  
  
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
        mounted() {
            //if noticeId值存在就说明进入了编辑界面    
            console.log("peopleId",this.peopleId);      
            if(this.peopleId){
                getResidentInfo(this.peopleId).then(res=>{
                    console.log("res",res);
                    let info=res.data.info;
                    this.ruleform={//给对象赋值可以这么写
                        peopleId:this.peopleId,
                        peopleName:info.peopleName,
                        peopleCardId:info.peopleCardId ,
                        peopleSex:info.peopleSex,
                        peopleNation:info.peopleNation,
                        peopleBrithday:info.peopleBrithday,
                        peoplePhone:info.peoplePhone,
                        peopleHomePhone :info.peopleHomePhone,
                        peopleEmail :info.peopleEmail,
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
                        addResident(data).then(res => {
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