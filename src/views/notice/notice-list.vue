<template>
    <div class="notice-list" style="margin: 20px;">
        <el-row>
            <el-col :span="24">
                <el-input placeholder="请输入内容" v-model.trim="name" style="width: 135px;"></el-input>
                <!-- <el-select placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>    
                </el-select> -->
                <CateSelect clearable v-model="cate"></CateSelect>
                <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <el-button type="primary" icon="el-icon-edit" @click="$router.push('/notice/add')">添加</el-button>
                <el-button type="primary" icon="el-icon-download">访问</el-button>
                <el-checkbox style="margin-left:20px">审核人</el-checkbox>
            </el-col>
        </el-row>
        <!--data="list"指定数据源-->
        <el-table :data="list" style="width: 100%" border>
            <el-table-column prop="noticeId" label="序号" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{$index+1}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="noticeTitle" label="公告标题" align="center">
                <template slot-scope="{row,$index}">
                    <img src="row.img" alt="">
                    <div>{{row.noticeTitle}}</div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="price" label="价格" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ `¥${row.price.toFixed(2)}` }}</div>
                </template>
            </el-table-column> -->
            <el-table-column prop="noticeType" label="公告类型" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.noticeType }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="read" label="是否已读" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.read ? '是':'否' }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="noticePubTime" label="发布时间" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.noticePubTime }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="noticeStatus" label="公告状态" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.noticeStatus?'已上架':'待审核' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="230">
                <template slot-scope="{row,$index}">
                    <el-button type="primary" size="mini">编辑</el-button>
                    <el-button v-if="row.published" type="primary" size="mini">详情</el-button>
                    <el-button v-else type="success" size="mini">审核</el-button>
                    <el-button type="danger" size="mini" @click="noticeDelete(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin-top:  20px;" :current-page="page" :page-sizes="[2, 5, 10, 20]"
            :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</template>
<script>
     import CateSelect from "./components/CateSelect.vue";
     import {getNoticeList,noticeDel} from "@/api/notice"
    export default {
        name: " noticeList", 
        props: [], 
        data() {
            return {
                //options: []
                list:[],
                // 分页
                page:1,
                size:2,
                total:0,
                // 搜索
                name:"",
                cate:"",
            };
        }, 
        components:{
            CateSelect,
        },
        created(){
            this.getList();
        },

        methods: {
            getList(){
                let params={
                    page:this.page,
                    size:this.size,
                    cate:this.cate,
                    name:this.name
                }
                //debugger
                getNoticeList(params).then(res=>{
                   // console.log("res",res);
                   if(res.data && res.data.list){
                        this.list=res.data.list;
                        this.total=res.data.total;
                    }
                })
            },
            noticeDelete(row){//什么时候才需要写参数
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    // console.log("noticeId",row.$index);//变量的格式到底是什么，row.noticeId为什么是未定义的
                    // noticeDel(row._id).then(res=>{
                    //     console.log("noticeId",row._id);//不懂row怎么来，row.id又是什么
                    //     console.log("res",res);
                    // });
                this.$message({
                    type: 'success',
                    message: '删除成功!'
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