<template>
    <!-- 数据改变的时候就会触发change事件，并触发父组件的input事件，event就是你的选择项数据 value是form传过来的空字符串，选择选项后value值也会改变-->
    <!-- 切换不同的值以后就会触发 @change事件，子组件可以使用 $emit,让父组件监听到自定义事件,$event就是你选择的那个数据-->
        <el-select :clearable="clearable" placeholder="请选择" :value="value" @change="$emit('input',$event)">
            <el-option v-for="item in cates" :key="item.id" :label="item.cateName" :value="item.cate">
            </el-option>
          </el-select>

</template>
<script>
    import { mapActions,mapState} from "vuex"//mapState映射数据库中的数据成为计算属性，我也不懂计算属性是干嘛的
    export default{
        name:"CateSelect",
        props:{
            value:{
                type:String,
                default:""
            },
            clearable:{
                type:Boolean,
                default:false//这样就可以表示父组件有值传递时，为true，有清除功能，否则默认false
            }
        },
        data(){
            return {
          

            };
        },
        created(){
            this.getCates();
        },
        computed:{
            ...mapState("notice",["cates"])//拿到了仓库中cates的数据，可以遍历拿到cates中的每个item
            //goods模块下有个cates数据
        },
        methods:{
            ...mapActions("notice",["getCates"])
        },
    };
</script>
<style lang="less" scoped></style>