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
        <el-form-item label="村庄" prop="landcountry">
          <el-input v-model="ruleform.landcountry"></el-input>
        </el-form-item>
        <el-form-item label="户主" prop="landHead">
          <el-input v-model="ruleform.landHead"></el-input>
        </el-form-item>
        <el-form-item label="宅基地面积" prop="landArea">
          <el-input v-model="ruleform.landArea" :precision="2" :step="1" :min="0"></el-input>
        </el-form-item>
        <el-form-item label="证书编号" prop="certificatesId">
          <el-input v-model="ruleform.certificatesId"> </el-input>
        </el-form-item>
        <el-form-item label="证件图片" >
         <ImgUpload v-model="ruleform.certificatesImg"></ImgUpload>
        </el-form-item>
        <el-form-item label="发证单位" prop="certificatesUnit">
          <el-input v-model="ruleform.certificatesUnit"></el-input>
        </el-form-item>
        <el-form-item label="证书有效起止时间" prop="certificatesPeriod">
          <el-input v-model="ruleform.certificatesPeriod"></el-input>
        </el-form-item>
        <el-form-item label="流转方式" prop="transferStyle">
          <el-input v-model="ruleform.transferStyle"></el-input>
        </el-form-item>
        <el-form-item label="土地收益" prop="landIncome">
          <el-input v-model="ruleform.landIncome"></el-input>
        </el-form-item>
        <el-form-item label="流转原因" prop="transferReason">
          <el-input v-model="ruleform.transferReason"></el-input>
        </el-form-item>
        <el-form-item label="土壤类别" prop="landStyle">
          <el-input v-model="ruleform.landStyle"></el-input>
        </el-form-item>
        <el-form-item label="承包人" prop="contractor">
          <el-input v-model="ruleform.contractor"></el-input>
        </el-form-item>
        <el-form-item label="土地承包证编号" prop="contractId">
          <el-input v-model="ruleform.contractId"></el-input>
        </el-form-item>
        <el-form-item label="承包过期日期" prop="contractExpire">
          <el-input v-model="ruleform.contractExpire"></el-input>
        </el-form-item>
        <el-form-item label="承包证办理单位" prop="contractUnit">
          <el-input v-model="ruleform.contractUnit"></el-input>
        </el-form-item>
        <el-form-item label="承包证书截图" >
          <ImgUpload v-model="ruleform.contractImg"></ImgUpload>
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
  import {addLand,getLandInfo} from "@/api/land"
  export default{
      name:"LandForm",
      props:["landId"],
      components:{
          //CateSelect,
          ImgUpload
      },
      data(){
          return {
              ruleform:{                              
                      landId:"",
                      landHead:"",
                      landcountry:"",
                      certificatesId:"",
                      certificatesUnit:"",
                      certificatesImg:"",
                      certificatesPeriod:"",
                      landArea:"",
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
            if(this.landId){
                getLandInfo(this.landId).then(res=>{
                    console.log("res",res);
                    let info=res.data.info;
                    this.ruleform={//给对象赋值可以这么写
                      landId: this.landId,
                      landHead: info.landHead,
                      landcountry: info.landcountry,
                      certificatesId: info.certificatesId,
                      certificatesUnit: info.certificatesUnit,
                      certificatesImg: info.certificatesImg,
                      certificatesPeriod: info.certificatesPeriod,
                      landArea: info.landArea,
                      landStyle:info.landStyle,
                      contractor:info.contractor,
                      contractId:info.contractId,
                      contractExpire:info.contractExpire,
                      contractUnit:info.contractUnit,
                      transferStyle:info.transferStyle,
                      landIncome:info.landIncome,
                      transferReason:info.transferReason,
                      contractImg:info.contractImg,

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
                        addLand(data).then(res => {
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