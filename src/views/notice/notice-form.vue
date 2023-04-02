<template>
    <div class="notice-list" style="margin: 20px;">
        <el-page-header @back="$router.back()" content="添加公告"></el-page-header>
        
        <el-form  ref="form" :model="ruleform" :rules="rules"  label-width="100px" >    
            <el-form-item >
                    <!-- 校验规则有很多，prop用来指定具体的哪条校验规则 -->
                    <el-form-item label="作者：" prop="noticeName"  style="margin-left:20px;margin-top:20px;" >
                        <el-input
                        placeholder="请输入笔名"
                        v-model="ruleform.noticeName">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="发布时间：" prop="noticePubTime" style="margin-left:20px;margin-top:20px;" >
                        <el-date-picker 
                        type="date"
                        placeholder="请选择日期"
                        suffix-icon="el-icon-date"
                        v-model="ruleform.noticePubTime"
                        style="width: 100%;" >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="公告标题：" prop="noticeTitle" style="margin-left:20px;margin-top:20px;" >
                        <el-input
                        placeholder="请输入标题"                      
                        v-model="ruleform.noticeTitle">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="公告类型：" prop="noticeType"  style="margin-left:20px;margin-top:20px;" >  
                        <CateSelect v-model="ruleform.noticeType"></CateSelect>
                    </el-form-item>   
            </el-form-item> 
            <el-form-item  prop="noticeContext">
                    <el-input
                        type="textarea"
                        :rows="15"
                        placeholder="请输入内容"
                        v-model="ruleform.noticeContext">
                    </el-input>
            </el-form-item>
            <el-form-item  prop="">             
                    <ImgUpload ></ImgUpload>
            </el-form-item>
            <el-form-item >
                    <el-button type="primary"  @click="submitForm('ruleForm')" icon="el-icon-edit">发布公告</el-button>
            </el-form-item>
        </el-form>    
       

        
    </div>
</template>
<script>
    import ImgUpload from "./components/ImgUpload.vue";
    import CateSelect from "./components/CateSelect.vue";
    import {addNotice} from "@/api/notice"
    //import { mapActions,mapState } from "vuex";//mapState映射数据库中的数据成为计算属性，我也不懂计算属性是干嘛的
    export default{
        name:"noticeForm",
        props:[],
        components:{
            ImgUpload,
            CateSelect,
        },
        data(){
            return {
               // options: [],
                
                ruleform:{
                    noticeName:"",
                    noticePubTime:"",
                    noticeTitle:"",
                    noticeType:"",
                    noticeContext: "",
                    noticeStatus:false,
                    imgUrl:"",
                },
                rules:{
                    noticeName: [
                        //required: true表示必填项
                        //message提示信息  trigger: 'blur'表示失去焦点时显示提示
                            { required: true, message: '请输入笔名', trigger: 'blur' },
                            //pattern:/[\u4e00-\u9fa5]{4,8}/为自定义校验规则
                            {pattern:/[\u4e00-\u9fa5]{2,8}/, message: '长度在 2到 8 个中文字符', trigger: 'blur' }
                        ],
                        
                        noticePubTime: [
                            { required: true, message: '请选择日期', trigger: 'change' }
                        ],
                        noticeTitle: [
                            { required: true, message: '请输入标题', trigger: 'blur' },
                            {pattern:/[\u4e00-\u9fa5]{2,8}/, message: '长度在 2到 8 个中文字符', trigger: 'blur' }
                        ],
                        cate: [
                        { required: true, message: '请选择文章类型', trigger: 'change' },
                        ],
                        noticeContext:[
                        { required: true, message: '请输入公告内容', trigger: 'blur' },
                        { min: 2, max: 3000, message: '长度在 200 到 3000 个字符', trigger: 'blur' }
                        ],
                }    


            };
        },
        // computed:{
        //     ...mapState("notice",["cates"])//拿到了仓库中cates的数据，可以遍历拿到cates中的每个item
        // },
        // created(){     
        //     this.getCates();
        // },
       
        methods:{
           // ...mapActions("notice",["getCates"]),//把action映射成一个方法，然后就可以在其他地方调用了
            submitForm(formName) {//这个地方有什么必要传入formName
              this.$refs.form.validate((valid) => {
                if (valid) {
                 // alert('submit!');
                  let data={...this.ruleform};
                  addNotice(data).then(res=>{
                    console.log(res);
                   // console.log(res.success);

                    if(res.success){//这里好像得对data的数据格式有要求 
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
        },
    };
</script>
<style lang="less" scoped></style>