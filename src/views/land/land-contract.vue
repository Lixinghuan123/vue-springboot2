<template>
    <div class="notice-list" style="margin: 20px;">
        <el-row>
            <el-col :span="24">
                <el-input placeholder="请输入内容" style="width: 135px;"></el-input>
                <el-select placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <el-button type="primary" icon="el-icon-edit" @click="$router.push('/land/land-update/')">添加</el-button>
                <el-button type="primary" icon="el-icon-download">访问</el-button>
                <el-checkbox style="margin-left:20px">审核人</el-checkbox>
            </el-col>
        </el-row>
        <!--data="list"指定数据源-->
        <el-table :data="list" style="width: 100%" border>
            <el-table-column prop="landId" label="序号" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{$index+1}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="landHead" label="户主" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.landHead }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="landStyle" label="土壤类别" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.landStyle }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="contractor" label="承包人" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.contractor }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="contractId" label="土地承包证编号" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.contractId }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="contractExpire" label="承包过期日期" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.contractExpire }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="contractImg" label="承包证书截图" align="center">
                <template slot-scope="{row,$index}">
                    <el-image :src="`http://localhost:8080/${row.contractImg}`"></el-image>                 
                </template>
            </el-table-column>   
           
            <el-table-column prop="contractUnit" label="承包证办理单位" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.contractUnit}}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="230">
                <template slot-scope="{row,$index}">
                    <el-button type="primary" size="mini"@click="toEdit(row)">编辑</el-button>
                    <el-button  type="primary" size="mini">详情</el-button>                    
                    <el-button type="danger" size="mini" @click="LandDelete(row)">删除</el-button>
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
    
     import {getLandList,getLandInfo,landDel} from "@/api/land"
     import { mapState }from "vuex"
    export default {
        name: "landList",
        props: ["landId"],
        data() {
            return {
                options: [],
                list:[],
                // 分页
                //id:'',
                page:1,
                size:2,
                total:0,
                // 搜索
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
                
                getLandList(params).then(res=>{
                   // debugger,一定要返回ok（）
                    console.log("res",res);
                   if(res.data && res.data.iPage.records){
                        this.list=res.data.iPage.records;
                        this.total=res.data.iPage.total;
                    }
                })
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
                this.$router.push("/land/land-edit/"+row.landId);
            },
                currentChangeHandle(val){
                    this.page=val;
                    this.getList();
                },
                sizeChangeHandle(val){
                    this.size=val;
                    this.getList();
                },
                LandDelete(row){//什么时候才需要写参数
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                   // console.log("noticeId",row.noticeId);//变量的格式到底是什么，row.noticeId为什么是未定义的
                   landDel(row.landId).then(res=>{
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