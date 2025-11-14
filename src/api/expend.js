import request from '@/utils/request'

export function getExpendList(params) {//好像用不到参数啊
  return request({
    url: '/expend/list',
    method: 'get',
    params
  })
}

export function fetchExpend(id) {
  return request({
    url: '/expend/detail',
    method: 'get',
    params: { id }
  })
}

export function getExpendInfo(exId) {
  return request({
    url: '/expend/search',
    method: 'get',
    params: { exId }
  })
}

export function addExpend(data) {
  return request({
    url: '/expend/insert',
    method: 'post',
    data
  })
}

export function updateExpend(data) {
  return request({
    url: '/expend/insert',
    method: 'post',
    data
  })
}
export function expendDel(exId){
  return request({
      url:'/expend/delete',
      method:'PUT',
      data:{
          exId
      }
  })
}
