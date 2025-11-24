<template>
    <div class="notice-list" style="margin: 20px;">
        <el-page-header @back="$router.back()" content="公告详情 "></el-page-header>

        <el-form ref="form" :model="ruleform" :rules="rules" label-width="100px">            
            <el-form-item prop="noticeContext">
                <el-input type="textarea" :rows="15" placeholder="请输入内容" v-model="ruleform.noticeContext">
                </el-input>
            </el-form-item>
        </el-form>



    </div>
</template>
<script>
    import ImgUpload from "./components/ImgUpload.vue";
    import CateSelect from "./components/CateSelect.vue";
    import { addNotice,getNoticeInfo } from "@/api/notice"
    //import { mapActions,mapState } from "vuex";//mapState映射数据库中的数据成为计算属性，我也不懂计算属性是干嘛的
    export default {
        name: "noticeForm",
        props: ["noticeId"],
        components: {
            ImgUpload,
            CateSelect,
        },
        data() {
            return {
                // options: [],

                ruleform: {
                    noticeId:"",
                    noticeName: "",
                    noticePubTime: "",
                    noticeTitle: "",
                    noticeType: "",
                    noticeContext: "",
                    noticeStatus: false,
                    imgUrl: "",
                },
                rules: {
                    noticeName: [
                        //required: true表示必填项
                        //message提示信息  trigger: 'blur'表示失去焦点时显示提示
                        { required: true, message: '请输入笔名', trigger: 'blur' },
                        //pattern:/[\u4e00-\u9fa5]{4,8}/为自定义校验规则
                        { pattern: /[\u4e00-\u9fa5]{2,8}/, message: '长度在 2到 8 个中文字符', trigger: 'blur' }
                    ],

                    noticePubTime: [
                        { required: true, message: '请选择日期', trigger: 'blur' }
                    ],
                    noticeTitle: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { pattern: /[\u4e00-\u9fa5]{2,8}/, message: '长度在 2到 8 个中文字符', trigger: 'blur' }
                    ],
                    noticeType: [
                        { required: true, message: '请选择文章类型', trigger: 'blur' },
                    ],
                    noticeContext: [
                        { required: true, message: '请输入公告内容', trigger: 'blur' },
                        { min: 2, max: 3000, message: '长度在 200 到 3000 个字符', trigger: 'blur' }
                    ],
                }


            };
        },
        mounted() {
            //if noticeId值存在就说明进入了编辑界面
            if(this.noticeId){
               // console.log("noticeId",this.noticeId);
                getNoticeInfo(this.noticeId).then(res=>{
                    //console.log("res",res);
                    let info=res.data.info;
                    this.ruleform={//给对象赋值可以这么写
                        noticeId:this.noticeId,
                        noticeName: info.noticeName,
                        noticePubTime: info.noticePubTime,
                        noticeTitle: info.noticeTitle,
                        noticeType: info.noticeType,
                        noticeContext:info.noticeContext,
                        noticeStatus: info.noticeStatus,
                        imgUrl: info.imgUrl,
                    }
                })
            }
        },

        methods: {
            // ...mapActions("notice",["getCates"]),//把action映射成一个方法，然后就可以在其他地方调用了
            submitForm(formName) {//这个地方有什么必要传入formName
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        let data = { ...this.ruleform };
                        addNotice(data).then(res => {
                            console.log(res);
                            if(this.noticeId) data.noticeId=this.noticeId;
                            
                            if (res.success) {//这里好像得对data的数据格式有要求 
                                this.$message({
                                    message: `公告${this.noticeId?'编辑':'新增'}成功`,
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
<style lang="less" scoped></style>