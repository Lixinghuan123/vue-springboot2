import request from '@/utils/request'

export function getIncomeList(params) {//好像用不到参数啊
  return request({
    url: '/income/list',
    method: 'get',
    params
  })
}

export function getIncomeInfo(inId) {
  return request({
    url: '/income/search',
    method: 'get',
    params: { inId }
  })
}

export function fetchIncome(id) {
  return request({
    url: '/income/detail',
    method: 'get',
    params: { id }
  })
}

export function addIncome(data) {
  return request({
    url: '/income/insert',
    method: 'post',
    data
  })
}

export function updateIncome(data) {
  return request({
    url: '/income/insert',
    method: 'post',
    data
  })
}
export function incomeDel(inId){
  return request({
      url:'/income/delete',
      method:'PUT',
      data:{
        inId
      }
  })
}
