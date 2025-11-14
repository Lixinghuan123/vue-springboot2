import request from '@/utils/request'

export function getResidentList(params) {//好像用不到参数啊
  return request({
    url: '/people/list',
    method: 'get',
    params
  })
}

export function getResidentInfo(peopleId) {
  return request({
    url: '/people/search',
    method: 'get',
    params: { peopleId }
  })
}
export function fetchResident(id) {
  return request({
    url: '/people/detail',
    method: 'get',
    params: { id }
  })
}

export function addResident(data) {
  return request({
    url: '/people/insert',
    method: 'post',
    data
  })
}

export function updateResident(data) {
  return request({
    url: '/people/insert',
    method: 'post',
    data
  })
}
export function residentDel(peopleId){
  return request({
      url:'/people/delete',
      method:'PUT',
      data:{
        peopleId
      }
  })
}
export function getAllCates(params={}){
  return request({
      url:'/people/cate',
      method:'get',
      params
  })
}