<template>
    <div class="notice-list" style="margin: 20px;">
        <el-page-header @back="$router.back()" content="申请支出"></el-page-header>

        <el-form ref="form" :model="ruleform" :rules="rules" label-width="100px">
            <el-form-item>
                <!-- 校验规则有很多，prop用来指定具体的哪条校验规则 -->
                <el-form-item label="申请人：" prop="exChargeName" style="margin-left:20px;margin-top:20px;">
                    <el-input placeholder="请输入姓名" v-model="ruleform.exChargeName">
                    </el-input>
                </el-form-item>
                <el-form-item label="大概用途：" prop="exUsing" style="margin-left:20px;margin-top:20px;">
                    <el-input type="textarea" :rows="5" placeholder="大概用途" 
                        v-model="ruleform.exUsing" style="width: 100%;">
                    </el-input>
                </el-form-item>
                <el-form-item label="支出金额：" prop="exSum" style="margin-left:20px;margin-top:20px;">
                    <el-input placeholder="支出金额" v-model="ruleform.exSum">
                    </el-input>
                </el-form-item>
                <el-form-item label="支出时间：" prop="exTime" suffix-icon="el-icon-date" style="margin-left:20px;margin-top:20px;">
                    <el-date-picker placeholder="支出时间" v-model="ruleform.exTime">
                    </el-date-picker>
                </el-form-item>                             
            </el-form-item> 
            
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" icon="el-icon-edit">申请</el-button>
            </el-form-item>
        </el-form>



    </div>
</template>
<script>
    import ImgUpload from "../notice/components/ImgUpload.vue";
    import CateSelect from "../notice/components/CateSelect.vue";
    import { addExpend,getExpendInfo} from "@/api/expend"
    //import { mapActions,mapState } from "vuex";//mapState映射数据库中的数据成为计算属性，我也不懂计算属性是干嘛的
    export default {
        name: "expendForm",
        props: ["exId"],
        components: {
            ImgUpload,
            CateSelect,
        },
        data() {
            return {
                // options: [],

                ruleform: {
                    exId:"",
                    exChargeName: "",
                    exUsing: "",
                    exSum: "",
                    exStatus: false,
                    exTime: "",
                    
                },
                rules: {
                    exChargeName: [
                        //required: true表示必填项
                        //message提示信息  trigger: 'blur'表示失去焦点时显示提示
                        { required: true, message: '请输入笔名', trigger: 'blur' },
                        //pattern:/[\u4e00-\u9fa5]{4,8}/为自定义校验规则
                        { pattern: /[\u4e00-\u9fa5]{2,8}/, message: '长度在 2到 8 个中文字符', trigger: 'blur' }
                    ],

                    exUsing: [
                        { required: true, message: '请说明大概用途', trigger: 'change' }
                    ],
                    exSum: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                       
                    ],
                    exTime: [
                        { required: true, message: '请选择日期', trigger: 'change' },
                    ],
                    // noticeContext: [
                    //     { required: true, message: '请输入公告内容', trigger: 'blur' },
                    //     { min: 2, max: 3000, message: '长度在 200 到 3000 个字符', trigger: 'blur' }
                    // ],
                }


            };
        },
        // computed:{
        //     ...mapState("notice",["cates"])//拿到了仓库中cates的数据，可以遍历拿到cates中的每个item
        // },
        // created(){     
        //     this.getCates();
        // },
        mounted() {
            //if noticeId值存在就说明进入了编辑界面            
            if(this.exId){
                getExpendInfo(this.exId).then(res=>{
                    console.log("res",res);
                    let info=res.data.info;
                    this.ruleform={//给对象赋值可以这么写
                        exId:this.exId,
                        exChargeName: info.exChargeName,
                        exUsing: info.exUsing,
                        exSum: info.exSum,
                        exStatus: info.exStatus,
                        exTime:info.exTime,
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
                        addExpend(data).then(res => {
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
<style lang="less" scoped></style>