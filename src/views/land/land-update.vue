<template>
  <div class="land-form">
      <el-page-header @back="$router.back()" content="编辑土地信息">
      </el-page-header>
      <!--//再一个组件上写ref就是为了获取组件实例
      //model是为了绑定数据ruleform
      rules指定校验规则
  -->
  <el-form ref="form" :model="ruleform" :rules="rules" label-width="140px" style="width:520px;margin-top: 20px;">
      <!--prop中的name是指rule中的name-->
        <el-form-item label="村庄" prop="address">
          <el-input v-model="ruleform.address"></el-input>
        </el-form-item>
        <el-form-item label="家庭编号" prop="num">
          <el-input v-model="ruleform.num"></el-input>
        </el-form-item>
        <el-form-item label="户主" prop="head">
          <el-input v-model="ruleform.head"></el-input>
        </el-form-item>
        <el-form-item label="宅基地面积" prop="area">
          <el-input v-model="ruleform.area" :precision="2" :step="1" :min="0"></el-input>
        </el-form-item>
        <el-form-item label="证书编号" prop="certificateNum">
          <el-input v-model="ruleform.certificateNum"> </el-input>
        </el-form-item>
        <el-form-item label="证件图片" >
         <ImgUpload v-model="ruleform.img"></ImgUpload>
        </el-form-item>
        <el-form-item label="发证单位" prop="workUnit">
          <el-input v-model="ruleform.workUnit"></el-input>
        </el-form-item>
        <el-form-item label="证书有效起止时间" prop="session">
          <el-input v-model="ruleform.session"></el-input>
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
                  address:"",
                  num:"",
                  head:"",
                  area:"",
                  certificateNum:"",
                  img:"",
                  workUnit:"",
                  session:""


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