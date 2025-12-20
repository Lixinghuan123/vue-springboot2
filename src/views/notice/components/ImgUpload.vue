<template>
    <div>
    <el-upload class="upload-demo" drag name="file" action="/img/insert" multiple :on-success="imgSuccess" @change="imgShow()">
        <template #trigger>
            <div v-if="value">
                <!-- 如果value有数据 -->
                <el-image :src="getFullImageUrl(value)"></el-image>
            </div>
            <div v-else>
                添加图片
                <i class="el-icon-upload"></i>
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
            getFullImageUrl(imgPath) {
                // 如果已经是完整的URL，直接返回
                if (imgPath && (imgPath.startsWith('http://') || imgPath.startsWith('https://'))) {
                    return imgPath;
                }
                // 使用相对路径，让代理处理
                return `/${imgPath}`;
            },
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