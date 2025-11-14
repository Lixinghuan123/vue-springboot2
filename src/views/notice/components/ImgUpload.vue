<template>
    <!-- action="https://jsonplaceholder.typicode.com/posts/"指定上传图片的接口 这个接口还没定好-->
    <!-- 不懂这个action和下面的src神么关系 -->
    <!--  name="notice"上传图片的名称，后端使用这个名称接受图片 是必须的,相当于一个传给后端的file参数，名称要和后端对应-->
    <!--el-upload是element组件内部使用ajax所以也存在跨域问题  -->
    <!-- multiple可以上传多张图片 drag表示可以拖拽上传-->

    <div>
    <el-upload class="upload-demo" drag name="file" action="/img/insert" multiple :on-success="imgSuccess" @change="imgShow()">
        <template #trigger>
            <!-- 怎么知道的是用#，不懂为什么要有插槽，直接写有啥坏处吗 -->
            <div v-if="value">
                <!-- 如果value有数据 -->
                <el-image :src="`http://localhost:8080/${value}`"></el-image>
            </div>
            <div v-else>
                添加图片
                <i class="el-icon-upload"></i>
                <!-- 这是云朵图标 -->
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </div>
        </template>
        <template #tip>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </template>  
    </el-upload>
</div>
</template>
<script>
    export default{
        name:"ImgUpload",
        props:{
            value:{
                type:String,
                default:""
            }
        },
        data(){
            return {

            };
        },
        methods:{
            imgShow(url){
                console.log(url);
            },
            imgSuccess(response,upload){
                console.log(response);

                if(response&&response.data.img){
                    let img=response.data.img;//拿到图片路径
                    this.$emit("input",img);//子传父组件，需要父组件有input事件,自动触发父组件的input事件
                }
            }
        },
    };
</script>
<style lang="scss" scoped></style>