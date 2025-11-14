import request from '@/utils/request'

export function getSubsidyList(params) {//好像用不到参数啊
  return request({
    url: '/subsidy/list',
    method: 'get',
    params
  })
}

export function getSubsidyInfo(subsidyId) {
  return request({
    url: '/subsidy/search',
    method: 'get',
    params: { subsidyId }
  })
}

export function fetchSubsidy(subsidyId) {
  return request({
    url: '/subsidy/detail',
    method: 'get',
    params: { subsidyId }
  })
}

export function addSubsidy(data) {
  return request({
    url: '/subsidy/insert',
    method: 'post',
    data
  })
}

export function updateSubsidy(data) {
  return request({
    url: '/subsidy/insert',
    method: 'post',
    data
  })
}
export function subsidyDel(subsidyId){
  return request({
      url:'/subsidy/delete',
      method:'PUT',
      data:{
        subsidyId
      }
  })
}
