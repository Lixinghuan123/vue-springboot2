<template>
    <div class="notice-list" style="margin: 20px;">
        <el-row>
            <el-col :span="24">
                <el-input placeholder="请输入申请人姓名" v-model.trim="name" style="width: 135px;"></el-input>
                <el-select placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search"  @click="getList">搜索</el-button>
                <el-button type="primary" icon="el-icon-edit"  @click="$router.push('/elect/elect-update')">添加</el-button>
                <!-- <el-button type="primary" icon="el-icon-download">访问</el-button>
                <el-checkbox style="margin-left:20px">审核人</el-checkbox> -->
            </el-col>
        </el-row>
        <!--data="list"指定数据源-->
        <el-table :data="list" style="width: 100%" border>
            <el-table-column prop="cadreId" label="序号" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{$index+1}}</div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="cadreName" label="公告标题" align="center">
                <template slot-scope="{row,$index}">
                    <img src="row.img" alt="">
                    <div>{{row.title}}</div>
                </template>
            </el-table-column> -->
            <el-table-column prop="cadreName" label="候选人" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.cadreName }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="cadrePosition" label="竞选职位" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.cadrePosition }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="cadreDiscription" label="竞选宣言" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.cadreDiscription }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="cadreNum" label="当前票数" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.cadreNum }}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="230">
                <template slot-scope="{row,$index}">
                    <el-button type="primary" size="mini" @click="toEdit(row)">编辑</el-button>
                    <!-- <el-button v-if="row.published" type="primary" size="mini">详情</el-button>
                    <el-button v-else type="success" size="mini">审核</el-button> -->
                    <el-button type="danger" size="mini" @click="addTicket(row)">投票</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin-top:  20px;" :current-page="page" :page-sizes="[2, 5, 10, 20]"
            :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" @current-change="currentChangeHandle"
            @size-change="sizeChangeHandle">
        </el-pagination>
    </div>
</template>
<script>
    import {getCadreList,cadreDel,addCadre} from "@/api/elect"
    export default {
        name: " electList",
         props: ["cadreId"], 
         data() {
            return {
                options: [], 
                 value: '',
                 list: [],
                 page:1,
                 size:2,
                 total:0,
                 name:"",
                 cate:"",
                
            };
        }, 
        created(){
            this.getList();
        },
        methods: {
            getList(){
                let params={
                    id:this.id,
                    currentPage:this.page,//当前页
                    size:this.size,//一页几条数据
                    cate:this.cate,//类型搜索框内容
                    name:this.name//内容搜索框内容
                }
                
                getCadreList(params).then(res=>{
                   // debugger,一定要返回ok（）
                    console.log("res",res);
                   if(res.data && res.data.iPage.records){
                        this.list=res.data.iPage.records;
                        this.total=res.data.iPage.total;
                    }
                })
            },
            //投票
            addTicket(row){
                row.cadreNum+=1;
                
                //需要调用axios插入数据库中的数据
                let data=row;
                addCadre(data);
                
            },
             //英文分类转成中文
             cate2ZH(cate){
                let res= this.cates.filter(item=>item.cate == cate)//filter是返回一个满足条件的数组
                if(res.length==1){
                    return res[0].cateName;
                }else{
                    return "暂无分类";
                }   
                },
            toEdit(row){

                this.$router.push("/elect/elect-edit/"+row.cadreId);
            },
                currentChangeHandle(val){
                    this.page=val;
                    this.getList();
                },
                sizeChangeHandle(val){
                    this.size=val;
                    this.getList();
                },
                cadreDelete(row){//什么时候才需要写参数
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                   // console.log("noticeId",row.noticeId);//变量的格式到底是什么，row.noticeId为什么是未定义的
                    noticeDel(row.cadreId).then(res=>{
                        console.log("success",res.success)
                       if(res.success==true){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getList();//这里有点问题，会短暂的缺数据，因为传递的是16号页，而不是15号页
                       }
                    });
               
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });
            }
        },
    }; </script>
<style lang="scss">
    .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>