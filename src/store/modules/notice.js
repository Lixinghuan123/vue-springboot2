import { getAllCates } from "@/api/notice"


//state就是要共享的数据
const state = {
    cates:[],
}
//mytation是改变状态的唯一途径
const mutations = {
    set_cates(state,list){
        state.cates=list;
    }
}
//异步代码都要放在action中
const actions = {
    getCates({commit}){
        getAllCates().then(res => {
           // console.log("res:",res); 
           if(res.data.list){
            commit("set_cates",res.data.list)//这里应该是提交一个mutation，这样就可以改变仓库中值的状态，此时仓库中cates有了数据，其他组件就可以拿到了
           }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  
  