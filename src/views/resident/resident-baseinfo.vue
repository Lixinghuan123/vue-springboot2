<template>
    <div class="notice-list" style="margin: 20px;">
        <el-row>
            <el-col :span="24">
                <el-input placeholder="请输入内容" style="width: 135px;"></el-input>
                <el-select placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <el-button type="primary" icon="el-icon-edit">添加</el-button>
                <el-button type="primary" icon="el-icon-download">访问</el-button>
                <el-checkbox style="margin-left:20px">审核人</el-checkbox>
            </el-col>
        </el-row>
        <!--data="list"指定数据源-->
        <el-table :data="list" style="width: 100%" border>
            <el-table-column prop="id" label="序号" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{$index+1}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{row.name}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{row.sex ? '男':'女'}}</div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="price" label="价格" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ `¥${row.price.toFixed(2)}` }}</div>
                </template>
            </el-table-column> -->
            <el-table-column prop="identityCard" label="身份证号" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.identityCard }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="nation" label="民族" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.nation}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="birthday" label="出生日期" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.birthday }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.phone }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="homePhone" label="家庭电话号" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.homePhone }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="email" label="电子邮箱" align="center">
                <template slot-scope="{row,$index}">
                    <div>{{ row.email }}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="230">
                <template slot-scope="{row,$index}">
                    <el-button type="primary" size="mini">编辑</el-button>
                    <el-button v-if="row.published" type="primary" size=" mini">详情</el-button>
                    <el-button v-else type="success" size="mini">审核</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin-top:  20px;" :current-page="currentPage4" :page-sizes="[2, 5, 10, 20]"
            :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        name: " goodList", props: [], 
        data() {
            return {
                options: [{ value: '选项1', label: '黄金糕' }, {
                    value: '选项2',
                    label: '双皮奶'
                }, { value: '选项3', label: '蚵仔煎' }, { value: '选项4', label: '龙须面' }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }], value: '', 
                list: [{
                    id:1,
                    name:"小明",
                    sex: true,
                    birthday:"2000-07-09",
                    identityCard:"140322200007096626",
                    nation:"汉族",
                    phone:"13663535641",
                    homePhone : "13663535083",
                    email : "2908238338@qq.com",

                }, {
                    id: 2,
                     name:"小明",
                    sex: true,
                    birthday:"2000-07-09",
                    identityCard:"140322200007096626",
                    nation:"汉族",
                    phone:"13663535641",
                    homePhone : "13663535083",
                    email : "2908238338@qq.com",
                }, {
                    id: 3,
                    name:"小明",
                    sex: true,
                    birthday:"2000-07-09",
                    identityCard:"140322200007096626",
                    nation:"汉族",
                    phone:"13663535641",
                    homePhone : "13663535083",
                    email : "2908238338@qq.com",
                }, {
                    id: 4,
                    name:"小明",
                    sex: true,
                    birthday:"2000-07-09",
                    identityCard:"140322200007096626",
                    nation:"汉族",
                    phone:"13663535641",
                    homePhone : "13663535083",
                    email : "2908238338@qq.com",
                }],
            };
        },
         methods: {},
    };
     </script>
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