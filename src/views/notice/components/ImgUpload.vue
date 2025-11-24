<template>
    <!-- action="https://jsonplaceholder.typicode.com/posts/"指定上传图片的接口 这个接口还没定好-->
    <!-- 不懂这个action和下面的src神么关系 -->
    <!--  name="notice"上传图片的名称，后端使用这个名称接受图片 是必须的,相当于一个传给后端的file参数，名称要和后端对应-->
    <!--el-upload是element组件内部使用ajax所以也存在跨域问题  -->
    <!-- multiple可以上传多张图片 drag表示可以拖拽上传-->
    <!-- file-list是有关列表项的，具体有几项是由fileListOwn决定的 -->
    <div>
    <el-upload  height="300px" name="file" action="/img/insert" multiple :file-list="fileListOwn" :on-change="handleChange" :on-remove="handleRemove" :on-success="imgSuccess" >
        <!-- <template #trigger> -->
            <!-- 怎么知道的是用#，不懂为什么要有插槽，直接写有啥坏处吗 -->
            <!-- <div v-if="value"> -->
                <!-- 如果value有数据 -->
                <!-- <el-image :src="`http://localhost:8080/${value}`"></el-image> -->
            <!-- </div> -->
            <!-- <div v-else>
                添加图片 -->
                <!-- <i class="el-icon-upload"></i> -->
                <!-- 这是云朵图标 -->
                <!-- <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </div> -->
        <!-- </template> -->
        <template #trigger>      
              <div v-if="fileListOwn.length > 0">
            <el-card   v-for="(image, index) in fileListOwn" :key="index">
                <el-image :src="image.name" alt="Image" style="width:100%" ></el-image>
            </el-card>    
        </div>
            <div v-else>
                添加图片 -->
                <i class="el-icon-upload"></i>
                <!-- 这是云朵图标 -->
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </div>     
         </template>
        <template #tip>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb
                {{fileList}}
            </div>          
        </template>  
            

    </el-upload>
</div>
</template>
<script>
    export default{
        name:"ImgUpload",
        props:{
            fileList:{
                type:Array,
                default:""
            },
            value:{
                type:String,
                default:""
            }
        },
        data(){
            return {
                fileListOwn:[],
            };
        },
        created(){
          
            this.fileListOwn=this.fileList;
            
        },
        mounted(){
            // console.log("mounted",this.uploadFiles);
            // console.log("mounted",this.fileList);
        },
        methods:{
            changeFileUrl(img){
                this.fileListOwn.push({url:img});

            },
            
            handleChange(file,fileList){
                // console.log("filechange",file);
                // console.log("filechange2",fileList);
                // this.fileListOwn.push({name:file.name,url:file.name});
                // console.log("this.fileListOwn",this.fileListOwn);
            },
            handleRemove(file,fileList){
               
                console.log("file",file);
                console.log("fileList",fileList);
                console.log("mounted",this.fileList);
                this.fileListOwn=fileList;
            },

            imgSuccess(response,upload,fileList){             
                debugger 
                console.log("response:",response);
                console.log("upload:",upload);
                console.log("uploadfileList:",fileList);
                if(response&&response.data.img){
                    let img=response.data.img;//拿到图片路径
              

                    // 更新组件的数据属性
                    this.fileListOwn = fileList;
                    // console.log(" this.fileListOwn", this.fileListOwn);
                    // this.fileListOwn = fileList.map(item=>{item.name});
                    //this.$emit("input",img);//子传父组件，需要父组件有input事件,自动触发父组件的input事件
                }
            }
        },
    };
</script>
<style lang="scss" scoped>
</style>